import Part from './Part'

const Content = ({ course }) => {
    // console.log('Lo que llega a Content: ', course)

    let totalExercises = 0;
    const conteExercises = (courses) =>{
        // console.log('Lo que llega a la función totalExercises: ', courses)

        const totalExer = courses.course.map(exe => exe.exercises)

        // console.log('Lo que sale del map: ', totalExer)
        // totalExer.forEach(number => totalExercises += number)

        const totalExercises = totalExer.reduce((s, p) => s + p)

        // console.log('Total de Ejercicios: ', totalExercises)

        return totalExercises
    }

    return (
        <div>
            {course.map(note =>
                <Part key={note.id} name={note.name} number={note.exercises}/>
                )
            }
            <p>
                <b>Total of {conteExercises({course})} exercises</b>
            </p>
        </div>

    )
}

export default Content
