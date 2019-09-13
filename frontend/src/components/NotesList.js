import React, { Component } from "react";
import axios from "axios";
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';


export default class NotesList extends Component {
  componentDidMount() {
    this.getNotes();
  }

  state = {
    notes: []
  };

  async getNotes() {
    const res = await axios.get("http://localhost:4000/api/notes");
    console.log(res.data);
    this.setState({
      notes: res.data
    });
  }

 onDelete =  async (id) => {
    alert(id);
    await axios.delete("http://localhost:4000/api/notes/" + id);
    this.getNotes();
  }

  render() {
    return (
      <div className="container row">
        {this.state.notes.map(note => (
          <div className="card col-md-3" key={note._id} onDoubleClick={() => this.onDelete(note._id)}>
            <div className="card-body">
              <h5 className="card-title">{note.tittle}</h5>
              <h6 className="card-subtitle mb-2">{note.author}</h6>
              <p className="card-text">
                  {note.content}
              </p>
              <h6 className="card-title">{format(note.date)}</h6>
              <Link className="btn btn-primary m-2" to={"/edit/" + note._id}>Update</Link>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
