// 定义三个状态
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

// 新建 Promise 类
class Promise {
  /**
   * Promise 构造函数接收一个 executor 函数，
   * executor 函数执行完同步或异步操作后，调用它的两个参数 resolve 和 reject
   * @param {*} executor 
   */
  constructor(executor) {
    // 2.1. Promise 的状态
    // Promise 必须处于以下三种状态之一：pending，fulfilled 或者 rejected。
    this.status = PENDING;

    // 2.2.6.1. 如果 promise 处于 fulfilled 状态，所有相应的 onFulfilled 回调必须按照它们对应的 then 的原始调用顺序来执行
    this.onFulfilledCallbacks = [];
    // 2.2.6.2. 如果 promise 处于 rejected 状态，所有相应的 onRejected 回调必须按照它们对应的 then 的原始调用顺序来执行。
    this.onRejectedCallbacks = [];

    // 成功之后的值
    this.value = null;
    // 失败之后的原因
    this.reason = null;

    /**
     * 更改成功后的状态
     * @param {*} value 
     */
    const resolve = (value) => {
      // 2.1.1. 当 Promise 处于 pending 状态时：
      // 2.1.1.1. 可以转换到 fulfilled 或 rejected 状态。
      // 2.1.2. 当 Promise 处于 fulfilled 状态时：
      // 2.1.2.1. 不得过渡到任何其他状态。
      // 2.1.2.2. 必须有一个不能改变的值。
      if (this.status === PENDING) {
        // 状态修改为成功
        this.status = FULFILLED;
        // 保存成功之后的值
        this.value = value;
        // 2.2.6.1. 如果 promise 处于 fulfilled 状态，所有相应的 onFulfilled 回调必须按照它们对应的 then 的原始调用顺序来执行。
        while (this.onFulfilledCallbacks.length) {
          this.onFulfilledCallbacks.shift()(value)
        }
      }
    }

    /**
     * 更改失败后的状态
     * @param {*} reason 
     */
    const reject = (reason) => {
      // 2.1.1. 当 Promise 处于 pending 状态时：
      // 2.1.1.1. 可以转换到 fulfilled 或 rejected 状态。
      // 2.1.3. 当 Promise 处于 rejected 状态时：
      // 2.1.2.1. 不得过渡到任何其他状态。
      // 2.1.2.2. 必须有一个不能改变的值。
      if (this.status === PENDING) {
        // 状态成功为失败
        this.status = REJECTED;
        // 保存失败后的原因
        this.reason = reason;
        // 2.2.6.2. 如果 promise 处于 rejected 状态，所有相应的 onRejected 回调必须按照它们对应的 then 的原始调用顺序来执行。
        while (this.onRejectedCallbacks.length) {
          this.onRejectedCallbacks.shift()(reason)
        }
      }
    }

    // 传入的函数可能也会执行异常，所以这里用 try...catch 包裹
    try {
      // executor 是一个执行器，进入会立即执行,并传入resolve和reject方法
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }

  /**
   * 2.2. then 方法
   * 一个 promise 必须提供一个 then 方法来访问其当前值或最终值或 rejected 的原因。
   * 一个 promise 的 then 方法接受两个参数：
   * promise.then(onFulfilled, onRejected)
   * @param {*} onFulfilled 
   * @param {*} onRejected 
   * @returns 
   */
  then(onFulfilled, onRejected) {

    // 2.2.1. onFulfilled 和 onRejected 都是可选参数：
    // 2.2.1.1. 如果 onFulfilled 不是一个函数，它必须被忽略。
    // 2.2.7.3. 如果 onFulfilled 不是一个函数且 promise1 为 fulfilled 状态，promise2 必须用和 promise1 一样的值来变为 fulfilled 状态。
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    // 2.2.1. onFulfilled 和 onRejected 都是可选参数：
    // 2.2.1.2. 如果 onRejected 不是一个函数，它必须被忽略。
    // 2.2.7.4. 如果 onRejected 不是一个函数且 promise1 为 rejected 状态，promise2 必须用和 promise1 一样的 reason 来变为 rejected 状态。
    onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason };

    // 2.2.7. then 必须返回一个 promise
    const promise2 = new Promise((resolve, reject) => {

      const fulfilledMicrotask = () => {
        // 2.2.4. onFulfilled 或 onRejected 在执行上下文堆栈仅包含平台代码之前不得调用。
        // 3.1. 这可以通过“宏任务”机制（例如 setTimeout 或 setImmediate）或“微任务”机制（例如 MutationObserver 或 process.nextTick）来实现。
        setTimeout(() => {
          try {
            // 2.2.2.1. onFulfilled 必须在 promise 的状态变为 fulfilled 后被调用，并将 promise 的值作为它的第一个参数。
            // 2.2.5. onFulfilled 和 onRejected 必须作为函数调用。
            const x = onFulfilled(this.value);
            // 2.2.7.1. 如果 onFulfilled 或 onRejected 返回了一个值 x，则运行 Promise 处理程序 [[Resolve]](promise2, x)。
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            // 2.2.7.2. 如果 onFulfilled 或 onRejected 抛出了一个异常，promise2 必须用 e 作为 reason 来变为 rejected 状态。
            reject(error)
          }
        })
      }

      const rejectedMicrotask = () => {
        // 2.2.4. onFulfilled 或 onRejected 在执行上下文堆栈仅包含平台代码之前不得调用。
        // 3.1. 这可以通过“宏任务”机制（例如 setTimeout 或 setImmediate）或“微任务”机制（例如 MutationObserver 或 process.nextTick）来实现。
        setTimeout(() => {
          try {
            // 2.2.3.1. 它必须在 promise 的状态变为 rejected 后被调用，并将 promise 的 reason 作为它的第一个参数。
            // 2.2.5. onFulfilled 和 onRejected 必须作为函数调用。
            const x = onRejected(this.reason);
            // 2.2.7.1. 如果 onFulfilled 或 onRejected 返回了一个值 x，则运行 Promise 处理程序 [[Resolve]](promise2, x)。
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            // 2.2.7.2. 如果 onFulfilled 或 onRejected 抛出了一个异常，promise2 必须用 e 作为 reason 来变为 rejected 状态。
            reject(error)
          }
        })
      }

      // 2.2.2. 如果 onFulfilled 是一个函数:
      // 2.2.2.1. 它必须在 promise 的状态变为 fulfilled 后被调用，并将 promise 的值作为它的第一个参数。
      // 2.2.2.2. 它一定不能在 promise 的状态变为 fulfilled 前被调用。
      // 2.2.2.3. 它最多只能被调用一次。
      if (this.status === FULFILLED) {
        // 如果promise1(此处即为this)的状态已经确定并且是fulfilled，调用 resolvedMicrotask
        fulfilledMicrotask()
      }

      // 2.2.3. 如果 onRejected 是一个函数，
      // 2.2.3.1. 它必须在 promise 的状态变为 rejected 后被调用，并将 promise 的 reason 作为它的第一个参数。
      // 2.2.3.2. 它一定不能在 promise 的状态变为 rejected 前被调用。
      // 2.2.3.3. 它最多只能被调用一次。
      if (this.status === REJECTED) {
        // 如果promise1(此处即为this)的状态已经确定并且是rejected，调用 rejectedMicrotask
        rejectedMicrotask()
      }

      // 2.2.6. then 可能会被同一个 promise 多次调用。
      if (this.status === PENDING) {
        // 如果当前的Promise还处于pending状态，并不能确定调用onResolved还是onRejected，
        // 只能等到Promise的状态确定后，才能确实如何处理
        // 所以需要把**两种情况**的处理逻辑做为callback放入promise1(此处即this)的回调数组里
        this.onFulfilledCallbacks.push(fulfilledMicrotask);
        this.onRejectedCallbacks.push(rejectedMicrotask);
      }
    })

    return promise2;
  }

}

