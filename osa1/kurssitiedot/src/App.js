// Tehtävä 1.1 uusi komponentti
// renderöi kurssin nimen
const Header = (props) => {
  //console.log("aaa");
  return (
    //<div>
      <h1>
        {props.course}
      </h1>
    //</div>
  )
}

// Tehtävä 1.1 uusi komponentti
// renderöi kurssin osan ja tehtävämäärät
// Tehtävä 1.2 refaktoroidaan niin että
// renderöi kolme Part:ia
const Content = (props) => {
  //console.log("aaa");
  return (
    <div>
      <Part part={props.part1} exercises={props.exercises1}/>
      <Part part={props.part2} exercises={props.exercises2}/>
      <Part part={props.part3} exercises={props.exercises3}/>
    </div>
  )
}

// Tehtävä 1.2 uusi Part-komponentti
// renderöi yhden osan nimen ja tehtävämäärän
const Part = (props) => {
  //console.log("aaa");
  return (
    <div>
      <p>
        {props.part}, {props.exercises} exercises
      </p>
    </div>
  )
}

// Tehtävä 1.1 uusi komponentti
// renderöi tehtävien yhteismäärän
const Total = (props) => {
  //console.log("aaa");
  return (
    <div>
      <p>
        {props.exercises}
      </p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course = {course} />
      <Content part1 = {part1} part2 = {part2} part3 = {part3}
      exercises1 = {exercises1} exercises2 = {exercises2} exercises3 = {exercises3} />
      TotalNumber of exercises: <Total exercises = {exercises1+exercises2+exercises3}/>
    </div>
  )
}

export default App

/* alkuperäinen Appin return
return (
    <div>
      <h1>{course}</h1>
      <p>
        {part1} {exercises1}
      </p>
      <p>
        {part2} {exercises2}
      </p>
      <p>
        {part3} {exercises3}
      </p>
      <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
    </div>
  )
*/