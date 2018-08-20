<template>
  <div>
    <section class="hero is-black is-fullheight">
      <TheNavigationBar/>
      <LoginComponent
        v-if="!userLoggedIn"
        @login="loginUser"
        @signup="registerUser"
        :login-error="loginError"
      />
      <IntercomList
        v-if="userLoggedIn"
        :users="users"
        :currentUser="currentUser"
        :gk="gk"
      />
      <TheFooter
        v-if="userLoggedIn"
        @logout="logoutUser"
      />
      <audio
        id="remote"
        autoplay
      />
    </section>
  </div>
</template>

<script>
/* eslint-disable no-console */
import GreenKey from 'greenkey-voice-sdk';
import TheNavigationBar from './TheNavigationBar';
import LoginComponent from './LoginComponent';
import IntercomList from './IntercomList';
import TheFooter from './TheFooter';

const endpoint = 'voice-sandbox.greenkeytech.com';
const gk = new GreenKey(`https://${endpoint}`);

export default {
  name: 'GreenKeyComponent',
  components: {
    TheNavigationBar,
    LoginComponent,
    IntercomList,
    TheFooter,
  },
  data() {
    return {
      currentUser: {},
      userLoggedIn: false,
      users: [],
      gk,
      loginError: null,
    };
  },
  methods: {
    async loginUser(event) {
      try {
        const authPayload = await this.gk.startSession(event);
        this.initializeSession(authPayload);
      } catch (e) {
        this.loginError = e.message;
        console.error(e);
      }
    },
    async registerUser(event) {
      const { passphrase } = event;
      try {
        const userCreation = await gk.createUser({ passphrase });
        const authPayload = await this.gk.startSession({
          apiKey: event.apiKey,
          id: userCreation.id,
          passphrase,
        });
        this.initializeSession(authPayload);
      } catch (e) {
        this.loginError = e.message;
        console.error(e);
      }
    },
    async initializeSession(authPayload) {
      this.currentUser = authPayload.user;
      this.userLoggedIn = true;

      this.startGKListeners();
      this.initIntercoms(authPayload.user.voice_token);

      this.users = [];
      const usersData = await this.gk.findUsers();
      usersData.data.forEach((user) => {
        user.online = false;
        this.users.push(user);
      });
    },
    startGKListeners() {
      gk.events.on('intercoms.created', (e) => {
        console.log('intercoms.created ::', e);
      });
      gk.events.on('intercoms.patched', (e) => {
        console.log('intercoms.patched ::', e);
      });
      gk.events.on('intercoms.connected', (e) => {
        console.log('intercoms.connected ::', e);
        for (let u of this.users) {
          if (u.id === e.id) {
            if (u.online === undefined || !u.online) {
              u.online = true;
            }
          }
        }
      });
      gk.events.on('intercoms.disconnected', (e) => {
        console.log('intercoms.disconnected ::', e);
        for (let u of this.users) {
          if (u.id === e.id) {
            if (u.online === undefined || u.online) {
              u.online = false;
            }
          }
        }
      });
      gk.events.on('users.created', (e) => {
        console.log('users.created ::', e);
        this.users.push(e);
      });
      gk.events.on('users.patched', (e) => {
        console.log('users.patched ::', e);
      });
    },
    stopGKListeners() {
      return gk.events.removeAllListeners();
    },
    async initIntercoms(voiceToken) {
      const config = {
        endpoint,
        id: voiceToken,
        protocol: 'wss',
        port: 80,
      };
      try {
        const intercomStream = await this.gk.connectIntercoms(config);
        document.getElementById('remote').srcObject = intercomStream;
      } catch (e) {
        console.error(e);
      }
    },
    async logoutUser() {
      try {
        await this.gk.stopSession();
        this.stopGKListeners();
        this.currentUser = {};
        this.userLoggedIn = false;
      } catch (e) {
        console.error(e);
        this.currentUser = {};
        this.userLoggedIn = false;
      }
    },
  },
};
</script>
