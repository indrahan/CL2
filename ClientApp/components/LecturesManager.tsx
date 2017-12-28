import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Route, NavLink, Link } from 'react-router-dom';
import * as Models from "../Models";
import { Lecture } from "./Lecture";

async function loadLectures(): Promise<Models.Lecture[]> {
    let result = await fetch(`./Lectures/Getall`, { method: 'get', credentials: 'include', headers: { 'content-type': 'application/json' } })
    let result1 = await result.json()
    return result1
}

export class LecturesManager extends React.Component<RouteComponentProps<{}>, { lectures: Models.Lecture[] | "loading" }>{
    constructor(props: RouteComponentProps<{}>) {
        super(props)
        this.state = { lectures: "loading" }
    }
    componentWillMount() {
        loadLectures().then(ls => this.setState({ ...this.state, lectures: ls }))
    }
    public render() {
        if (this.state.lectures == "loading") return <div>Loading...</div>
        return <div className="lectures">
            {this.state.lectures.map(l => <div className="lectures-lecture">
                {<Lecture lecture={l} preview={true} />}
                <Link to={"/lectures/false/" + l.id}>
                    <button>Expand lecture</button>
                </Link>
            </div>)}
        </div>
    }
}