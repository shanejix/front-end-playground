import React from 'react';
import { BrowserRouter, } from 'react-router-dom'

import { Layout } from 'antd';

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

import Card from './MyCard'




const { Header, Footer, Content } = Layout;



function App() {
  return (
    <BrowserRouter>
      <Layout>

        {/* Header */}
        <Header style={{ color: 'white' }}>
          <a href='https://github.com/shanejix/make-wheels'>Make-Wheels</a>
        </Header>

        <Content
          style={{
            paddingTop: 10,
            paddingLeft: 250,
            margin: '0 auto',
            minHeight: 588,
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'flex-start'
          }}
        >


          <Card pathname='Person' >
            <Person></Person>
          </Card>

          <Card pathname='WelcomeDialog' >
            <WelcomeDialog></WelcomeDialog>
          </Card>

          <Card pathname='RadioGroup' >
            <RadioGroup></RadioGroup>
          </Card>

          <Card pathname='Button' >
            <Button></Button>
          </Card>

          <Card pathname='ContextDemo' >
            <ContextDemo></ContextDemo>
          </Card>

          <Card pathname='Form' >
            <Form></Form>
          </Card>

          <Card pathname='AntdFormDemo' >
            <AntdFormDemo></AntdFormDemo>
          </Card>

          <Card pathname='RCount' >
            <RCount></RCount>
          </Card>

          <Card pathname='RRCount' >
            <RRCount></RRCount>
          </Card>

          <Card pathname='RRDDemo' >
            <RRDDemo></RRDDemo>
          </Card>

          <Card pathname='User' >
            <User></User>
          </Card>
          <Card pathname='User' >
            <User></User>
          </Card>
          <Card pathname='User' >
            <User></User>
          </Card>
          <Card pathname='User' >
            <User></User>
          </Card>
          <Card pathname='User' >
            <User></User>
          </Card>
          <Card pathname='User' >
            <User></User>
          </Card>
          <Card pathname='User' >
            <User></User>
          </Card>
          <Card pathname='User' >
            <User></User>
          </Card>

        </Content>

        <Footer
          style={{ textAlign: 'center' }}>@shane</Footer>
      </Layout>



    </BrowserRouter>
  );
}

export default App;
