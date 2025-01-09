import "./index.css"

export function StudentCard({ student, modalHandleAllocateStudent }){
    return(
        <div className="studentCardContainer" onClick={() => modalHandleAllocateStudent(student)}>
            <div>
                <p>{student.name}</p>
                <p>{student.email}</p>
            </div>
        </div>
    )
}