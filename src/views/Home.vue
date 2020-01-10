<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld @click="xxx(1)" @my-event="xxx(2)" data-inherits="abc" msg="Welcome to Your Vue.js App" />
    <div class="backgr"></div>
    <el-popover
        placement="bottom"
        title="标题"
        width="200"
        :offset="20"
        :visible-arrow="true"
        trigger="click"
        content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
        <el-button slot="reference">click 激活</el-button>
    </el-popover>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "home",
  data() {
      return {
          abc: {
              aaa: 2,
              bbb: [{ccc: 33}]
          }
      }
  },
  components: {
    HelloWorld
  },
  methods: {
      xxx(key) {
          console.log(key)
          this.$set(this.abc, "bbb[0].ccc", 99)
          console.log(this.abc)
      }
  }
};
</script>

<style lang="scss" scoped>
.backgr {
    background: url("../assets/logo.png");
    
}
</style>