import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'


import Layout from './Layout'



// import Comment from './ReactComp/UICompAndContainerComp/Comment'
// import Count from './ReactComp/PureComponent/Count'
// import Count from './ReactComp/Memo/Count'
import Person from './ReactComponent/HOC/Person'
// import WelcomeDialog from './ReactComp/Composition/WelcomeDialog01'
// import WelcomeDialog from './ReactComp/Composition/WelcomeDialog02'
import WelcomeDialog from './ReactComponent/Composition/WelcomeDialog03'
import RadioGroup from './ReactComponent/Composition/RadioGroup'
import Button from './ReactHooks/Button'
import ContextDemo from './ReactContext/ContextDemo'

import Form from './Form/Form'
import AntdFormDemo from './Form/AntdFormDemo'



import RCount from './Redux/Count/Count'
import RRCount from './ReactRedux/Count'

import RRDDemo from './ReactRouter/Demo'

import User from './ReduxSaga/User/index'


function NotFound() {
  return (
    <div>
      <Form />
      <AntdFormDemo />
      <RCount />
      <RRCount />
      <RRDDemo />
      <User />
    </div>
  )
}
function App() {
  return (
    <BrowserRouter>
      <Layout>

        <div className="nav">
          <div><Link to='/person'>person</Link></div>
          <div><Link to='/welcomedialog'>welcomedialog</Link></div>
          <div><Link to='/radiogroup'>radiogroup</Link></div>
          <div><Link to='/button'>button</Link></div>
          <div><Link to='/contextdemo'>contextdemo</Link></div>
          <div><Link to='form'>form</Link></div>
          <div><Link to='antdformdemo'>antdformdemo</Link></div>
          <div><Link to='rcount'>rcount</Link></div>
          <div><Link to='rrcount'>rrcount</Link></div>
          <div><Link to='rrddemo'>rrddemo</Link></div>
          <div><Link to='user'>user</Link></div>
        </div>

        <div className="main">
          <Switch>

            {/* <Comment /> */}

            {/* <Count /> */}

            <Route path='/person' component={Person} />
            <Route path='/welcomedialog' component={WelcomeDialog} />
            <Route path='/radiogroup' component={RadioGroup} />
            <Route path='/button' component={Button} />
            <Route path='/contextdemo' component={ContextDemo} />
            {/* <Route path='form' component={Form} />
            <Route path='antdformdemo' component={AntdFormDemo} />
            <Route path='rcount' component={RCount} />
            <Route path='rrcount' component={RRCount} />
            <Route path='rrddemo' component={RRDDemo} />
            <Route path='user' component={User} /> */}
            <Route component={NotFound} />
          </Switch>
        </div>
      </Layout>



    </BrowserRouter>
  );
}

export default App;
