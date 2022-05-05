// Tehtävä 1.1 uusi komponentti
// renderöi kurssin nimen
const Header = (props) => {
  //console.log("Header props " + props.course.name);
  return (
    //<div>
      <h1>
        {props.course.name}
      </h1>
    //</div>
  )
}

// Tehtävä 1.1 uusi komponentti
// renderöi kurssin osan ja tehtävämäärät
// Tehtävä 1.2 refaktoroidaan niin että
// renderöi kolme Part:ia
const Content = (props) => {
  console.log("Content props " + props.content.name);
  return (
    <div>
      <Part part={props.content.parts[0].name} exercises={props.content.parts[0].exercises}/>
      <Part part={props.content.parts[1].name} exercises={props.content.parts[1].exercises}/>
      <Part part={props.content.parts[2].name} exercises={props.content.parts[2].exercises}/>
    </div>
  )
}

// Tehtävä 1.2 uusi Part-komponentti
// renderöi yhden osan nimen ja tehtävämäärän
const Part = (props) => {
  console.log("Part props nimi " + props);
  //console.log("Content prop " + props.parts[props.name]);
  return (
    <div>
      <p>
        {props.part}, {props.exercises} excercises
      </p>
    </div>
  )
}

// Tehtävä 1.1 uusi komponentti
// renderöi tehtävien yhteismäärän
const Total = (props) => {
  console.log("Header props " + props);
  return (
    <div>
      <p>
        Total number of Exercises is {props.total.parts[0].exercises+props.total.parts[1].exercises+props.total.parts[2].exercises}
      </p>
    </div>
  )
}

// tehtävät 1.3 - 1.5 tehty
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course = {course} />
      <Content content = {course} />
      <Total total = {course} />
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

/* 
<Content part1 = {part1} part2 = {part2} part3 = {part3}
exercises1 = {part1.exercises} exercises2 = {part2.exercises} exercises3 = {part3.exercises} />
TotalNumber of exercises: <Total exercises = {part1.exercises+part2.exercises+part3.exercises}/>
*/