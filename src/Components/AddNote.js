import React, { useState,useContext } from 'react';
import NoteContext from '../ContextApi/NoteContext'

function AddNote() {
    const context = useContext(NoteContext);
    const {AddNoteItem}  = context;

    const handleSubmit =(e)=> {
        e.preventDefault();
        // alert(JSON.stringify(note))
        AddNoteItem(note) 
      }
    const [note,setNote] = useState([])
    const onChange = (e)=> {
        setNote({...note,[e.target.name]:e.target.value})
    }
    return (
        <div className="container">
            <h1 className="mt-3" style={{'textAlign': 'center'}}>Add a Note</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group my-3">
                    <b htmlFor="Title">Title</b>
                    <input  className="form-control" 
                     name="title" aria-describedby="emailHelp" placeholder="Enter Title" onChange={onChange} minLength="3" required/>
                </div>
                <div className="form-group my-3">
                    <b htmlFor="Description">Description</b>
                    <textarea rows="5" className="form-control" name="description" placeholder="Enter Description"  onChange={onChange} minLength="5" required/>
                </div>
                <div className="form-group my-3">
                    <b htmlFor="Tag">Tag</b>
                    <input className="form-control" name="tag"  placeholder="Enter Tag" onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default AddNote
