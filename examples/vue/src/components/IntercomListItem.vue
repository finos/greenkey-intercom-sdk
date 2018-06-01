<template>
  <li class="level">
    <div class="level-left">
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
      activeClass: 'is-danger',
      inactiveClass: 'is-success',
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
