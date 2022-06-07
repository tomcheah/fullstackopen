import React from 'react'
import Header from './Header'
import Content from './Content'
import Total from './Total'

const Course = ({ course }) => {
    let { id, name, parts } = course
    return (
        <div>
          <Header course={name} />
          <Content parts={parts} />
          <Total parts={parts} />
        </div>
    )
}
    

export default Course