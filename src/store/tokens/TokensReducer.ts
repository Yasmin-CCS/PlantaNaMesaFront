import Produto from '../../models/Produto'
import { Action } from './Action'

export interface TokenState {
  token: string,
  id: string

  produtos: Array<Produto>
}

const initialState = {
  token: '',
  id: '',
  produtos: []
}

export const tokenReducer = (state: TokenState = initialState, action: Action) => {
  switch (action.type) {
    case "ADD_TOKEN": {
      return { token: action.payload, id: state.id }
    }
    case "ADD_ID": {
      return { token: state.token, id: action.payload }
    }

    case "ADD_TO_CART": {
      return {
        ...state, produtos: [...state.produtos, action.payload]
      }
    }
    case "REMOVE_ITEM": {
      return {
        ...state, produtos: []
      }
    }

    default: return state
  }
}