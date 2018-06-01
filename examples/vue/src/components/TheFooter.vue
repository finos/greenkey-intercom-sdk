<template>
  <div class="hero-foot">
    <nav class="tabs is-boxed is-fullwidth">
      <div class="container">
        <ul>
          <li>
            <a @click.once="logout">
              End Session
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'TheFooter',
  methods: {
    logout() {
      this.$emit(
        'logout',
      );
    },
  },
};
</script>
