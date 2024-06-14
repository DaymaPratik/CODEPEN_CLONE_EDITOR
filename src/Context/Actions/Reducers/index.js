import {combineReducers} from "redux";
import { userAuthReducer } from "./userAuthReducer";
import { ProjectReducer } from "./ProjectReducer";
const myReducer=combineReducers({
    user:userAuthReducer,
    project:ProjectReducer,
})
export default myReducer;