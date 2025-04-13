import { todoService } from "../../services/todo.service.js"
import { SET_TODOS, ADD_TODO, UPDATE_TODO, REMOVE_TODO, store } from "../store.js"
import { userService } from "../../services/user.service.js"

export function loadTodos(filterBy) {
    return todoService.query(filterBy)
        .then(todos => {
            store.dispatch({ type: SET_TODOS, todos })
        })
        .catch(err => {
            console.log('todo action -> Cannot load todos', err)
            throw err
        })
}

export function saveTodo(todo) {
    const isEdit = !todo._id
    const type = todo._id ? UPDATE_TODO : ADD_TODO
    return todoService.save(todo)
        .then((savedTodo) => {
            store.dispatch({ type, todo: savedTodo })
            return savedTodo
        })
        .then(res => {
            const actionName = (isEdit) ? 'Added' : 'Updated'
            return userService.addActivity(`${actionName} a Todo: ` + todo.txt).then(() => res)
                .then(() => res)
        })
        .catch(err => {
            console.log('todo action -> Cannot save todo', err)
            throw err
        })
}

export function removeTodo(todoId) {
    return todoService.remove(todoId)
        .then(() => {
            store.dispatch({ type: REMOVE_TODO, todoId })
            // const user = userService.getLoggedinUser()
            return userService.addActivity(`Removed the todo : ${todoId}`)
        })
        .catch(err => {
            console.error('Cannot reweeeeeemove todo')
            throw err
        })
}