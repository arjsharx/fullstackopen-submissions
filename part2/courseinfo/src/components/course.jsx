const Course = ({course}) => {
    return(
      <div>
  <Header course = {course}/>
  <Content parts = {course.parts}/>
  <Total parts = {course.parts}/>
  </div>
    )
  }
  const Header = ({course}) => {
    return (
      <h2>{course.name}</h2>
    )
  }
  const Total = ({parts}) => {
    const total = parts.reduce((accumulator,part) => {return accumulator += part.exercises;},0)
    return <b>total of {total} exercises</b>
  }
  const Content = ({parts}) => {
    return (
      <div>
      {parts.map((part) => (
        <Part key = {part.id} part={part}/>
      )
      )
    }
      </div>
    );
  };
  const Part = ({part}) => {
    return (
      <p>{part.name} {part.exercises}</p>
    )
  }
  export default Course