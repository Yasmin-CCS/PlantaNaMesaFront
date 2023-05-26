import { Action } from "./Action";
export interface TokenState {
  token:string
}

const initialState = {
  token:""
}

export const tokenReducer = (state:TokenState = initialState, Action: Action) => {
  switch (Action.type){
    case"ADD_TOKEN": {
      return {token: Action.payload}
    }
    default:
      return state
  }
}