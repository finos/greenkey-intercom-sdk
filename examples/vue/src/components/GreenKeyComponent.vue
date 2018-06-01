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
import GreenKey from 'greenkey-sdk';
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
      userLoggedIn: false,
      users: [],
      gk,
      loginError: null,
    };
  },
  methods: {
    async loginUser(event) {
      try {
        const login = await this.gk.startSession(event);
        this.initializeSession(login.voice_token);
      } catch (e) {
        this.loginError = e.message;
        console.error(e);
      }
    },
    async registerUser(event) {
      const { passphrase } = event;
      try {
        const userCreation = await gk.createUser({ passphrase });
        const login = await this.gk.startSession({
          apiKey: event.apiKey,
          id: userCreation.id,
          passphrase,
        });
        this.initializeSession(login.voice_token);
      } catch (e) {
        this.loginError = e.message;
        console.error(e);
      }
    },
    async initializeSession(voiceToken) {
      this.userLoggedIn = true;
      this.startGKListeners();
      this.initIntercoms(voiceToken);
      const usersData = await this.gk.findUsers();
      this.users = usersData.data;
    },
    startGKListeners() {
      gk.events.on('intercoms.created', (e) => {
        console.log('intercoms.created ::', e);
      });
      gk.events.on('intercoms.patched', (e) => {
        console.log('intercoms.patched ::', e);
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
        this.userLoggedIn = false;
      } catch (e) {
        console.error(e);
        this.userLoggedIn = false;
      }
    },
  },
};
</script>
