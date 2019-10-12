import React from "react";

import Fetcher from "./Fetcher";

//只负责样式，不关心内容和逻辑
export default function Dialog(props) {
  console.log(props);

  return (
    <div style={{ border: `${props.color} 4px solid` }}>
      {props.children}

      {/* //02.children 可以是函数， */}
      <Fetcher footer="getFooter">
        {({ title, name }) => (
          <button>
            {title}-{name}
          </button>
        )}
      </Fetcher>
    </div>
  );
}
