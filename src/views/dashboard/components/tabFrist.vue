<template>
    <div>
      <el-row :gutter="20">
        <!--{{realize}}-->
        <!-- <span>
           <svg t="1492500959545" @click="" class="svg-icon hamburger" style="" viewBox="0 0 1024 1024"
                version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1691" xmlns:xlink="http://www.w3.org/1999/xlink" width="64" height="64">
             <path d="M966.8023 568.849776 57.196677 568.849776c-31.397081 0-56.850799-25.452695-56.850799-56.850799l0 0c0-31.397081 25.452695-56.849776 56.850799-56.849776l909.605623 0c31.397081 0 56.849776 25.452695 56.849776 56.849776l0 0C1023.653099 543.397081 998.200404 568.849776 966.8023 568.849776z"
                   p-id="1692"></path>
             <path d="M966.8023 881.527125 57.196677 881.527125c-31.397081 0-56.850799-25.452695-56.850799-56.849776l0 0c0-31.397081 25.452695-56.849776 56.850799-56.849776l909.605623 0c31.397081 0 56.849776 25.452695 56.849776 56.849776l0 0C1023.653099 856.07443 998.200404 881.527125 966.8023 881.527125z"
                   p-id="1693"></path>
             <path d="M966.8023 256.17345 57.196677 256.17345c-31.397081 0-56.850799-25.452695-56.850799-56.849776l0 0c0-31.397081 25.452695-56.850799 56.850799-56.850799l909.605623 0c31.397081 0 56.849776 25.452695 56.849776 56.850799l0 0C1023.653099 230.720755 998.200404 256.17345 966.8023 256.17345z"
                   p-id="1694"></path>
           </svg>
         </span>-->
        <el-col :xs="12" :sm="8" :lg="6" v-for="(item,index) in imgs" :key="index" style="position: relative;">
          <!--<div>-->
          <img :src="item.img" alt="" class="use_img" >
          <!--</div>-->
          <div class="use_cont" style="">
            <span >{{item.title}}</span>
          </div>
        </el-col>

      </el-row>

      <!--<el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;" v-if="'first'==activeName">
        <LineChart :chart-data="lineChartData" v-if="false"></LineChart>
      </el-row>-->
    </div>
</template>

<script>
    export default {
        name: "user-manger",
        components:{

        },
      data(){
       return{
         // imgs:arrImg,
       }
      },
      props:['imgs'],
      created(){
          console.log('tabFirst')
      }
    }
</script>

<style scoped>

</style>
