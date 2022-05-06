const Header = ({ course }) => <h2>{course}</h2>

const Total = ({ sum }) => <p><b><i>total of {sum} exercises</i></b> </p>

const Part = ({ part }) =>
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => {
  return (
    <div>

      {parts.map(p =>
        <Part part={p} />
      )}

    </div>
  )
}

// tehtävä 2.1
const Course = ({ course }) => {
  // otetaan mapilla kursseista nimet ja harjoitukset
  const parts = course.parts.map(c => ({ name: c.name, exercises: c.exercises }))
  // tehtävä 2.2 ja 2.3 käytetään reducea tehtävien määrän laskemiseen
  const totalExercises = parts.reduce((sum, course) => sum + course.exercises, 0)

  return (
    <div>
      <Header course={course.name} />
      <Content parts={parts} />
      <Total sum={totalExercises} /> {/*tehtävä 2.2*/}
    </div>
  )
}

export default Course