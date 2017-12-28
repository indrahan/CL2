export type Course = {
    id:number,
    courseCode:string,
    lectures:Lecture[]
}

export type Lecture ={
    id:number,
    lectureCode:string,
    teacher:string
}