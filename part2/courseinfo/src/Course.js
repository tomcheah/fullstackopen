import React from 'react'
import Header from './Header'
import Content from './Content'
import Total from './Total'

const Course = ({ name, parts }) => {
  console.log('This is Course ', name, ' with ', parts, ' parts')
    return (
        <div>
          <Header course={name} />
          <Content parts={parts} />
          <Total parts={parts} />
        </div>
    )
}
    

export default Course