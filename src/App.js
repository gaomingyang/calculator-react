import {useState} from 'react';

import './App.scss';

function App() {
  const [input,setInput] = useState("") //第一排显示的输入字符串
  const [result,setResult] = useState(0) //结果
  const [currentNumber,setCurrentNumber] = useState("")
  const [currentNumberWithDecimal,setcurrentNumberWithDecimal] = useState(false) //最近的当前数字是否有小数点
  const [isFinish, setIsFinish] = useState(false)

  //点击数字
  function clickNumber(n) {
    //没结束的时候
    //不允许多个0开头。若前面已经有0，新输入还是0，则不执行
    if (n === 0 && input === "0" ) {
      return
    }
      
    //如果前面已经结束计算，再点击数字，这里重新设置输入字符串
    if (isFinish) {
      //忽略过去的input
      setInput(n) //显示输入
      setResult(n) //显示输出结果
      setIsFinish(false) //修改结束状态为未结束
      return
    }
    // console.log("oldinput:",input)  
    // console.log("n:",n)
    let newInput = input + String(n)

    setInput(newInput)

    //result显示当前一直在输入的数字
    let newCurrentNumber = currentNumber + '' + n
    setCurrentNumber(newCurrentNumber)
    setResult(newCurrentNumber)
    
  }

  //点击清除
  function clickClear(){
    setInput("")
    setResult(0)
    setCurrentNumber("")
    setcurrentNumberWithDecimal(false)
    setIsFinish(false)
  }

  // 点击小数点
  function clickDecimal() {
    // console.log("click decimal")
    //若前面已经有了小数点，不能再点击小数点。
    if (currentNumberWithDecimal === false) {
      let newInput 
      if (input.length === 0){
        newInput="0."
      }else{
        newInput = input + '.'
      }
      setInput(newInput)
      setResult(newInput)
      setCurrentNumber(newInput)
      setcurrentNumberWithDecimal(true)
      
      //小数点开头作为新一轮计算的情况，清楚上次的结束标记
      if(isFinish) {
        setIsFinish(false)
      }
    }
  }

  // 点击运算符
  function clickOperate(mark) {
    
    if(isFinish) {
      //若上一个运算刚结束，取其结果作为第一个输入。并且需要先清理之前的input
      setInput(result)
      setIsFinish(false)
      setInput(result + mark)
    }else{
      if(input.length === 0 && (mark !== "-" && mark !== "+")) {
        //对于没有前面输入，直接开始一个非-或+的运算符，不允许输入
        return
      }
      //避免输入多个运算符逻辑，只取最后一个。
      let operateLetters = ['+','-',"*","/"];
      let newInput 
      let lastLetter =  input[input.length - 1] //最后一个字符
      if(operateLetters.includes(lastLetter)) { //最后一个字母是操作符
        //上一个操作符不是-，而最新这个是-，可以追加
        if (lastLetter !== "-" ) { //上一个操作符是+ * /,新元素是-或非-两种情况。
          if(mark === "-") {
            newInput = input + mark
          }else{
            let originalPart = input.substring(0,input.length-1);
            newInput = originalPart+mark//替换为最新的运算符
          }
        }else{
          //对于上一个字母是-开头的，再判断新字符
          if (mark !== '-') {
            let originalPart
            // + x /情况，要把这个-也去掉，如果-前面还有操作符，也要去掉。
            if(input.length >=2 ) {
              let preLetter = input[input.length-2]
              if (operateLetters.includes(preLetter)){
                 originalPart = input.substring(0,input.length-2) //再去一个
              }else{
                //不是字母，就只去除一个
                originalPart = input.substring(0,input.length-1) //再去一个
              }
            }
            
            //再追加新标记
            newInput = originalPart+mark
          }else{
            //上一个是-，这个还是-，不接收新输入的减号
            newInput = input
          }

        }
      }else{
        //最后一个字母不是操作符，可以直接追加
        newInput = input + mark
      }
      
      setInput(newInput)
    }

    setCurrentNumber("") //点击运算符，上一个当前数字清空，避免影响result显示当前数字
    setcurrentNumberWithDecimal(false) //清除最近的数带小数点标记
  }

  //点击等号，计算结果
  function clickFinish() {
    //避免按两次
    if(isFinish){
      return;
    }
    try{
      let result = eval(input);
      setResult(result);
      let newinput = input + '='+ result
      setInput(newinput)
      setCurrentNumber("")
      setcurrentNumberWithDecimal(false)  //清除最近的数带小数点标记
      setIsFinish(true) //标记上一个计算结束
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
