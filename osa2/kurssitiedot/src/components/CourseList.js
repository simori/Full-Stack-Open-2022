import Course from "../components/Course"

const CourseList = ({ list }) => {
    // otetaan mapilla kursseista nimet ja harjoitukset
    return (
      <div>
        {list.map(c =>
          <Course course={c} />
        )}
      </div>
    )
  }

  export default CourseList