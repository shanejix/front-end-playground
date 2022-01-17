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
}