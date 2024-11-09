import Header from './Header'
import Content from './Content'


const Course = ({course}) => {

// console.log('Lo que llega a Course: ', course)

return (
    <div>
        <h1>Web development curriculum</h1>
        {course.map(course =>
            <div key={course.id}>
                <Header name={course.name} />
                <Content course={course.parts} />
            </div>
            )
        }
    </div>
    )
}

export default Course
