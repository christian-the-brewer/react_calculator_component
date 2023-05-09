import { ACTIONS } from "../App"

export default function OperationButton({ dispatch, operation, symbol }) {
  return (
    <button
      onClick={() =>
        dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation } })
      }
    >
      {symbol}
    </button>
  )
}