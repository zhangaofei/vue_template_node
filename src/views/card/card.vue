<template>
    <div class="app-container card_warp">
      <el-tabs v-model="activeName">
        <el-tab-pane label="echars" name="first">
          <el-row :gutter="20">
            <el-col :xs="12" :sm="8" :lg="6" v-for="(item,index) in listImg" :key="index">
              <div class="grid-content bg-purple">
                <img :src="item.img" alt="" class="file_img">
                <div class="file_text">
                  <el-tooltip content="" class="font_wrap" placement="top" effect="light">
                    <div slot="content">{{item.type}}</div>
                    <span>{{item.type}}</span>
                  </el-tooltip>
                  <p>{{item.url}}</p>
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;" v-if="activeName=='first'">
            <LineChart :chart-data="lineChartData"></LineChart>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="imgs布局" name="second">
          <el-tabs tab-position="left">
            <el-tab-pane label="用户管理">
              <div style="margin-bottom: 10px">
                <span>用户管理</span>
                <el-button size="mini" type="primary">add</el-button>
                <el-button size="mini" type="primary">选择</el-button>
                <el-button size="mini" type="primary" @click="changeAllBox">全选</el-button>
                <el-button size="mini" type="primary">删除</el-button>
              </div>
              <el-row :gutter="20">
                <el-col :xs="12" :sm="8" :lg="6" v-for="(item,index) in listImg2" :key="index">
                  <div class="grid-content bg-purple">
                    <img :src="item.img" alt="" class="file_img">
                    <div class="file_text">
                      <el-tooltip content="" class="font_wrap" placement="top" effect="light">
                        <div slot="content">{{item.type}}</div>
                        <span>{{item.type}}</span>
                      </el-tooltip>
                      <p>{{item.url}}</p>
                      <p>
                        <!--<el-checkbox-group v-model="selectedBoxArr" @change="changeBox">-->
                          <!--<el-checkbox></el-checkbox>-->
                        <!--</el-checkbox-group>-->
                        <input type="checkbox" v-model="selectedBoxArr" :value=item.id @change="changeBox" ref="single_box" class="single_box">
                      </p>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="配置管理">配置管理</el-tab-pane>
          </el-tabs>
        </el-tab-pane>
        <el-tab-pane label="自定义tab" name="third">
          <!--编辑web终端-->
          <div class="mail public mobileDialog webend">
            <el-dialog
              title='bianji'
              :visible.sync="editWebVisible"
              size="small"
              custom-class="dialog public"
              top="10%"
              :close-on-click-modal="true"
            >
              <div class="mail-form">
                <el-form :model="editForm"  ref="editForm" label-width="100px" class="demo-ruleForm">
                  <el-form-item label="名称" prop="type" class="">
                    <el-input v-model="editForm.type" class="el_put" placeholder="名称" ></el-input>
                  </el-form-item>
                  <el-form-item label="地址" prop="type" >
                    <el-input v-model="editForm.type" class="el_put el_check " placeholder="地址"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div class='form-footer ' slot="footer">
                <div style="" class="foot">
                  <span @click="resetForm('editForm')" class="canle">取消</span>
                  <el-button
                    type="primary"
                    class="btn_save"
                  >
                    确定
                  </el-button>
                </div>
              </div>
            </el-dialog>
          </div>
          <div class="left">
            <ul>
              <li class="pointer" v-for="(item,index) in tabInfo" :class="{curstyle:selectIndex==index}" @click="tabSelect(index)">{{item}}
              </li>
            </ul>
          </div>
          <div class="right">
            <!--webTerminal 公共头部-->
            <div class="headed">
              <span v-if="selectIndex==0" class="head_border">终端控制</span>
              <span v-if="selectIndex==1" class="head_border">远程桌面</span>
              <el-button type="primary"   size="small" class="btn_self" >增 加</el-button>
              <el-button type="primary"  size="small" class="btn_self" @click="editWebVisible=!editWebVisible" v-if="false">编 辑</el-button>
              <el-button type="primary"  size="small" class="btn_self" >选 择</el-button>

              <el-button type="primary"  size="small" class="btn_self" @click="changeAllBox" >全 选</el-button>

              <!--<el-button type="primary" size="small" class="btn_self" @click="showDel" v-if="isShowSelect">删 除</el-button>-->

            </div>

            <ul class="ul_cont" v-if="selectIndex==0">
              <li v-for="(item,index) in listImg2" class="li_cont" :key="index">
                <div >
                  <a  target="_blank"><img :src="item.img" alt="" class="aimg" style="width: 60px;"></a>
                </div>
                <div class="div2">
                  <p>
                    <a  target="_blank">
                      <el-tooltip placement="top" effect="light">
                        <div slot="content"> {{item.type}}</div>
                        <div class="list_tooltip" >{{item.type}}</div>
                      </el-tooltip>
                    </a>
                  </p>
                  <p >
                    &nbsp;
                    <template >
                      <input type="checkbox" class="put_box" v-model="selectedBoxArr" ref="webBox" :value=item.id >
                    </template>
                  </p>
                  <p>
                    <span style="color: #438AFE;" @click="showEdit(item)" class="pointer edit_icon"><i class="el-icon-edit"></i></span>
                  </p>
                </div>
              </li>
            </ul>
            <ul class="ul_cont" v-if="selectIndex==1">
              <li v-for="(item,index) in listImg2" class="li_cont" :key="index">
                <div >
                  <a  target="_blank"><img :src="item.img" alt="" class="aimg" style="width: 60px;"></a>
                </div>
                <div class="div2">
                  <p>
                    <a  target="_blank">
                      <el-tooltip placement="top" effect="light">
                        <div slot="content"> {{item.type}}</div>
                        <div class="list_tooltip" >{{item.type}}</div>
                      </el-tooltip>
                    </a>
                  </p>
                  <p >
                    &nbsp;
                    <template >
                      <input type="checkbox" class="put_box" v-model="selectedBoxArr" ref="webBox" :value=item.id >
                    </template>
                  </p>
                  <p>
                    <span style="color: #438AFE;" @click="showEdit(item)" class="pointer edit_icon"><i class="el-icon-edit"></i></span>
                  </p>
                </div>
              </li>

            </ul>
            <!--统一分页 显示 -->
          </div>
        </el-tab-pane>
        <el-tab-pane label="分页" name="four">
          <div class="block">
            <span class="demonstration">完整功能</span>
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage4"
              :page-sizes="[100, 200, 300, 400]"
              :page-size="100"
              layout="total, sizes, prev, pager, next, jumper"
              :total="400">
            </el-pagination>
            <langSelect></langSelect>
          </div>
        </el-tab-pane>

      </el-tabs>
    </div>

