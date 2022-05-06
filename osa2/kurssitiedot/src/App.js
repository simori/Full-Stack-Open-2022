import CourseList from "./components/CourseList"

// 2.4
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
    },
    {
      name: 'How to create Hello World program',
      id: 3,
      parts: [
        {
          name: 'Understanding what Hello World is',
          exercises: 99,
          id: 1
        },
        {
          name: 'Learning How to use Computer',
          exercises: 42,
          id: 2
        }
        ,
        {
          name: 'Creating the Hello World Program',
          exercises: 9000,
          id: 2
        },
        
      ]
    }
  ]

  return (
    <div>
      <h1>Web Developement Curriculum</h1>
      <CourseList list={courses} />
    </div>
  )
}

export default App

