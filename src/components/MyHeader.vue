<template>
  <div class="search">
    <input type="text" placeholder="听你想听..." />
    <button>搜索</button>
  </div>
</template>
<style scoped>
.search {
  margin: 10px auto;
  /* text-align: center; */
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.search input {
  height: 24px;
  width: 250px;
  border-radius: 5px;
  border: 1px solid gray;
  font-size: 14px;
  background: url("/images/icons/search.png") no-repeat;
  background-size: 24px;
  background-position: 225px;
}
.search button {
  /* background-color: #fff; */
  outline: none;
  border: none;
  height: 22px;
  background-color: rgba(0, 0, 0, 0);
}
.search button img {
  height: 22px;
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
