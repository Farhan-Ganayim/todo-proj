const { useState } = React
const { Link, NavLink } = ReactRouterDOM
const { useNavigate } = ReactRouter
const {useSelector} =ReactRedux

import { logout } from '../store/actions/user.actions.js'
import { userService } from '../services/user.service.js'
import { UserMsg } from "./UserMsg.jsx"
import { LoginSignup } from './LoginSignup.jsx'
import { showErrorMsg } from '../services/event-bus.service.js'


export function AppHeader() {
    const todos = useSelector((storeState) => storeState.todos)
    const user = useSelector((storeState) => storeState.user)
        const navigate = useNavigate()
        
    function onLogout() {
        logout()
lo            .then(() => {
                console.log('bye');

            })
            .catch((err) => {
                showErrorMsg('OOPs try again')
            })
    }

    // function onSetUser(user) {
    //     setUser(user)
    //     navigate('/')
    // }
    return (
        <header className="app-header full main-layout">
            <section className="header-container">
                <h1>React Todo App</h1>
                {user ? (
                    < section >
                        <Link to={`/user/${user._id}`}>Hello {user.fullname}</Link>
                        <button onClick={onLogout}>Logout</button>
                    </ section >
                ) : (
                    <section>
                        <LoginSignup/>
                    </section>
                )}
                <nav className="app-nav">
                    <NavLink to="/" >Home</NavLink>
                    <NavLink to="/about" >About</NavLink>
                    <NavLink to="/todo" >Todos</NavLink>
                    <NavLink to="/dashboard" >Dashboard</NavLink>
                </nav>
            </section>
            <UserMsg />
        </header>
    )
}
