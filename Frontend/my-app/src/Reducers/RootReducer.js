import { createStore } from "redux";

const createState = {
    username: null,
  };
const rootReducer = (state = createState, action) => {
    if(action.type === 'LOGIN') {
        return {
            username: action.username
        }
    }
    return state;
}

export default rootReducer;
