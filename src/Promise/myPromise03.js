
//demo

/*
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
*/


//es6,class

//myPromie status
const PENDDING = 1;
const RESOLVEED = 2;
const REJECTED = 3;

class myPromise {

  //构造函数,executor
  constructor(executor) {

    //inital statu
    this.status = PENDDING;
    //success value
    this.value = null;
    //fail reason
    this.reason = null;

    //fullfilled callback arr
    this.fullfilledCB = []
    //rejected callback arr
    this.rejectedCB = []

    //success callback
    let resolve = (data) => {
      //why setTimeout()?=>
      setTimeout(() => {

        if (this.status === PENDDING) {
          this.status = RESOLVEED
          this.value = data
          this.fullfilledCB.forEach(f => f(data))
        }
      }, 0);
    }
    //fail callback
    let reject = () => {
      //why setTimeout()=>
      setTimeout((reason) => {

        if (this.status === PENDDING) {
          this.status = REJECTED
          this.reason = reason
          this.rejectedCB.forEach(f => f(reason))
        }

      }, 0);
    }



    //constuctor first execute and execute the executor
    executor(resolve, reject)
  }

  then(onFullfilled, onRejected) {
    if (typeof onFullfilled === 'function') {
      //fullfilled callback
      this.fullfilledCB.push(onFullfilled)
    }

    if (typeof onRejected === 'function') {
      //rejected callback
      this.rejectedCB.push(onRejected)
    }
  }
}



// export default myPromise

//usage....

let promise = new myPromise(
  //executor
  (resolve, reject) => {

    //async request
    let data = 'aync request'

    if (true) {
      //executor success callback
      resolve(data)
    } else {
      //executor fail callback
      reject('error')
    }
  }
)

promise.then(
  //fullfilled fn
  (data) => {
    console.log(data);

  },
  //rejected fn
  (reason) => {
    throw new Error(reason)
  }
)