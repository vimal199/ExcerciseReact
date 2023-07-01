export const Course = (props) => {
    let sum = 0
    debugger
    console.log('array', props.course.parts);
    const total = props.course.parts.reduce(
        (sum, curr) => {
            console.log('iteration', curr);
            return curr.exercises + sum
        }, sum
    )
    return (
        <div>
            <h1>{props.course.name}</h1>

            {props.course.parts.map((course) =>
                <p key={course.id}> {course.name}</p>
            )}
            <h3>
                total of {total} excercise
            </h3>
        </div >
    )
}

