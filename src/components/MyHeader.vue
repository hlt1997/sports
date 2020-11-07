<template>
  <div class="search">
    <mt-search autofocus v-model="value"> </mt-search>
  </div>
</template>
<style scoped>
div.mint-searchbar {
  padding: 0 !important;
}
</style>
<script>
export default {
  data() {
    return {
      value: "",
    };
  },
};
</script>
