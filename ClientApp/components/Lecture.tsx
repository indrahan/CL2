import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Route, NavLink, Link } from 'react-router-dom';
import * as Models from "../Models";


async function loadLecture(id: number): Promise<Models.Lecture> {
    let result = await fetch(`Lectures/GetLecture/${id}`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } })
    let result1 = await result.json()
    return result1
}
export class LectureRoute extends React.Component<RouteComponentProps<{ preview: any, lecture: any }>, { lecture: Models.Lecture | "loading" }>{
    constructor(props: RouteComponentProps<{ preview: boolean, lecture: number }>) {
        super(props)
        console.log("props", props)
        this.state = { lecture: "loading" }
    }
    componentWillMount() {
        loadLecture(this.props.match.params.lecture).then(l => this.setState({ ...this.state, lecture: l }))
    }
    public render() {
        if (this.state.lecture == "loading") return <div>Loading...</div>
        return <Lecture preview={this.props.match.params.preview == 'true'} lecture={this.state.lecture} />
    }
}

export class Lecture extends React.Component<{ preview: boolean, lecture: Models.Lecture }, {}>{
    constructor(props: { preview: boolean, lecture: Models.Lecture }) {
        super(props)
        this.state = {}
    }
    public render() {
        if (this.props.preview) {
            return <div> {this.props.lecture.teacher}</div>
        }
        else {
            return <div>
                <div> Teacher : {this.props.lecture.teacher}</div>
                <div> Lecture Code : {this.props.lecture.lectureCode}</div>


            </div>


        }
    }
} 
