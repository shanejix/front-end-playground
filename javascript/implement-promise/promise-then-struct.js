// 定义三个状态
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

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
  * then方法接收两个参数，onResolved，onRejected，分别为Promise成功或失败后的回调
  * @param {*} onResolved 
  * @param {*} onRejected 
  * @returns 
  */
  then(onResolved, onRejected) {

    // 根据标准，如果then的参数不是function，则需要忽略它，此处以如下方式处理
    onResolved = typeof onResolved === 'function' ? onResolved : (v) => v
    onRejected = typeof onRejected === 'function' ? onRejected : (r) => { throw r }

    const promise2 = new Promise((resolve, reject) => {
      if (this.status === 'fulfilled') {
        // todo

      }

      if (this.status === 'rejected') {
        // todo

      }

      if (this.status === 'pending') {
        // todo

      }
    })

    return promise2;

  }
}




