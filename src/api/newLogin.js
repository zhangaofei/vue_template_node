import  {reqed} from '@/utils/reqs'
// console.log('req:',reqed)
export function login(name,psw) {
  console.log('name:',name)
  return reqed({
    method:'post',
    url:'/api/user/login',
    // params:{name:name,psw:psw},/*get请求参数放在params里面*/
    data:{name:name,psw:psw}/*post请求参数放在data里面*/
  })

}

export function userRegister(param) {
  return reqed({
    method:'post',
    url:'/api/user/register',
    // params:{name:name,psw:psw},/*get请求参数放在params里面*/
    data:param/*post请求参数放在data里面*/
  })

}
export function nodeLogout(param) {
  return reqed({
    url: '/api/user/logout',
    method: 'post',
    // data: param
  })
}
//update
export function updataDashboard(param) {
  return reqed({
    url: '/api/user/updateLoginInfo',
    method: 'post',
    // data: param
  })
}
