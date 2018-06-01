<template>
  <div class="hero-body">
    <div class="container has-text-centered">
      <div
        class="login"
        style="text-align:center"
      >
        <div class="heading">
          <h1>Log In or Register</h1>
          <h1 v-if="loginError">{{ loginError }}</h1>
        </div>
        <form class="form">
          <input
            type="text"
            name="apiKey"
            placeholder="API Key"
            v-model="apiKey"
          >
          <input
            type="text"
            name="id"
            placeholder="ID"
            v-model="id"
          >
          <input
            type="password"
            name="passphrase"
            placeholder="Passphrase"
            v-model="passphrase"
          >
          <button
            type="button"
            class="button signup"
            @click="login"
          >
            Log in
          </button>
          <button
            type="button"
            class="button signup"
            @click="register"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginComponent',
  props: {
    loginError: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      apiKey: null,
      id: null,
      passphrase: null,
    };
  },
  methods: {
    login() {
      const apiKey = this.apiKey;
      const id = this.id;
      const passphrase = this.passphrase;

      this.$emit(
        'login',
        {
          apiKey,
          id,
          passphrase,
        },
      );
    },
    register() {
      const apiKey = this.apiKey;
      const passphrase = this.passphrase;

      this.$emit(
        'signup',
        {
          apiKey,
          passphrase,
        },
      );
    },
  },
};
</script>
