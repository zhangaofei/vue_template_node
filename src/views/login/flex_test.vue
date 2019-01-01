<template>
  <div class="flexd">
    <div class="nav">
        <ul class="ul_left">
          <li>left</li>
        </ul>
      <ul class="ul_right">
        <li>right</li>
      </ul>
    </div>
    <div class="main">
      <div class="dh">1111111111</div>
      <div class="dh">1111111111</div>
      <div class="dh">1111111111</div>
      <div class="dh">1111111111</div>
    </div>
    <div class="footer">
      <div class="dh">1111111111</div>
    </div>
  </div>
</template>

<style lang="scss">
  .flexd{
    box-sizing: border-box;
    position: relative;
    height: 100%;
    width: 100%;
    .nav{
      height: 70px;
      line-height: 80px;
      font-size: 20px;
      border: 1px solid;
      background: #5CACEE;
      position: fixed;
      width: 100%;
      z-index: 100;
      ul,li{
        margin: 0;
        padding: 0;
        list-style: none;
      }
      .ul_left{
        float: left;
      }
      .ul_right{
        float: right;
      }
    }
    .main{
      border: 1px solid;
      position: absolute;
      width: 500px;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      .dh{
        height: 50px;
      }
    }
    .footer{
      width: 100%;
      height: 60px;
      background: #5CACEE;
      position: absolute;
      bottom: 0;
    }
  }
</style>
