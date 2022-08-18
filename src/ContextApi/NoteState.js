import { useState } from "react";

// import AddNote from "../Components/AddNote"
import NoteContext from "./NoteContext"
var json = {}
const NoteState = (props) => {
  const url = 'http://localhost:5000/api/'
  const [notes, setNotes] = useState([])

  const fetchNotes = async () => {
    const response = await fetch(url + "notes/fetchNotes", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authToken': localStorage.getItem("authToken")
      },
    });
    json = await (response.json());
    setNotes(json.notes);
  }

  const AddNoteItem = async (note) => {
    if (!("tag" in note)) {
      note.tag = ""
    }
    const response = await fetch(url + "notes/addNote", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authToken': localStorage.getItem("authToken")
      },
      body: JSON.stringify(note)
    });
    const json = await response.json()
    console.log(json)
    setNotes(notes.concat(json.savedNote));
    console.log(notes)

  }

  const deleteNote = async (noteId) => {
    const response = await fetch(url + "notes/deleteNote/" + noteId, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'authToken': localStorage.getItem("authToken")
      },
    });

    const copyNotes = (notes.filter((note) => { return note._id !== noteId }))
    setNotes(copyNotes);
    const json = await response.json()
    console.log(json)

  }

  const editNote = async (note) => {
    console.log("editN", note)
    const noteId = note._id
    const response = await fetch(url + "notes/updateNote/" + noteId, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'authToken': localStorage.getItem("authToken")
      },
      body: JSON.stringify(note)
    });


    // const copyNotes = (notes.filter((note) => { return note._id !== noteId }))
    let newNotes = JSON.parse(JSON.stringify(notes));
    for (var i = 0; i < newNotes.length; i++) {
      if (note._id === newNotes[i]._id) {
        newNotes[i].title = note.title;
        newNotes[i].description = note.description;
        newNotes[i].tag = note.tag;
        break;
      }
    }
    setNotes(newNotes)
    console.log(notes)

    const json = await response.json()
    console.log(json.updateNote)
  }

  const login = async (creds) => {
    const response = await fetch(url + "auth/login/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(creds)
    });
    const json = await response.json()
    console.log(json)

    if (json.status) {
      localStorage.setItem("authToken", json.authToken);
      alert("Login Successful!!!")
      // console.log(localStorage.getItem("authToken"))
      return true
    }
    else {
      alert(json.errors)
    }
  }
  const signup = async (creds) => {
    const response = await fetch(url + "auth/createuser/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(creds)
    });
    const json = await response.json()
    console.log(json)
    if (json.status) {
      alert("User created successfully!!!")
      return true
    }
    else {
      alert(json.errors)
    }
  }
  return (
    <NoteContext.Provider value={{ AddNoteItem, fetchNotes, deleteNote, notes, editNote, login, signup }}>
      {props.children}
    </NoteContext.Provider>

  );
}

export default NoteState;