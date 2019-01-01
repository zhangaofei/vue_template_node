import axios from 'axios'
import {Message, MessageBox} from 'element-ui'
import store from '../store'
import router from '../router';


export function reqed(option) {
  let header = {}, body = {},data;
  axios.defaults.headers.post['Content-Type'] = 'application/json';
  axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
  if (option.method == 'get' || option.method == 'post' || option.method == 'put' || option.method == 'delete') {
    header = {
      "Content-Type": "application/json",
      "Accept": "application/json"
    };
    body=option.body;

    return new Promise((resolve,reject)=>{
      axios({
        timeout:90000,
        method: option.method,
        url: option.url,
        params: option.params,
        headers: header,
        body:body,
        data:option.data
      }).then(response=>{
        let res=response.data;
        if(response.status==200){
          if(res){
            resolve(res)
            console.log('response:_reqs',resolve(res),'===',res)
          }
        }else {
          reject(err)
        }

      })
    }).catch((error)=>{
      console.log('catch:',error)
    })

  }
}
