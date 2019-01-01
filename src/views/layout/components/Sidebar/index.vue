<template>
  <!--<scroll-bar v-if="false">-->
    <!--<el-menu mode="vertical" unique-opened :default-active="$route.path" :collapse="isCollapse" background-color="#304156" text-color="#fff" active-text-color="#409EFF">-->
      <!--<sidebar-item :routes="routes"></sidebar-item>-->
    <!--</el-menu>-->
  <!--</scroll-bar>-->


  <!--zaf======self -->
  <div style="margin-top:50px" class="side_bar">
    <bar1></bar1>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import ScrollBar from '@/components/ScrollBar'
import bar1 from '@/views/card/components/bar1';

export default {
  components: {
    SidebarItem,
    ScrollBar ,
    bar1
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
      return this.$router.options.routes
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
<style lang="scss">
  .side_bar{
    background-color: #fff;
    border-left: 1px solid lightgray;
  }
</style>
