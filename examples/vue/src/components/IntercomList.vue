<template>
  <div class="hero-body">
    <div class="container has-text-centered">
      <h1 class="content">Intercoms</h1>
      <br>
      <div class="columns is-centered">
        <div class="column is-one-third"/>
        <div class="column is-one-third">
          <ul class="user-list">
            <IntercomListItem
              v-for="user of users" v-if="currentUser.id !== user.id"
              :key="user.id"
              :user="user"
              :gk="gk"
            />
          </ul>
        </div>
        <div class="column is-one-third"/>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-console */
import IntercomListItem from './IntercomListItem';

export default {
  name: 'IntercomList',
  components: {
    IntercomListItem,
  },
  props: {
    currentUser: {
      type: Object,
      required: true,
    },
    users: {
      type: Array,
      default: () => [],
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
};
</script>
