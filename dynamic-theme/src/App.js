import { useEffect, useState } from 'react';
import { updateTheme } from './theme';

function App() {

  const [mode, setMode] = useState('red');

  const toggleMode = () => {
    if (mode === 'blue') {
      setMode('red')
    }

    if (mode === 'red') {
      setMode('blue')
    }
  }

  useEffect(() => {
    updateTheme(mode)
  }, [mode])

  return (
    <div className="App">
      <button onClick={() => { toggleMode() }}>switch theme</button>
    </div>
  );
}

export default App;
