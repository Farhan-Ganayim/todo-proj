const { useState, useEffect } = React
const { useNavigate } = ReactRouterDOM
const { useSelector } = ReactRedux

export function UserDetails() {
    const user = useSelector(state => state.user)
    if (!user) return <div>Loading user...</div>

    return (
        <section className="user-details">
            <h1>Hello, {user.fullname}</h1>
            <h2>Your Activities:</h2>
            <ul>
                {user.activities && user.activities.map((activity, idx) => (
                    <li key={idx}>
                     {activity.txt} at :  {new Date(activity.at).toLocaleString()} 
                    </li>
                ))}
            </ul>
        </section>
    )
}