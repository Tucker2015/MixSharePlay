import React, { Component } from "react";

function Likes() {
    const [count, setCount] = React.useState(0)

    React.useEffect(() => {
        const parsedCount = Number(localStorage.getItem("count") || 0)
        setCount(parsedCount)
    }, [])

    React.useEffect(() => {
        localStorage.setItem("count", count)
    }, [count])

    return (
        <div>
            <div>{count}</div>

            <button onClick={() => setCount(c => c + 1)}><i className="fas fa-heart"></i></button>

        </div>
    )
}

export default Likes;