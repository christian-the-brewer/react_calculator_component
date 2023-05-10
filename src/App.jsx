
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
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false
        }
      }
      
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
        
          if (state.operation == null || state.currentOperand == null || state.prevOperand == null) {
            return state
          }
          
          return {
            ...state,
            overwrite: true,
            prevOperand: null,
            operation: null,
            currentOperand: evaluate(state)
          }
          
      case ACTIONS.DELETE_DIGIT:
        if (state.overwrite) {
          return {
            ...state,
            currentOperand: null,
            overwrite: false
          }
        }
        if (state.currentOperand == null) {
          return state
        }
        if (state.currentOperand.length == 1) {
          return {
            ...state,
            currentOperand: null
          }
        }
        
        return {
          ...state,
          currentOperand: state.currentOperand.slice(0,-1)
        }
   
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

const integer_format = new Intl.NumberFormat('en-us', {
  maximumFractionDigits: 0
})

function formatOperand(operand) {
  if (operand == null) return
  const [integer, decimal] = operand.split('.')
  if (decimal == null) return integer_format.format(integer)
  return `${integer_format.format(integer)}.${decimal}`
}

function App() {
  const [{currentOperand, prevOperand, operation}, dispatch] =useReducer(reducer, {})

  return (
    <div className="calculator-grid">
      {/* Output Section */}
      <div className="output">
        
        <div className="previous-operand">
          {formatOperand(prevOperand)} {operation}
        </div>
        
        <div className="previous-operand">
          {formatOperand(currentOperand)}
        </div>
      </div>
      {/* Input Section */}
      <button 
      onClick={() => dispatch({type: ACTIONS.CLEAR})}
      className="span-two">AC</button>
      <button
      onClick={() => dispatch({type: ACTIONS.DELETE_DIGIT})}
      >DEL</button>
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
      <button 
      onClick={() => dispatch({type: ACTIONS.EVALUATE})}
      className="span-two"><FaEquals /></button>
    </div>
  );
}

export default App;
