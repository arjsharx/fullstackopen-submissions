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
  const Header = (props) => {
    return (
      <h1>{props.course.name}</h1>
    )
  }
  const Total = (props) => {
    return (
      <p>Number of exercises {props.total}</p>
    )
  }
  const Content = (props) => {
    return (
      <div>
      <p>{props.course.parts[0].name} {props.course.parts[0].exercises}</p>
      <p>{props.course.parts[1].name} {props.course.parts[1].exercises}</p>
      <p>{props.course.parts[2].name} {props.course.parts[2].exercises}</p>
      </div>
    );
  };

  return (
    <div>
      <Header course={course}></Header>
      <Content course={course}></Content>
      <Total total={course.parts[0].exercises+course.parts[1].exercises+course.parts[2].exercises}></Total>
    </div>
  )
}
export default App