
class Promise {

  //构造函数
  constructor(executorCB) {
    //保存在实例上属性
    this.status = 'pedding'//保存状态值pedding->fulfilled or rejected
    this.value = null//保存result or resean
    this.fulfilledArr = []//fulfilled listenerArr
    this.rejectArr = []//rejected listenerArr

    let resolveFn = (result) => {
      //包装resolveFn，让其进入等待栈，当主栈liteners进入listenerArr后执行
      let timer = setTimeout(() => {
        //防抖
        clearTimeout(timer);

        //更新status
        if (this.status !== 'pedding') return
        this.status = 'fulfilled'
        //更新value
        this.value = result

        //通知订阅执行
        this.fulfilledArr.forEach(listener => listener(this.value))
      }, 0)

    }

    let rejectFn = (resean) => {
      //包装rejectFn，让其进入等待栈，当主栈liteners进入listenerArr后执行
      let timer = setTimeout(() => {
        //防抖
        clearTimeout(timer);

        //更新status
        if (this.status !== 'pedding') return
        this.status = 'rejected'
        //更新value
        this.value = resean

        //通知订阅执行
        this.fulfilledArr.forEach(listener => listener(this.value))

      }, 0);
    }

    //异常处理
    try {
      //Promise构造函数执行时立即调用executor 函数（返回实例前）
      executorCB(resolveFn, rejectFn)
    } catch (err) {
      //有异常信息按照rejected状态处理
      rejectFn(err);
    }
  }




  //Promise实例能够使用.then，因此存在原型上
  then(fulfilledCB, rejectCB) {
    //实现链式调用，返回一个Promise


    //处理不传递的状况.then(null) or .then(null,null)
    typeof fulfilledCB !== 'function' ? fulfilledCB = result => result : null;
    typeof rejectCB !== 'function' ? rejectCB = reason => {
      throw new Error(reason instanceof Error ? reason.message : reason);
    } : null;


    return new Promise((resolve, reject) => {
      //订阅listener
      this.fulfilledArr.push(() => {
        try {
          let result = fulfilledCB(this.value)
          //是否是Promise
          result instanceof Promise ? result.then(resolve, reject) : resolve(result);
          resolve(result)
        } catch (e) {
          reject(e)
        }
      })
      this.rejectArr.push(() => {
        try {
          let result = rejectCB(this.value)
          //是否是Promise
          result instanceof Promise ? result.then(resolve, reject) : resolve(result);
          resolve(result)
        } catch (e) {
          reject(e)
        }
      })
    })

    // //订阅listener（fulfilledCB和rejectCB）等待通知
    // this.fulfilledArr.push(fulfilledCB)
    // this.rejectArr.push(rejectCB)
  }

  catch(rejectCB) {
    return this.then(null, rejectCB);
  }

  //Promise.all()
  static all(promiseAry = []) {
    return new Promise((resolve, reject) => {

      let index = 0;//记录成功的数量
      let result = [];//记录成功的结果

      for (let i = 0; i < promiseAry.length; i++) {
        //每一个需要处理的Promise实例
        promiseAry[i].then(val => {
          index++;
          result[i] = val;//保证结果的顺序和数组顺序一致
          if (index === promiseAry.length) {
            resolve(result);
          }
        }, reject);
      }
    });
  }

}

module.exports = Promise