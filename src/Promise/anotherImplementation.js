// 三种状态
const PENDING = "pending";
const FULLFILLED = "fullfilled";
const REJECTED = "rejected";

// promise 接收一个函数参数(executor)，该函数会立即执行

function MyPromise(executor) {
  this.status = PENDING
  this.value = null

  //保存.then中的回调（pedding时保存，并且只保存一个fullfilled或者rejeacted)
  this.resolvedCallbakcs = []
  this.rejectedCallbacks = []


  this.resolve = (value) => {

    //value 如果是Promise的实例，递归执行
    if (value instanceof MyPromise) {
      return value.then(this.resolve, this.reject)
    }

    //js执行机制，保证执行顺序
    setTimeout(() => {
      if (this.status === PENDING) {
        this.status = FULLFILLED
        this.value = value

        this.resolvedCallbakcs.forEach(f => f(value))
      }
    }, 0);
  }

  this.reject = (reason) => {
    //异步任务，保证执行顺序
    setTimeout(() => {
      if (this.status === PENDING) {
        this.status = REJECTED
        this.value = reason

        this.resolvedCallbakcs.forEach(f => f(reason))
      }
    }, 0);
  }

  // 用于解决以下问题
  // new Promise(() => throw Error('error))

  try {
    executor(this.resolve, this.rejected)
  } catch (e) {
    this.reject(e)
  }
}

MyPromise.prototype.then = (onResolved, onRejected) => {
  var self = this;
  // 规范 2.2.7，then 必须返回一个新的 promise
  var promise2;
  // 规范 2.2.onResolved 和 onRejected 都为可选参数
  // 如果类型不是函数需要忽略，同时也实现了透传
  // Promise.resolve(4).then().then((value) => console.log(value))
  onResolved = typeof onResolved === 'function' ? onResolved : v => v;
  onRejected = typeof onRejected === 'function' ? onRejected : r => { throw r };

  if (self.status === FULLFILLED) {
    promise2 = new MyPromise((resolve, reject) => {
      // 规范 2.2.4，保证 onFulfilled，onRjected 异步执行
      setTimeout(() => {
        try {
          let x = onResolved(self.value)
          resolutionProcedure(promise2, x, resolve, reject);
        } catch (reason) {
          reject(reason)
        }
      }, 0);
    })

    return promise2
  }

  if (self.status === REJECTED) {
    promise2 = new MyPromise((resolve, reject) => {
      // 规范 2.2.4，保证 onFulfilled，onRjected 异步执行
      setTimeout(() => {
        try {
          let x = onRejected(self.value)
          resolutionProcedure(promise2, x, resolve, reject);
        } catch (reason) {
          reject(reason)
        }
      }, 0);
    })

    return promise2
  }

  if (self.status === PENDING) {
    promise2 = new MyPromise((resolve, reject) => {

      self.resolvedCallbakcs.push(() => {
        try {
          let x = onResolved(self.value)

          resolutionProcedure(promise2, x, resolve, reject)
        } catch (e) {
          reject(e)
        }
      })

      self.rejectedCallbacks.push(function () {
        try {
          var x = onRejected(self.value);
          resolutionProcedure(promise2, x, resolve, reject);
        } catch (r) {
          reject(r);
        }
      });

    })

    return promise2
  }


}

function resolutionProcedure(promise2, x, resolve, reject) {
  // 规范 2.3.1，x 不能和 promise2 相同，避免循环引用
  if (promise2 === x) {
    return reject(new TypeError("Error"));
  }

  // 规范 2.3.2
  // 如果 x 为 Promise，状态为 pending 需要继续等待否则执行
  if (x instanceof MyPromise) {
    if (x.status === PENDING) {
      x.then(
        (value) => {
          // 再次调用该函数是为了确认 x resolve 的参数是什么类型，
          //如果是基本类型就再次 resolve把值传给下个 then
          resolutionProcedure(promise2, value, resolve, reject);
        },
        reject);
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
            resolutionProcedure(promise2, y, resolve, reject);
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