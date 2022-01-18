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
  then(onResolved, onRejected) {

    let promise2

    // 根据标准，如果then的参数不是function，则需要忽略它，此处以如下方式处理
    onResolved = typeof onResolved === 'function' ? onResolved : function (v) { }
    onRejected = typeof onRejected === 'function' ? onRejected : function (r) { }

    if (this.status === 'fulfilled') {
      return promise2 = new Promise(function (resolve, reject) {
        // todo
      })
    }

    if (this.status === 'rejected') {
      return promise2 = new Promise(function (resolve, reject) {
        // todo
      })
    }

    if (this.status === 'pending') {
      return promise2 = new Promise(function (resolve, reject) {
        // todo
      })
    }

  }
}

promise2 = promise1.then(
  (value) => {
    return 4
  },
  (reason) => {
    throw new Error('sth went wrong')
  }
)