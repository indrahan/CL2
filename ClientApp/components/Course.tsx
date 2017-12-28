import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Route, NavLink, Link } from 'react-router-dom';
import * as Models from "../Models";
import { Lecture } from "./Lecture";

async function loadCourse(id: number): Promise<Models.Course> {
    let result = await fetch(`./Courses/GetCourse/${id}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } })
    let result1 = await result.json()
    return result1
}
export class CourseRoute extends React.Component<RouteComponentProps<{ preview: any, course: any }>, { course: Models.Course | "loading" }>{
    constructor(props: RouteComponentProps<{ preview: boolean, course: number }>) {
        super(props)
        this.state = { course: "loading" }
    }
    componentWillMount() {
        loadCourse(this.props.match.params.course).then(c => this.setState({ ...this.state, course: c }))
    }
    public render() {
        if (this.state.course == "loading") return <div>Loading...</div>
        return <Course preview={this.props.match.params.preview == 'true'} course={this.state.course} />
    }
}

export class Course extends React.Component<{ preview: boolean, course: Models.Course }, {}>{
    constructor(props: { preview: boolean, course: Models.Course }) {
        super(props)
        this.state = {}
    }
    public render() {
        if (this.props.preview) {
            return <div> {this.props.course.courseCode}</div>
        }
        else {
            return <div>
                <div> Course Code : {this.props.course.courseCode}</div>
                <div> Course Id : {this.props.course.id}</div>
                <div className="course-lectures">
                    {this.props.course.lectures.map(l => <div className="course-lectures-lecture">
                        <Lecture lecture={l} preview={true} />
                        <Link to={"/lecture/false/" + l.id}>
                            <button>Expand lecture</button>
                        </Link>
                    </div>)}
                </div>

            </div>
        }
    }
}
