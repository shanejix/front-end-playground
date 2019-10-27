
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

    //1.0为了达到链式调用的目的，在.then()中返回一个新的Promise这里叫做Promise2

    //将promise2返回的值传递到下一个,then()中

    //2.0在第一个then中return了一个参数（未知），return出来的新的Promis就是onFullfilled或者onRejected

    //第一个then返回的值（onFullfilled或onRejected）记为x，判断x的函数记为resolvePromise

    //01.判断x是否是promsie，是则取其结果作为新的promise2的成功结果

    //02.如果是普通之直接作为promise2的成功结果

    //因此resolvePromsie的参数需要：

    //默认返回的promise2

    //x：上一个promsie返回的对象

    //promise2的resovle和reject

    let promise2 = new myPromise((resolve, reject) => {

      if (this.status === RESOLVEED) {
        let x = onFullfilled(this.value)

        resolvePromise(promise2, x, resolve, reject)
      }

      if (this.status === REJECTED) {
        let x = onRejected(this.reason)

        resolvePromise(promise2, x, resolve, reject)
      }

      if (this.status === PENDDING) {
        this.fullfilledCB.push(() => {
          let x = onFullfilled(this.value)

          resolvePromise(promise2, x, resolve, reject)
        })

        this.rejectedCB.push(() => {
          let x = onRejected(this.reason)

          resolvePromise(promise2, x, resolve, reject)
        })
      }
    })


    //返回promise2，完成链式调用
    return promise2
  }
}

function resolvePromise() {
  //to do
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