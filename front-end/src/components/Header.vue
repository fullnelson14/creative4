<template>
  <div class="header">
    <h3>Hero Creator</h3>
    <router-link to="/">Home</router-link>|
    <router-link to="/create">Create</router-link>
  </div>
</template>


<script>
export default {
  name: "Header"
};
</script>


<style lang="scss" scoped>
.header {
  padding: 0 30px 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>