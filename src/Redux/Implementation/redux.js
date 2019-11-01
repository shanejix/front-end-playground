import { get } from "https"

//impelementation redux


export function createStore(reducer, enhancer) {

  if (enhancer) {
    return enhancer(createStore)(reducer)
  }


  let currentState = {}
  let currenListeners = []

  function getState() {
    return currentState
  }

  function subscribe(listener) {
    currenListeners.push(listener)
  }

  function dispatch(action) {
    currentState = reducer(currentState, action)

    currenListeners.forEach(f => f())

    return action
  }

  //init
  dispatch({ type: '@init/redux' })

  return {
    getState,
    subscribe,
    dispatch
  }
}

//按照顺序可以是多个
export function applyMiddleware(...middlewares) {

  //返回一个高阶函数
  return createStore => (...args) => {
    const store = createStore(...args)
    let dispatch = store.dispatch


    const midApi = {
      getState: store.getState,
      dispatch: (...args) => dispatch(...args)
    }

    const middlewaresChain = middlewares.map(middleware => {
      middleware(midApi)
    })

    dispatch = compose(...middlewaresChain)(store.dispatch)

    return {
      ...store,
      dispatch
    }
  }
}

export function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  return funcs.reduce((ret, item) => (...args) => ret(item(...args)))
}

export function bindActionCreator(creator, dispatch) {
  return (...args) => dispatch(creator(...args))
}

export function bindActionCreators(creators, dispatch) {
  return Object.keys(creators).reduce((ret, item) => {
    ret[item] = bindActionCreator(creators[item], dispatch)

    return ret
  })
}