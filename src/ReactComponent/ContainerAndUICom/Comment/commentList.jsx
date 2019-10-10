import React, { Component } from "react";

import Comment from "./comment";

export default class commentList extends Component {
    constructor() {
        super();

        this.state = {
            comments: [
                {
                    author: "Niao",
                    content: "hello world"
                }
            ]
        };
    }

    componentDidMount() {
        setInterval(
            () => {
                this.setState({
                    comments: [
                        ...this.state.comments,
                        {
                            author: "Niao" + Math.random(),
                            content: "hello world" + Math.random()
                        }
                    ]
                });
            },

            1000
        );
    }
    render() {
        let list = this.state.comments;
        return (
            <div>
                {list.length
                    ? list.map((comment, idx) => (
                          <Comment comment={comment} key={idx} />
                      ))
                    : null}
            </div>
        );
    }
}
