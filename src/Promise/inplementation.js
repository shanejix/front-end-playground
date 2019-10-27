
//demo

new Promise(
  //excutor
  (resolve, reject) => {
    //sync or async task

    //data sucess
    resolve('data')

    //or data faile

    reject('error')
  }
)



//es6,class

class myPromise {


  //构造函数,executor
  constructor(executor) {

    let resolve = () => { }

    let reject = () => { }

    executor(resolve, reject)
  }
}


//use

new myPromise()