import React, { Component } from 'react';

export default class Test extends Component {
    state={
        data:''
    }

    componentDidMount(){
        fetch('http://localhost:3000/posts/1')
        .then(response=> response.json())
        .then(data=> {
            this.setState({
                data:data
            });
        });
    }

    render() {
        const {data} = this.state;
        return (
            <div>
                <h1>{data.title}</h1>
            </div>
        )
    }
}