/**
 * 2.3. Promise 处理程序
 * Promise 处理程序是一个将 promise 和 value 作为输入的抽象操作，将其表示为 [[Resolve]](promise, x)。
 * 补充说明：这里将 resolve 和 reject 也传入进来，因为后续要根据不同的逻辑对 promise 执行 fulfill 或 reject 操作。
 * @param {*} promise 
 * @param {*} x 
 * @param {*} resolve 
 * @param {*} reject 
 * @returns 
 */
function resolvePromise(promise, x, resolve, reject) {
  // 2.3.1. 如果 promise 和 x 引用的是同一个对象，promise 将以一个 TypeError 作为 reason 来进行 reject。
  if (promise === x) {
    return reject(new TypeError("Chaining cycle detected for promise"));
  }

  // 2.3.3. 除此之外，如果 x 是一个对象或者函数，
  if (typeof x === 'object' || typeof x === 'function') {
    // 如果 x 是 null，应该直接 resolve
    if (x === null) {
      return resolve(x);
    }

    // 2.3.3.3.3. 如果 resolvePromise 和 rejectPromise 都被调用，或者多次调用同样的参数，则第一次调用优先，任何之后的调用都将被忽略。
    let isCalled = false;

    try {
      // 2.3.3.1. 声明一个 then 变量来保存 then
      let then = x.then;
      // 2.3.3.3. 如果 then 是一个函数，将 x 作为 this 来调用它，第一个参数为 resolvePromise，第二个参数为 rejectPromise，其中：
      if (typeof then === 'function') {
        try {
          then.call(
            x,
            // 2.3.3.3.1. 假设 resolvePromise 使用一个名为 y 的值来调用，运行 promise 处理程序 [[Resolve]](promise, y)。
            (y) => {
              // 2.3.3.3.3. 如果 resolvePromise 和 rejectPromise 都被调用，或者多次调用同样的参数，则第一次调用优先，任何之后的调用都将被忽略。
              if (isCalled) return;
              isCalled = true;
              resolvePromise(promise, y, resolve, reject);
            },
            // 2.3.3.3.2. 假设 rejectPromise 使用一个名为 r 的 reason 来调用，则用 r 作为 reason 对 promise 执行 reject 操作。
            (r) => {
              if (isCalled) return;
              isCalled = true;
              reject(r);
            });
        } catch (error) {
          // 2.3.3.3.4. 如果调用 then 时抛出一个异常 e，
          // 2.3.3.3.4.1. 如果 resolvePromise 或 rejectPromise 已经被调用过了，则忽略异常。
          if (isCalled) return;

          // 2.3.3.3.4.2. 否则，使用 e 作为 reason 对 promise 执行 reject 操作。
          reject(error);
        }
      } else {
        // 2.3.3.4. 如果 then 不是一个函数，使用 x 作为值对 promise 执行 fulfill 操作。
        resolve(x);
      }
    } catch (error) {
      // 2.3.3.2. 如果检索 x.then 的结果抛出异常 e，使用 e 作为 reason 对 promise 执行 reject 操作。
      return reject(error);
    }


  } else {
    // 2.3.4. 如果 x 不是一个对象或者函数，使用 x 作为值对 promise 执行 fulfill 操作。
    resolve(x);
  }
}

module.exports = Promise