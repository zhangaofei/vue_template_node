
let user={
  state:{
    name:'',
    age:'',
    token:''
  },


  mutations:{
    SET_token:(state,token)=>{
      state.token=token;
    }
  },

  actions:{
    Login({commit},info){
      // login()
      return new Promise((resolve,reject)=>{
        login(info).then(res=>{
            let data=res.data;
        })
      })
    }
  }
};
