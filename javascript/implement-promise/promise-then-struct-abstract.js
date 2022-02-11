class Promise {

  /**
   * Promise 构造函数接收一个 executor 函数，
   * executor 函数执行完同步或异步操作后，调用它的两个参数 resolve 和 reject
   * @param {*} executor 
   */
  constructor(executor) {
    // Promise当前的状态
    this.status = 'pending'
    // Promise的值
    this.data = undefined
    // Promise resolve 时的回调函数集，因为在 Promise 结束之前有可能有多个回调添加到它上面
    this.onResolvedCallback = []
    // Promise reject 时的回调函数集，因为在 Promise 结束之前有可能有多个回调添加到它上面
    this.onRejectedCallback = []

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
      // 执行 executor 并传入相应的参数
      executor(resolve, reject)
    } catch (e) {
      // 报错直接 reject
      reject(e)
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
    onRejected = typeof onRejected === 'function' ? onRejected : (r) => r

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