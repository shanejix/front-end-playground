

//axios

import axios from 'axios'

axios.get('data').then(
  data => {
    return data
  }
).then(
  //chneg gong
  data => {
    console.log(data);

  }
).then(
  //shi bai
  e => {
    console.log(e);

  }
)

//Promise

new Promise((resolve, reject)=> {
  if ('condition') {
    //chenggong
    resolve('data')
  } else {
    //shibai
    reject('error')
  }
})

//Promise ueage

//pendding
const promise = new Promise((resolve, reject) => {
  //pendding->fullfilled
  resolve('data')

  //pedding->rejected
  //reject('error)
})


promise.then(
  //resolve()
  (result) => {
    //->fullfilled
    console.log(result);
    
  },
  //reject()
  (reason) => {
    //->rejected
    console.log(reason);
    
  }
)


//.catch()

//=>

// promise.then(null,rejectFn)