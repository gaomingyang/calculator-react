import {useState} from 'react';

import './App.scss';

function App() {
  const [input,setInput] = useState("")
  const [result,setResult] = useState(0)


  return (
    <div className="App">
      <div id="calculator">
        <div id="display">
          <div id="input">{input}</div>
          <div id="result">{result}</div>
        </div>
        <div id="operate">
          <div className="operateButton" id="clear">AC</div>
          <div className="operateButton" id="divide">/</div>
          <div className="operateButton" id="multiply">x</div>
          <div className="operateButton" id="seven">7</div>
          <div className="operateButton" id="eight">8</div>
          <div className="operateButton" id="nine">9</div>
          <div className="operateButton" id="subtract">-</div>
          <div className="operateButton" id="four">4</div>
          <div className="operateButton" id="five">5</div>
          <div className="operateButton" id="six">6</div>
          <div className="operateButton" id="add">+</div>
          <div className="operateButton" id="one">1</div>
          <div className="operateButton" id="two">2</div>
          <div className="operateButton" id="three">3</div>
          
          <div className="operateButton" id="zero">0</div>
          <div className="operateButton" id="decimal">.</div>
          <div className="operateButton" id="equals">=</div>
        </div>
      </div>
    </div>
    
  );
}

export default App;
