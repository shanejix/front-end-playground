import React from "react";

//react-redux
import { connect } from "react-redux";

import { add, minus } from "./store/actions";

function Count({ count, add, minus }) {
  return (
    <div>
      <span>{count}</span>
      <button onClick={() => add()}>+</button>
      <button onClick={() => minus()}>-</button>
    </div>
  );
}

const mapStateToProps = store => ({
  count: store
});

//fixme:这样写没有效果哦

// const mapDispatchToProps = ()=>({
//   add,
//   minus
// });

const mapDispatchToProps = {
  add,
  minus
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Count);
