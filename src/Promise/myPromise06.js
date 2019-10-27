
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

  static all(promises) {
    return new Promise((resolve, reject) => {
      let count = 0;
      let values = [];

      function done() {
        count++;
        if (count === promises.length) {
          resolve(values)
        }
      }

      promises.forEach(
        (p, i) => {
          p.then(val => {
            values[i] = val;
            done()
          })
        },
        reject
      )
    })
  }
}

function resolvePromise(promise2, x, resolve, reject) {

  // 规范 2.3.1，x 不能和 promise2 相同，避免循环引用
  if (promise2 === x) {
    return reject(new TypeError("Error"));
  }
  // 规范 2.3.2
  // 如果 x 为 Promise，状态为 pending 需要继续等待否则执行
  if (x instanceof myPromise) {
    if (x.status === 1) {//pedding
      x.then(function (value) {
        // 再次调用该函数是为了确认 x resolve 的
        // 参数是什么类型，如果是基本类型就再次 resolve
        // 把值传给下个 then
        resolvePromise(promise2, value, resolve, reject);
      }, reject);
    } else {
      x.then(resolve, reject);
    }
    return;
  }
  // 规范 2.3.3.3.3
  // reject 或者 resolve 其中一个执行过得话，忽略其他的
  let called = false;
  // 规范 2.3.3，判断 x 是否为对象或者函数
  if (x !== null && (typeof x === "object" || typeof x === "function")) {
    // 规范 2.3.3.2，如果不能取出 then，就 reject
    try {
      // 规范 2.3.3.1
      let then = x.then;
      // 如果 then 是函数，调用 x.then
      if (typeof then === "function") {
        // 规范 2.3.3.3
        then.call(
          x,
          y => {
            if (called) return;
            called = true;
            // 规范 2.3.3.3.1
            resolvePromise(promise2, y, resolve, reject);
          },
          e => {
            if (called) return;
            called = true;
            reject(e);
          }
        );
      } else {
        // 规范 2.3.3.4
        resolve(x);
      }
    } catch (e) {
      if (called) return;
      called = true;
      reject(e);
    }
  } else {
    // 规范 2.3.4，x 为基本类型
    resolve(x);
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



let p3 = new Promise()
let p2 = new Promise()
let p1 = new Promise()

promise.all([p1, p2, p3]).then(
  data => {
    console.log(data);//结果顺序和promise实例顺序一致

  },
  err => {
    console.log(err);

  }
)