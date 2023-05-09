
import { FaDivide, FaAsterisk, FaPlus, FaMinus, FaEquals } from 'react-icons/fa'
import { useReducer } from "react";
import DigitButton from './components/DigitButton'
import OperationButton from './components/OperationButton'
import './styles.css'

export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  CHOOSE_OPERATION: 'choose-operation',
  EVALUATE: 'evaluate',
}



function reducer(state, {type, payload}) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
    
      if (payload.digit === '0' && state.currentOperand === '0') {
        return state
      }
       if (state.currentOperand != undefined && payload.digit === "." && state.currentOperand.includes(".")) {
        return state
      }
      
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`
      }
      
      
    case ACTIONS.CLEAR: 
      return {}
      
      
    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.prevOperand == null) {
        return state
      }
      
      if (state.currentOperand == null) {
        return {
          ...state,
          operation: payload.operation
        }
      }
      
      if (state.prevOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          prevOperand: state.currentOperand,
          currentOperand: null
        }
      }
      return {
        ...state,
        prevOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null
      }
      
      case ACTIONS.EVALUATE:
        return {
          
        }
        
      
    default:
      return state
  }
}

function evaluate({currentOperand, prevOperand, operation}) {
  const prev = parseFloat(prevOperand)
  const current = parseFloat(currentOperand)
  if (isNaN(prev) || isNaN(current)) {
    return ''
  }
  let computation = ''
  switch (operation) {
    case '+':
      computation = prev + current
      break
      
    case '-':
      computation = prev - current
      break
    
    case '*':
      computation = prev * current
      break
      
    case '/':
      computation = prev / current
      break
  }
  return computation.toString()
}


function App() {
  const [{currentOperand, prevOperand, operation}, dispatch] =useReducer(reducer, {})

  return (
    <div className="calculator-grid">
      {/* Output Section */}
      <div className="output">
        
        <div className="previous-operand">
          {prevOperand} {operation}
        </div>
        
        <div className="previous-operand">
          {currentOperand}
        </div>
      </div>
      {/* Input Section */}
      <button 
      onClick={() => dispatch({type: ACTIONS.CLEAR})}
      className="span-two">AC</button>
      <button>DEL</button>
      <OperationButton 
      operation='/'
      dispatch={dispatch}
      symbol=<FaDivide />
      />
      <DigitButton 
      digit='1'
      dispatch={dispatch}
      />
      <DigitButton 
      digit={'2'}
      dispatch={dispatch}
      />
      <DigitButton 
      digit={'3'}
      dispatch={dispatch}
      />
     <OperationButton 
      operation='*'
      dispatch={dispatch}
      symbol=<FaAsterisk />
      />
      <DigitButton 
      digit={'4'}
      dispatch={dispatch}
      />
      <DigitButton 
      digit={'5'}
      dispatch={dispatch}
      />
      <DigitButton 
      digit={'6'}
      dispatch={dispatch}
      />
      <OperationButton 
      operation='+'
      dispatch={dispatch}
      symbol=<FaPlus />
      />
      <DigitButton 
      digit={'7'}
      dispatch={dispatch}
      />
      <DigitButton 
      digit={'8'}
      dispatch={dispatch}
      />
      <DigitButton 
      digit={'9'}
      dispatch={dispatch}
      />
      <OperationButton 
      operation='-'
      dispatch={dispatch}
      symbol=<FaMinus />
      />
      <DigitButton 
      digit={'.'}
      dispatch={dispatch}
      />
      <DigitButton 
      digit={'0'}
      dispatch={dispatch}
      />
      <button className="span-two"><FaEquals /></button>
    </div>
  );
}

export default App;