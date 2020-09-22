import { combineReducers } from "redux";
import authenReducer from "./authen/authenReducer";
import postReducer from "./Post/postReducer";
import removeReducer from "./removeAuth/removeReducer";
import educationReducer from "./education/educationReducer"

const rootReducer = combineReducers({
  authen: authenReducer,
  post: postReducer,
  logOut: removeReducer,
  education: educationReducer
})
export default rootReducer;