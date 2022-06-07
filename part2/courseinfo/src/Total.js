import React from 'react'

const Total = ({ parts }) => {
    let sum = parts.reduce((acc, part) => acc + part.exercises, 0)
    return <p>Total of {sum} exercises</p>
}
export default Total