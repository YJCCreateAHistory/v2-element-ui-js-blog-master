<template>
  <div class="container">
    <div class="demo-image__lazy">
      <el-image :src="item.img" v-for="item in urls" :key="item.id"></el-image>
    </div>
  </div>
</template>

<script>
import { GetRequest } from "../api/http";
export default {
  name: "imgWall",
  data() {
    return {
      urls: [],
    };
  },
  methods: {},
  mounted() {
    GetRequest("/img/list").then((data) => {
      // console.log(data);
      this.urls = data.records;
    });
  },
};
</script>

<style scoped lang="less">
.container {
  // position: absolute;
  margin-top:100px;
    .el-image {
      width: 50%;
      height: 50%;
    }
}
</style>
