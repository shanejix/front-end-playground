class Promise {

  /**
   * Promise 构造函数接收一个 executor 函数，
   * executor 函数执行完同步或异步操作后，调用它的两个参数 resolve 和 reject
   * @param {*} executor 
   */
  constructor(executor) {
    this.status = 'pending' // Promise当前的状态
    this.data = undefined  // Promise的值
    this.onResolvedCallback = [] // Promise resolve 时的回调函数集，因为在 Promise 结束之前有可能有多个回调添加到它上面
    this.onRejectedCallback = [] // Promise reject 时的回调函数集，因为在 Promise 结束之前有可能有多个回调添加到它上面

    const resolve = (value) => {
      if (this.status !== 'pedding') return
      // 更新 status
      this.status = 'fulfilled'
      // 更新 data
      this.data = value
      // 通知订阅执行
      this.onResolvedCallback.forEach(listener => listener(value))
    }

    const reject = (reason) => {
      if (this.status !== 'pedding') return
      // 更新 status
      this.status = 'rejected'
      // 更新 data
      this.data = resean
      // 通知订阅执行
      this.onRejectedCallback.forEach(listener => listener(reason))
    }

    try {
      executor(resolve, reject) // 执行 executor 并传入相应的参数
    } catch (e) {
      reject(e) // 报错直接 reject
    }
  }

  /**
   * then方法接收两个参数，onResolved，onRejected，分别为Promise成功或失败后的回调
   * @param {*} onResolved 
   * @param {*} onRejected 
   * @returns 
   */
  then = (onResolved, onRejected) => {

    let promise2

    // 根据标准，如果then的参数不是function，则需要忽略它，此处以如下方式处理
    onResolved = typeof onResolved === 'function' ? onResolved : (value) => { }
    onRejected = typeof onRejected === 'function' ? onRejected : (reason) => { }

    if (this.status === 'fulfilled') {
      // 如果promise1(此处即为this)的状态已经确定并且是fulfilled，调用onResolved
      return promise2 = new Promise((resolve, reject) => {
        // 因为考虑到有可能throw，所以将其包在try/catch块里
        try {
          const x = onResolved(this.data)
          // 如果onResolved的返回值是一个Promise对象，直接取它的结果做为promise2的结果
          if (x instanceof Promise) {
            x.then(resolve, reject)
          }
          // 否则，以它的返回值做为promise2的结果
          resolve(x)
        } catch (e) {
          // 如果出错，以捕获到的错误做为promise2的结果
          reject(e)
        }
      })
    }

    // 如果promise1(此处即为this)的状态已经确定并且是rejected，调用onRejected
    if (this.status === 'rejected') {
      return promise2 = new Promise((resolve, reject) => {
        // 因为考虑到有可能throw，所以将其包在try/catch块里
        try {
          const x = onRejected(this.data)
          // 如果onRejected的返回值是一个Promise对象，直接取它的结果做为promise2的结果
          if (x instanceof Promise) {
            x.then(resolve, reject)
          }
        } catch (e) {
          // 如果出错，以捕获到的错误做为promise2的结果
          reject(e)
        }
      })
    }

    // 如果当前的Promise还处于pending状态，并不能确定调用onResolved还是onRejected，
    // 只能等到Promise的状态确定后，才能确实如何处理
    // 所以需要把**两种情况**的处理逻辑做为callback放入promise1(此处即this)的回调数组里
    if (this.status === 'pending') {
      return promise2 = new Promise((resolve, reject) => {
        this.onResolvedCallback.push((value) => {
          // 因为考虑到有可能throw，所以将其包在try/catch块里
          try {
            const x = onResolved(this.data)
            if (x instanceof Promise) {
              x.then(resolve, reject)
            }
          } catch (e) {
            reject(e)
          }
        })
        this.onRejectedCallback.push((reason) => {
          // 因为考虑到有可能throw，所以将其包在try/catch块里
          try {
            const x = onRejected(this.data)
            if (x instanceof Promise) {
              x.then(resolve, reject)
            }
          } catch (e) {
            reject(e)
          }
        })
      })
    }
  }

  /**
   * catch方法
   * @param {*} onRejected 
   * @returns 
   */
  catch(onRejected) {
    return this.then(null, onRejected)
  }

  /**
   * Promise.all()方法
   * @param {*} promiseArr 
   * @returns 
   */
  static all(promiseArr = []) {
    return new Promise((resolve, reject) => {

      // 记录成功的数量
      let index = 0;
      // 记录成功的结果
      let result = [];

      for (let i = 0; i < promiseArr.length; i++) {
        promiseArr[i].then(
          val => {
            index++;
            result[i] = val;// 保证结果的顺序和数组顺序一致
            if (index === promiseArr.length) {
              resolve(result);
            }
          },
          reject
        );
      }
    });
  }
}
