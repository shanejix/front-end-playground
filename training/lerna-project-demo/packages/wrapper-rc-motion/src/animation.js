import { useState } from 'react';
import CSSMotion, { CSSMotionList } from 'rc-motion';
import classNames from 'classnames';

import './style.less'

// https://github.com/react-component/motion

function App() {

  const [fadeIn, setFadeIn] = useState(true);
  const [zoomIn, setZoomIn] = useState(true);
  const [deadline, setDeadline] = useState(true);
  const [count, setCount] = useState(1);

  // Motion
  const onCollapse = () => ({ width: 0, margin: '0 -5px 0 0' });

  return (
    <div className="App">

      <h1>rc-motion</h1>

      <hr />

      <h2>fade with transition class</h2>
      <button
        type="button"
        className="btn btn-default"
        onClick={() => setFadeIn(!fadeIn)}
      >
        toggle
      </button>
      <div className="demo-wrap">
        <CSSMotion
          visible={fadeIn}
          // motionName={hasMotionClassName ? 'transition' : null}
          // removeOnLeave={removeOnLeave}
          // leavedClassName="hidden"
          // onLeaveActive={this.onCollapse}
          // motionLeaveImmediately
          // onLeaveEnd={this.skipColorTransition}
          motionName={'transition'}
        >
          {({ style, className }) => (
            <div
              className={classNames('demo', className)}
              style={style}
            >
              fade-{fadeIn ? 'in' : 'out'}
            </div>
          )}
        </CSSMotion>
      </div>

      <h2>zoom with animation class</h2>
      <button
        type="button"
        className="btn btn-default"
        onClick={() => setZoomIn(!zoomIn)}
      >
        toggle
      </button>
      <div className="demo-wrap">
        <CSSMotion
          visible={zoomIn}
          // motionName={hasMotionClassName ? 'transition' : null}
          // removeOnLeave={removeOnLeave}
          // leavedClassName="hidden"
          // onLeaveActive={this.onCollapse}
          // motionLeaveImmediately
          // onLeaveEnd={this.skipColorTransition}
          motionName={'animation'}
        >
          {({ style, className }) => (
            <div
              className={classNames('demo', className)}
              style={style}
            >
              zoom-{zoomIn ? 'in' : 'out'}
            </div>
          )}
        </CSSMotion>
      </div>

      <h2>deadline with transition class</h2>
      <button
        type="button"
        className="btn btn-default"
        onClick={() => setDeadline(!deadline)}
      >
        toggle
      </button>
      <div className="demo-wrap">
        <CSSMotion
          visible={deadline}
          // motionName={hasMotionClassName ? 'transition' : null}
          // removeOnLeave={removeOnLeave}
          // leavedClassName="hidden"
          // onLeaveActive={this.onCollapse}
          // motionLeaveImmediately
          // onLeaveEnd={this.skipColorTransition}
          // removeOnLeave
          motionName="no-trigger"
          motionDeadline={1000}
        >
          {({ style, className }) => (
            <div
              className={classNames('demo', className)}
              style={style}
            >
              deadline-{deadline ? 'in' : 'out'}
            </div>
          )}
        </CSSMotion>
      </div>


      <h2>motionlist with transition class</h2>
      <button
        type="button"
        className="btn btn-default"
        onClick={() => setCount(count + 1)}
      >
        toggle
      </button>
      <div className="demo-wrap">
        {/* Motion List */}
        <CSSMotionList
          keys={new Array(count).fill(0).map((_, idx) => idx + 1)}
          motionName="transition-all"
          // onAppearStart={onCollapse}
          // onEnterStart={onCollapse}
          // onLeaveActive={onCollapse}
          // onVisibleChanged={(changedVisible, info) => {
          //   console.log('Visible Changed >>>', changedVisible, info);
          // }}
          onAppearStart={onCollapse}
        >
          {({ key, background, className, style }) => {
            return (
              <div
                className={classNames('demo-block', className)}
                style={{
                  ...style,
                  background,
                }}
              >
                <span>{key}</span>
              </div>
            );
          }}
        </CSSMotionList>
      </div>
    </div>
  );
}

export default App;
