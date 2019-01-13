
module.exports = {
  checkDevices:function (device) {
    console.log('device:',device)
    if(device.indexOf('Windows ')>0){
      return 'Windows'
    }else if(device.indexOf('Android')>0) {
      return 'Android'
    }else {
      return '其他设备'
    }
  }
};
// export function checkDevices(device) {
//     if(device.indexOf('Windows ')>0){
//       return 'Windows'
//     }else if(device.indexOf('Android')>0) {
//       return 'Android'
//     }else {
//       return '其他设备'
//     }
// }
