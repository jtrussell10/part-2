
const Header = ({course}) => {
  return (
    <div>
      <h2>
        {course.name}
      </h2>
    </div>
  )
}


const Parts = ({parts}) => {
  return (
    <li>
        {parts.name} {parts.exercises}
    </li>
  )
}


const Content = ({parts}) => {
  const mystyle={
    listStyleType:'none'
  }
  return (
    <div>
       <ul style={mystyle}>
          {parts.map(subparts => 
          <Parts key={subparts.id} parts={subparts}/>
          )}
      </ul>
    </div>
  )
}


const Total = ({parts}) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0);
  return (
    <div>
      <p>
        Total of {total} exercises
      </p>
    </div>
  )
}


const Course = ({course}) => {
    return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const Courses = ({courses}) => {
  return (<div>
    {courses.map(course => <Course key={course.id} course={course}/>)}
    </div>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]
  return <Courses courses={courses} />
}



export default App
