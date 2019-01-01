<template>
<div>
  <el-row :gutter="20">
    <el-col :xs="24" :sm="8" :lg="8" class="ul_vh">
      <div>
        <ul>

          <li  v-for="item in JSON.parse(deviceInfo).lgInfoArr.reverse()" style="padding-bottom: 10px">
            <!--<div><span>设备名称：<b>{{JSON.parse(deviceInfo).typed}}</b></span></div>-->
            <!--<div><span>登陆时间：<b>{{Number(JSON.parse(deviceInfo).loginTime)|timeFilter}}</b></span></div>-->
            <!--<br>-->
            <div><span>设备名称：<b>{{item.lgDevice}}</b></span></div>
            <div><span>登陆时间：<b>{{item.lgTime|timeFilter}}</b></span></div>
          </li>
        </ul>
      </div>
    </el-col>
    <el-col :xs="24" :sm="8" :lg="8" class="ul_vh">
      <bar1 :chart-data="lineChartData"></bar1>
    </el-col>
    <el-col :xs="24" :sm="8" :lg="8" class="ul_vh">
      <div>
        <!--<div v-for="item in listBox">
          {{item.lable}}<input type="checkbox" ref="firbox" :value="item.id"  @click="firBox($event,$refs.firBox,item.children)">
          <div v-for="subItem in item.children" style="margin-left: 20px">
            {{subItem.lable}}<input type="checkbox" ref="secbox" :value="subItem.id" v-model="subSelected" @click="secBox($event,subItem.children)">

            <div v-for="thirItem in subItem.children" style="margin-left: 40px">
              {{thirItem.lable}}<input type="checkbox" ref="thirbox" :value="thirItem.id" v-model="thirSelected"  @click="thirBox($event,thirItem.children)">
            </div>
          </div>
        </div>-->
      </div>
    </el-col>
  </el-row>
  <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;" >
    <LineChart :chart-data="lineChartData"></LineChart>
  </el-row>
</div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { formatTime } from '@/utils/index';
  import LineChart from '@/views/card/components/LineChart';
  import bar1 from '@/views/card/components/bar1';
  const lineChartData = {
    newVisitis: {
      expectedData: [10, 12, 11, 11, 10, 11, 12],
      // actualData: [120, 82, 91, 154, 162, 140, 145]
    },
    messages: {
      expectedData: [200, 192, 120, 144, 160, 130, 140],
      actualData: [180, 160, 151, 106, 145, 150, 130]
    },
    purchases: {
      expectedData: [80, 100, 121, 104, 105, 90, 100],
      actualData: [120, 90, 100, 138, 142, 130, 130]
    },
    shoppings: {
      expectedData: [130, 140, 141, 142, 145, 150, 160],
      actualData: [120, 82, 91, 154, 162, 140, 130]
    }
  };
  export default {
    name: "tab-second",
    components: {
      LineChart,
      bar1
    },
    computed: {
      ...mapGetters([
        'name',
        'roles',
        'deviceInfo'
      ]),
      // realize(){
      //   window.onresize = function(){
      //     console.log(window.innerWidth)
      //   }
      // },
    },
    data(){
      return{
        listBox:[
          {
            id:1,
            lable:'1',
            children:[
              {
                id:10,
                lable:'10',
                children:[
                  {
                    id:100,
                    lable:'100',
                  }
                ]
              },
              {
                id:11,
                lable:'11',
                children:[
                  {
                    id:110,
                    lable:'110',
                  }
                ]
              }
            ]
          },
          {
            id:2,
            lable:'2',
            children:[
              {
                id:20,
                lable:'20',
                children:[
                  {
                    id:200,
                    lable:'200',
                  }
                ]
              },
              {
                id:21,
                lable:'21',
                children:[
                  {
                    id:210,
                    lable:'210',
                  }
                ]
              }
            ]
          },
          {
            id:3,
            lable:'3',
            children:[
              {
                id:30,
                lable:'30',
              }
            ]
          }
        ],
        lineChartData:lineChartData.newVisitis
      }
    },
    filters:{
      timeFilter(val){
        return formatTime(val)
      }
    },
    created(){
      console.log('tabSecond')
    }
  }
</script>

<style scoped>

</style>
