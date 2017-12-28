import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Route, NavLink, Link } from 'react-router-dom';
import * as Models from "../Models";
import { Lecture } from "./Lecture";

async function loadCourses(): Promise<Models.Course[]> {
    let result = await fetch(`./Movies/Getall`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } })
    let result1 = await result.json()
    return result1
}

export class CoursesManager extends React.Component<RouteComponentProps<{}>, { courses: Models.Course[] | "loading" }>{
    constructor(props: RouteComponentProps<{}>) {
        super(props)
        this.state = { courses: "loading" }
    }
    componentWillMount() {
        loadCourses().then(cs => this.setState({ ...this.state, courses: cs }))
    }
    public render() {
        if (this.state.courses == "loading") return <div>Loading...</div>

        return <div className="courses">
            {this.state.courses.map(c => <div className="courses-course">
                {c.courseCode}
                <Link to={"/course/false/" + c.id}>
                    <button>Expand course</button>
                </Link>


                <div className="courses-course-lectures">
                    {c.lectures.map(l => <div className="courses-course-lectures-lecture">
                        <Lecture lecture={l} preview={true} />
                        <Link to={"/lecture/false/" + l.id}>
                            <button>Expand lecture</button>
                        </Link>
                    </div>)}
                </div>
            </div>)}
        </div>
    }
}