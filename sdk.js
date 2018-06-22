/*
  Copyright 2018 GreenKey Technologies

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
 */

/* global window */

/**
 * @module  greenkey-sdk
 */
import feathers from '@feathersjs/client';
import EventEmitter2 from 'eventemitter2';
import localStorage from 'localstorage-memory';
import io from 'socket.io-client';
import SIP from 'sip.js';

/**
 * Class used to create and interact with intercoms.
 * @example
 * import GreenKey from 'greenkey-sdk';
 * const GK = new GreenKey('test.example.com');
 * @tutorial GreenKeyClass
 */
class GreenKey {
  /**
   * Constructs a GreenKey instance. Immediately invokes the function connectToAPI() with the
   * provided endpointURL.
   * @param {string} endpointURL - The API endpoint URL
   */
  constructor(endpointURL) {
    this.version = '0.0.1';
    this.connectToAPI(endpointURL);
  }

  /**
   * Connect to the API endpoint URL and initialize services. This function is automatically
   * invoked when the GreenKey object is created.
   * @param {string} endpointURL - The API endpoint URL
   * @returns <undefined>
   */
  connectToAPI(endpointURL) {
    const client = feathers();
    const socket = io(endpointURL, { transports: ['websocket'] });

    client.configure(feathers.socketio(socket));
    client.configure(feathers.authentication({
      storage: (window && window.localStorage) || localStorage,
      storageKey: 'greenkey-voice-jwt',
    }));

    this.authenticate = client.authenticate;
    this.events = new EventEmitter2({ maxListeners: 6, wildcard: true });
    this.logout = client.logout;
    this.services = { intercoms: client.service('intercoms'), users: client.service('users') };

    // eslint-disable-next-line no-useless-return
    return;
  }

  /**
   * Connect SDK to a SIP user agent / session
   * @tutorial connectIntercoms
   * @param {Object} config - SIP userAgent configuration options
   * @param {number} config.id - SIP user id
   * @param {string} config.endpoint - SIP WebSocket endpoint
   * @param {string} config.protocol - SIP WebSocket protocol (ws or wss)
   * @param {number} config.port - SIP WebSocket port
   * @returns {Promise<MediaStream>} - Resolves to a MediaStream used in the frontend
   */
  connectIntercoms({ id, endpoint, protocol, port }) {
    return new Promise((resolve) => {
      const transportOptions = {
        traceSip: false,
        wsServers: [`${protocol}://${endpoint}:${port}`],
      };

      const userAgent = new SIP.UA({
        uri: `${id}@${endpoint}`,
        transportOptions,
        authorizationUser: '',
        password: '',
        userAgentString: `GreenKey-SDK/${this.version}`,
        log: { level: 1 },
      });

      const options = {
        sessionDescriptionHandlerOptions: {
          constraints: {
            audio: true,
            video: false,
          },
        },
      };

      this.voiceSession = userAgent.invite(`sip:intercoms@${endpoint}`, options);
      this.voiceSession.once('terminated', () => {
        delete this.voiceSession;
      });

      userAgent.once('registered', () => {
        const { sessionDescriptionHandler } = this.voiceSession;
        sessionDescriptionHandler.on('addTrack', (trackEvent) => {
          resolve(trackEvent.streams[0]);
        });
      });
    });
  }

  /**
   * Find intercoms
   * @tutorial findIntercoms
   * @returns {Promise<Object>} - Resolves to an object containing an array of intercom records
   */
  findIntercoms() {
    return this.services.intercoms.find();
  }

  /**
   * Create an intercom
   * @tutorial createIntercom
   * @param {Object} intercom - Intercom data
   * @param {Array} intercom.targets - An array containing target user UUID strings
   * @returns {Promise<Object>} - Resolves to a created intercom object or rejects with an error
   */
  createIntercom(intercom) {
    return this.services.intercoms.create(intercom);
  }

  /**
   * Stop a live intercom
   * @param {Object} intercom - Intercom data
   * @param {string} intercom.id - A string UUID representing the ongoing intercom (from creation)
   * @returns {Promise<Object>} - Resolves to a terminated intercom object or rejects with an error
   */
  stopIntercom(intercom) {
    return this.services.intercoms.patch(intercom.id, intercom);
  }

  /**
   * Find all users
   * @tutorial findUsers
   * @returns {Promise<Object>} - Resolves to an object containing an array of registered users
   */
  findUsers() {
    return this.services.users.find();
  }

  /**
   * Register user
   * @tutorial createUser
   * @example
   * const userCreation = await GK.createUser({ passphrase: '1234' });
   * @param {Object} user - New user data
   * @param {string} user.passphrase - Passphrase before hashing server-side
   * @returns {Promise<Object>} - Resolves to a created user object or rejects with an error
   */
  createUser({ passphrase }) {
    return this.services.users.create({ passphrase });
  }

  /**
   * Initialize service event listeners
   * @returns <undefined>
   */
  startListeners() {
    const events = [
      { service: 'intercoms', method: 'created' },
      { service: 'intercoms', method: 'patched' },
      { service: 'intercoms', method: 'connected' },
      { service: 'intercoms', method: 'disconnected' },
      { service: 'users', method: 'created' },
      { service: 'users', method: 'patched' },
    ];

    events.forEach((event) => {
      this.services[event.service].on(event.method, (data) => {
        this.events.emit(`${event.service}.${event.method}`, data);
      });
    });

    // eslint-disable-next-line no-useless-return
    return;
  }

  /**
   * Deconstruct service event listeners
   * @returns <undefined>
   */
  stopListeners() {
    Object.keys(this.services).forEach((k) => {
      this.services[k].events.forEach((e) => {
        this.services[k].removeAllListeners(e);
      });
    });

    // eslint-disable-next-line no-useless-return
    return;
  }

  /**
   * Start session
   * @tutorial startSession
   * @param {string} apiKey - Valid API Key generated by GreenKey
   * @param {string} id - User ID to authenticate with
   * @param {string} passphrase - Passphrase for given User ID
   * @returns {Promise<Object>} - Resolves to successful auth payload or rejects with an error
   */
  startSession({ apiKey, id, passphrase }) {
    return new Promise(async (resolve, reject) => {
      try {
        if (!apiKey && !id && !passphrase) {
          const auth = await this.authenticate();
          await this.startListeners();
          resolve(auth);
        } else {
          const payload = { strategy: 'local', apiKey, id, passphrase };
          const auth = await this.authenticate(payload);
          await this.startListeners();
          resolve(auth);
        }
      } catch (e) {
        reject(e);
      }
    });
  }

  /**
   * Stop session
   * @example
   * await GK.stopSession();
   * @returns {Promise<Object>} - Resolves on successful logout, or rejects with an error
   */
  stopSession() {
    return new Promise(async (resolve, reject) => {
      try {
        if (this.voiceSession) {
          await this.voiceSession.terminate();
        }
        await this.stopListeners();
        resolve(this.logout());
      } catch (e) {
        reject(e);
      }
    });
  }
}

export default GreenKey;

