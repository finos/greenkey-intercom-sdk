<template>
  <li class="level">
    <div class="level-left">
      <span
        v-if="!user.online"
        class="online-status-disconnected">
      </span>
      <span
        v-else-if="user.online"
        class="online-status-connected">
      </span>
      <div class="level-item">
        {{ user.id }}
      </div>
    </div>
    <div class="level-right">
      <div
        v-if="!liveIntercom"
        class="level-item"
        @click="intercomUser(user.id)"
      >
        <a class="button is-success">
          START
        </a>
      </div>
      <div
        v-else
        class="level-item"
        @click="stopIntercom()"
      >
        <a class="button is-danger">
          STOP
        </a>
      </div>
    </div>
  </li>
</template>

<script>
/* eslint-disable no-console */
export default {
  name: 'IntercomListItem',
  props: {
    user: {
      type: Object,
      default: () => ({
        id: '',
        online: false,
      }),
    },
    gk: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      liveIntercom: null,
    };
  },
  methods: {
    async intercomUser(id) {
      this.startIntercom([id]);
    },
    async startIntercom(idArray) {
      const intercom = { targets: idArray };
      try {
        const newIntercom = await this.gk.createIntercom(intercom);
        if (newIntercom) {
          this.liveIntercom = newIntercom;
        }
      } catch (e) {
        console.error(e);
      }
    },
    async stopIntercom() {
      try {
        const stoppedIntercom = await this.gk.stopIntercom(this.liveIntercom);
        if (stoppedIntercom) {
          this.liveIntercom = null;
        }
      } catch (e) {
        console.error(e);
      }
    },
  },
};
</script>

<style scoped>

.online-status-connected {
  content: '';
  position: relative;
  width: 20px;
  height: 20px;
  left: -20px;
  border-radius: 50%;
  background: green;
}

.online-status-disconnected {
  content: '';
  position: relative;
  width: 20px;
  height: 20px;
  left: -20px;
  border-radius: 50%;
  background: gray;
}

</style>
