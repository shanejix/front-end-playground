class EventEmitter {

  constructor() {
    /**
     * 订阅中心
     * 
     * {"type":[callback1,callback2,...]}
     * 
     */
    this.events = {};
  }

  /**
   * subscribe event
   * @param {*} type 
   * @param {*} callback 
   */
  on(type, callback) {

    if (this.events[type]) {
      // 当前 type 类型已经订阅，则在数组后追加
      this.events[type].push(callback)
    } else {
      // 当前 type 类型未订阅，则初始化数组
      this.events[type] = [callback]
    }
  }

  /**
   * subscribe event
   * @param {*} type 
   * @param {*} callback 
   */
  subscribe(type, callback) {
    this.on(type, callback)
  }

  /**
   * subscribe event
   * @param {'*'} type 
   * @param {*} callback 
   */
  addListener(type, callback) {
    this.on(type, callback)
  }

  /**
   * emit event
   * @param {*} type 
   */
  emit(type) {
    // 通知执行当前 type 类型的所有回调函数
    if (this.events[type] && this.events[type].length) {
      this.events[type].forEach(callback => {
        callback()
      })
    }
  }

  /**
   * emit event
   * @param {*} type 
   */
  publish(type) {
    this.emit(type)
  }

  /**
   * off event
   * @param {*} type 
   * @param {*} callback 
   */
  off(type, callback) {
    // 取消订阅当前 type 类型的 callback 回调
    if (this.events[type] && this.events[type].length) {
      this.events[type] = this.events[type].filter(cb => cb !== callback)
    }
  }

  /**
   * off event
   * @param {*} type 
   * @param {*} callback 
   */
  unsubscribe(type, callback) {
    this.off(type, callback)
  }

  /**
   * off event
   * @param {*} type 
   * @param {*} callback 
   */
  removeListener(type, callback) {
    this.off(type, callback)
  }

}
