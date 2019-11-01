//react-redux implementations

import React from 'react'
import PropTypes from 'prop-types'

let bindActionCreators = () => { }

export const connect = (
  mapStateToProps = state => state,
  mapDispatchToProps = {}
) => (WrapComponent) => {//返回一个高阶函数
  return class ConnectComponent extends React.Component {
    static contextType = {
      store: PropTypes.object
    }

    constructor(props, context) {
      super(props, context)
      this.state = {
        props: {}
      }
    }

    componentDidMount() {
      const { store } = this.context
      store.subcribe(() => this.update())
    }

    update() {
      const { store } = this.context
      const stateProps = mapStateToProps(store.getState())
      const dispatchProps = bindActionCreators(mapDispatchToProps,
        store.dispatch)
      this.setState({
        props: {
          ...this.state.props,
          ...stateProps,
          ...dispatchProps
        }
      })
    }

    render() {
      return <WrapComponent {...this.state.props}></WrapComponent>
    }

  }
}


export class Provider extends React.Component {
  static childContextTypes = {
    store: PropTypes.object
  }

  getChildContext() {
    return { store: this.store }
  }
  constructor(props, context) {
    super(props, context)
    this.store = props.store
  }
  render() {
    return this.props.children
  }

}