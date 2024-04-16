const Part = ({ name, exercises }) => (
    <p>
        {name} {exercises}
    </p>
)
const Total = ({ parts }) => (<h4> Total of  {parts.reduce((acc, item) => acc + item.exercises, 0)} exercises</h4>)

const Header = ({ name }) => (<h2>{name}</h2>)
const Content = ({ parts }) => {
    return (
        <>
            {parts.map(p => <Part key={p.id} name={p.name} exercises={p.exercises} />)}
        </>
    )
}
const Course = ({ course }) => {
    return (
        <div>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

export default Course;