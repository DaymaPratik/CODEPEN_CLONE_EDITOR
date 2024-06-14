export const ProjectReducer=(state=null,action)=>{
    switch(action.type){
        case "SET_PROJECTS":
            return {
                ...state,
                project:action.project
            }
            case "SET_PROJECTS_NULL":
                return {
                    ...state,
                    project:null
            }
           
            default:
                return state;
    }
    }