</template>

<script>
  const lineChartData = {
    newVisitis: {
      expectedData: [100, 120, 161, 134, 105, 160, 165],
      actualData: [120, 82, 91, 154, 162, 140, 145]
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
  import langSelect from '@/components/langSelect'
  import LineChart from './components/LineChart';
  export default {
    name: "card",
    components: {
      LineChart,
      langSelect
    },
    data(){
      return{
        editForm:{
          type:''
        },
        editWebVisible:false,
        selectedBoxArr:[],
        lineChartData: lineChartData.newVisitis,
        activeName: 'first',
        tabInfo: [ '终端控制', '远程桌面'],
        selectIndex: 0,
        listImg:[
          {
            img:require('@/assets/imgs/new_guge.png'),
            type:'中国科技大学博物',
            url:'百度'
          },
          {
            img:require('@/assets/imgs/new_guge.png'),
            type:'南京信息工程学院教务',
            url:'百度'
          },
          {
            img:require('@/assets/imgs/new_guge.png'),
            type:'中国科技大学博物',
            url:'百度'
          },
          {
            img:require('@/assets/imgs/new_guge.png'),
            type:'中国科技大学博物',
            url:'百度'
          },
          {
            img:require('@/assets/imgs/new_guge.png'),
            type:'中国科技大学博物',
            url:'百度'
          },
          {
            img:require('@/assets/imgs/new_guge.png'),
            type:'中国科技大学博物',
            url:'百度'
          }
        ],
        listImg2:[
          {
            id:1,
            img:require('@/assets/imgs/new_guge.png'),
            type:'中科',
            url:'百度'
          },
          {
            id:2,
            img:require('@/assets/imgs/new_guge.png'),
            type:'南信',
            url:'百度'
          },
          {
            id:3,
            img:require('@/assets/imgs/new_guge.png'),
            type:'中国',
            url:'百度'
          },
          {
            id:4,
            img:require('@/assets/imgs/new_guge.png'),
            type:'科技',
            url:'百度'
          },
          {
            id:5,
            img:require('@/assets/imgs/new_guge.png'),
            type:'大学',
            url:'百度'
          },
          {
            id:-1,
            img:require('@/assets/imgs/new_guge.png'),
            type:'博物',
            url:'百度'
          }
        ],
        currentPage4: 4
      }
    },
    methods:{
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      showEdit(item){
        this.editForm.type=item.type;
        this.editForm.id=item.id;
        this.editWebVisible=true;
        console.log('showEdit:',this.editForm)
      },
      resetForm(formName){
        this.$refs[formName].resetFields();
        this.editWebVisible=false;
      },
      changeBox(){
        console.log('selectedBoxArr',this.selectedBoxArr)
      },
      changeAllBox(){
        if(this.selectedBoxArr.length>0&&this.selectedBoxArr.length<this.listImg2.length){
          this.selectedBoxArr=[];
          for(let item of this.listImg2){
            this.selectedBoxArr.push(item.id)
          }
          console.log('selectedBoxArr',this.selectedBoxArr)
        }else if(this.selectedBoxArr.length==this.listImg2.length){
          this.selectedBoxArr=[];
        } else {
          this.selectedBoxArr=[];
          for(let item of this.listImg2){
            this.selectedBoxArr.push(item.id)
          }
        }
      },
      tabSelect(index) {
        this.selectIndex=index;
      },
    }

  }
</script>

<style lang="scss" >
  .card_warp{
    .el-row {
      margin-bottom: 20px;
      &:last-child {
        margin-bottom: 0;
      }
    }
    .el-col {
      border-radius: 4px;
      padding-bottom: 10px;
    }
    .bg-purple-dark {
      /*background: #99a9bf;*/
    }
    .bg-purple {
      /*background: #d3dce6;*/
    }
    .bg-purple-light {
      /*background: #e5e9f2;*/
    }
    .row-bg {
      padding: 10px 0;
      background-color: #f9fafc;
    }
    .grid-content {
      border-radius: 4px;
      min-height: 36px;
      /*border: 1px solid;*/
      height: 150px;
      .file_img{
        width: 76px;
        float: left;
      }
      .file_text{
        float: left;
        padding-left: 10px;
        font-size: 14px;
        .font_wrap{
          white-space:nowrap;
          text-overflow:ellipsis;
          -o-text-overflow:ellipsis;
          /*-moz-binding:url('ellipsis.xml#ellipsis');*/
          overflow:hidden;
          width: 150px;
          display: inline-block;
        }

        p{
          margin-top: 5px;
          margin-bottom: 5px;
        }
      }
      /*========*/

    }
  }
  @media screen and (max-width: 920px) {
    .card_warp{
      .grid-content{
        .file_img{
          width: 56px;
        }
        .file_text{
          .font_wrap{
            width: 120px;
          }
        }
      }
    }
  }
  @media screen and (max-width: 600px) {
    .card_warp{
      .grid-content{
        .file_img{
          width: 40px;
        }
        .file_text{
          font-size: 12px;
        }
      }
      /**/
      .el-tabs__nav-scroll{
        #tab-0{
          display: none;
        }
      }
    }
  }
</style>
<style  lang="scss">
  .right{
    float: right;
    padding-top: 10px;
    /*border: 1px solid;*/
    width: 89%;
    .headed{
      margin-bottom: 10px;
      .head_border{
        width: 64px;
        display: inline-block;
        margin-right: 20px;
      }
    }
    .put_box{
      width: 16px;
      height: 16px;
      margin-left: -5px;
    }
    ul{
      list-style: none;
    }
    .li_cont{
      float: left;
    }
  }
</style>
