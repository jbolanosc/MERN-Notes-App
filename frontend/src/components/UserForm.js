import React, { Component } from 'react';
import axios from 'axios';

export default class UserForm extends Component {

    state = {
        users : [],
        username: '',
        password: ''
    }

    async componentDidMount(){
        this.getUsers();
    }

    async getUsers(){
        const users = await axios.get('http://localhost:4000/api/users');
        this.setState({ users: users.data});
    }

    onChangeUserName = (e) => {
        this.setState({
            username: e.target.value
        })
    }
    
    onSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:4000/api/users', { username: this.state.username, password: 'non'});
        this.getUsers();
        this.setState({
            username: ''
        })
    }

    onDelete = async (id) => {
        await axios.delete('http://localhost:4000/api/users/' + id);
        this.getUsers();
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                    <div>
                        <div className="card">
                            <div className="card-body">
                                <h3>Create new user</h3>
                                <form onSubmit={this.onSubmit}>
                                    <div className="form-group">
                                        <input className="form-control" type="text" value={this.state.username} onChange={this.onChangeUserName}/>
                                    </div>
                                    <button className="btn btn-primary" type="submit">
                                        Submit
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-8">
                    <ul className="form-group">
                    {
                        this.state.users.map(user => (
                            <li className="list-group-item list-group-item-action" key={user._id} onDoubleClick={() => this.onDelete(user._id)}>{user.username}</li>
                        ))
                    }
                    </ul>
                </div>
            </div>
        )
    }
}
