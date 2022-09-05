//tehtävä 9.14

interface CoursePartsProps { // uusi tyyppi määrittämään kurssin osaset
  parts: CoursePart[];
}

/* interface CoursePart { // määritetään kurssin osasten tyypit tällä interfacella
  name: string;
  exerciseCount: number;
}  */

// new types tehtävä 9.15
interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
  description?: string;
}

interface CourseNormalPart extends CoursePartBase {
  type: "normal";
  //description: string;
}
interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CoursePartBase {
  type: "submission";
  //description: string;
  exerciseSubmissionLink: string;
}

interface CourseDescriptionPart extends CoursePartBase {
  type: "description";
  description: string;
}

// Lastly, add another course part interface with the following attributes
interface CoursePartInterface {
  name: string;
  exerciseCount: number;
  description: string;
  requirements: string[];
  type: string;
  groupProjectCount?: number;
  exerciseSubmissionLink?: string
}

type CoursePart = 
  CourseNormalPart | 
  CourseProjectPart | 
  CourseSubmissionPart | 
  CourseDescriptionPart | 
  CoursePartInterface;

// tehtävä 9.15
const Part = ({ part }: { part: CoursePart }) => {
  switch (part.type) {
    case "normal":
      return (
        <em>{part.description}</em>
      );
    case "groupProject":
      console.log(part);
      return (
        <div>project exercises {part.groupProjectCount}</div>
      );
    case "submission":
      console.log(part);
      return (
        <div><em>{part.description}</em><br/>submit to {part.exerciseSubmissionLink}</div>
      );
    case "description":
      return (
        <em>{part.description}</em>
      );
    case "special":
      return (
        <>
          <em>{part.description}</em><br/>
          required skills: {part.requirements.join(", ")}
        </>
      );
    default:
      return null;
  }
}
const Header = ({ name }: { name: string }) => {
  return (
    <>
      <h1>{name}</h1>
  </>
  )
}
const Content = ({ parts }: CoursePartsProps) => {
  return (
    <>
      {parts.map(
        (p) => 
          <p key={p.name}>
            <b>{p.name}</b> - {p.exerciseCount} exercises<br/>
            <Part part= {p} />
            {/* <b>{p.name} {p.exerciseCount}</b><br/>
            <em>{p.description}</em><br/>
            submit to {p.exerciseSubmissionLink}<br/>
            required skills: {p.requirements} */}

          </p>
      )}
    </>
  )
}


const Total = ({ parts }: CoursePartsProps) => {
  return (
    <>
    <p>
      Number of exercises{" "}
      {parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
    </>
  )
}

const App = () => {
  const courseName = "Half Stack application development";
  
  // this is the new coursePart variable (exercise 9.15)
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the easy course part!",
      type: "normal"
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the hard course part!",
      type: "normal"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      type: "groupProject"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
      type: "submission"
    },
    {
      name: "Backend development",
      exerciseCount: 22,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      type: "special"
    }
  ]

  
  

// Header rendaa kurssin nimen
// Content eri kurssin osien nimet ja harkkojen lkm:t
// Total renderöi kaikkien osien kaikkien harkkojen summan
/* 
Half Stack application development
Fundamentals 10

Using props to pass data 7

Deeper type usage 14

Number of exercises 31
*/
  return (
    <div>
      <Header name={courseName} />      
      <Content parts={courseParts} />
      <Total parts={courseParts} />
    </div>
  );
};

export default App;