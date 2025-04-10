const { createStore, compose } = Redux
import { userService } from "../services/user.service.js"

export const SET_TODOS = 'SET_TODOS'
export const ADD_TODO = 'ADD_TODO'

const initialState = {
    todos: []

}

function appReducer(state = initialState, cmd = {}) {
    switch (cmd.type) {
        case SET_TODOS:
            return { ...state, todos: cmd.todos }
        case ADD_TODO:
            return { ...state, todos: [cmd.todo, ...state.todos] }
        default:
            return state
    }
}



const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(appReducer, composeEnhancers())