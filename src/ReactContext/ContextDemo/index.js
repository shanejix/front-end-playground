
//2.0
import React from 'react'

// import Super from './Super';
import Child01 from './Child01';
import Child02 from './Child02';
import Child03 from './Child03';

// 1.0
import ctx from './Context.jsx'
const { Provider, Consumer } = ctx;



export default function Demo() {

  return (
    <Provider value={{ name: "Niao" }}>

      {/* 1.0 Context使用：Provider+Comsumer */}
      <div>
        <div>
          <div>
            <Consumer>
              {(value) => <Child01 {...value} />}
            </Consumer>
          </div>
        </div>
      </div>


      {/* 2.0 Context使用：useContext*/}
      <div>
        <div>
          <div>
            <Child02 />
          </div>
        </div>
      </div>

      {/* 3.0 Context使用：contextType*/}
      <div>
        <div>
          <div>
            <Child03 />
          </div>
        </div>
      </div>

    </Provider>
  )
}
