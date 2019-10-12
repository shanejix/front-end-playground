import React from 'react';

// import Comment from './ReactComp/UICompAndContainerComp/Comment'
// import Count from './ReactComp/PureComponent/Count'
// import Count from './ReactComp/Memo/Count'
import Person from './ReactComp/HOC/Person'
// import WelcomeDialog from './ReactComp/Composition/WelcomeDialog01'
// import WelcomeDialog from './ReactComp/Composition/WelcomeDialog02'
import WelcomeDialog from './ReactComp/Composition/WelcomeDialog03'

function App() {
  return (
    <div>

      <div>hellow react!!!</div>

      {/* <Comment /> */}

      {/* <Count /> */}

      <Person />
      <WelcomeDialog />

    </div>
  );
}

export default App;
