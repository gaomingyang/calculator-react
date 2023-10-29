import {useState} from 'react';

import './App.scss';

function App() {
  const [input,setInput] = useState("")
  const [result,setResult] = useState(0)

  //点击数字
  function clickNumber(n) {
    let newInput = input + n
    setInput(newInput)
  }

  //点击清除
  function clickClear(){
    setInput("")
    setResult(0)
  }

  // 点击小数点
  function clickDecimal() {
    let newInput = input + '.'
    setInput(newInput)
  }

  // 点击运算符
  function clickOperate(mark) {
    console.log("clickOperate")
    console.log(mark)
    let newInput = input + mark
    setInput(newInput)
  }

  //点击等号，计算结果
  function clickFinish() {
    try{
      let result = eval(input);
      setResult(result);
      let newinput = input + '='+ result
      setInput(newinput)
    } catch(error) {
      setResult('Error');
    }
  }

  return (
    <div className="App">
      <div id="calculator">
        <div id="display">
          <div id="input">{input}</div>
          <div id="result">{result}</div>
        </div>
        <div id="operate">
          <div className="operateButton" id="clear" onClick={clickClear}>AC</div>
          <div className="operateButton" id="divide" onClick={()=>clickOperate('/')}>/</div>
          <div className="operateButton" id="multiply" onClick={()=>clickOperate('*')}>x</div>
          <div className="operateButton" id="seven" onClick={()=>clickNumber(7)}>7</div>
          <div className="operateButton" id="eight" onClick={()=>clickNumber(8)}>8</div>
          <div className="operateButton" id="nine" onClick={()=>clickNumber(9)}>9</div>
          <div className="operateButton" id="subtract" onClick={()=>clickOperate('-')}>-</div>
          <div className="operateButton" id="four" onClick={()=>clickNumber(4)}>4</div>
          <div className="operateButton" id="five" onClick={()=>clickNumber(5)}>5</div>
          <div className="operateButton" id="six" onClick={()=>clickNumber(6)}>6</div>
          <div className="operateButton" id="add" onClick={()=>clickOperate('+')}>+</div>
          <div className="operateButton" id="one" onClick={()=>clickNumber(1)}>1</div>
          <div className="operateButton" id="two" onClick={()=>clickNumber(2)}>2</div>
          <div className="operateButton" id="three" onClick={()=>clickNumber(3)}>3</div>
          
          <div className="operateButton" id="zero" onClick={()=>clickNumber(0)}>0</div>
          <div className="operateButton" id="decimal" onClick={clickDecimal}>.</div>
          <div className="operateButton" id="equals" onClick={clickFinish}>=</div>
        </div>
      </div>
    </div>
    
  );
}

export default App;
