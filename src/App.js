import React from 'react';

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

function App() {
  return (
    <div>

      <div>hellow react!!!</div>

      {/* <Comment /> */}

      {/* <Count /> */}

      <Person />
      <WelcomeDialog />

      <RadioGroup />

      <Button />

      <ContextDemo />

      <Form />

      <AntdFormDemo />

      <RCount />

      <RRCount />

      <RRDDemo />

      <User />

    </div>
  );
}

export default App;
