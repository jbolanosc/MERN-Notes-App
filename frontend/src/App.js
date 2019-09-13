import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navigation from "./components/Navigation";
import NoteForm from "./components/NoteForm";
import NotesList from "./components/NotesList";
import UserForm from "./components/UserForm";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <Router>
      <Navigation />

      <div className="container p-4">
        <Route path="/" exact component={NotesList} />
        <Route path="/edit/:id" component={NoteForm} />
        <Route path="/create" component={NoteForm} />
        <Route path="/user" component={UserForm} />
      </div>
    </Router>
  );
}

export default App;
