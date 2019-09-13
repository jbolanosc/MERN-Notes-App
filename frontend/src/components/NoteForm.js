import React, { Component } from "react";
import DatePicker from "react-datepicker";
import axios from "axios";

import "react-datepicker/dist/react-datepicker.css";

export default class NoteForm extends Component {
  state = {
    users: [],
    userSelected: "",
    title: "",
    content: "",
    date: new Date(),
    edit: false,
    id: ""
  };

  componentDidMount() {
    this.initiateData();
  }

  async initiateData() {
    const res = await axios.get("http://localhost:4000/api/users");
    this.setState({
      users: res.data,
      userSelected: res.data[0].username
    });

    if (this.props.match.params.id) {
      const note = await axios.get("http://localhost:4000/api/notes/" + this.props.match.params.id);

      this.setState({
        title: note.data.tittle,
        content: note.data.content,
        date: new Date(note.data.date),
        edit: true,
        id: this.props.match.params.id
      });
    }
  }



  onChangeDate = date => {
    this.setState({
      date: date
    });
  };

  onInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  saveNote = async e => {
    e.preventDefault();

    if (this.state.id !== "") {
      const res = await axios.put(
        "http://localhost:4000/api/notes/" + this.state.id,
        {
          tittle: this.state.title,
          author: this.state.userSelected,
          content: this.state.content,
          date: this.state.date
        }
      );

      
      this.setState({
        tittle: "",
        author: "",
        content: "",
        date: ""
      });
      window.location.href = "/";
    } else {
      const res = await axios.post("http://localhost:4000/api/notes", {
        tittle: this.state.title,
        author: this.state.userSelected,
        content: this.state.content,
        date: this.state.date
      });
      this.setState({
        tittle: "",
        author: "",
        content: "",
        date: ""
      });
      window.location.href = "/";
    }
  };

  render() {
    return (
      <div className="col-md-6 offset-md-3">
        <div className="card card-body">
          <h4>Create Note</h4>
          <form onSubmit={this.saveNote}>
            <div className="form-group">
              <select
                className="form-control"
                name="userSelected"
                onChange={this.onInputChange}
              >
                {this.state.users.map(user => (
                  <option key={user._id} value={user.username}>
                    {user.username}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <input
                name="title"
                placeholder="title"
                className="form-control"
                value={this.state.title}
                onChange={this.onInputChange}
                required
              />
            </div>
            <div className="form-group">
              <textarea
                name="content"
                className="form-control"
                placeholder="Content"
                value={this.state.content}
                onChange={this.onInputChange}
                required
              ></textarea>
            </div>

            <div className="form-group">
              <DatePicker
                className="form-control"
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>

            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}
