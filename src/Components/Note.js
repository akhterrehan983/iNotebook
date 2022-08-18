
import NoteItem from "./NoteItem"
import NoteContext from '../ContextApi/NoteContext'
import React, { useEffect, useContext, useRef, useState } from 'react';
import AddNote from "./AddNote"
const Note = () => {
  const context = useContext(NoteContext);
  const { fetchNotes, notes,editNote } = context;
  useEffect(() => {
    fetchNotes();
  }, []);

  const [note,setNote] = useState([])
  const onChange = (e)=> {
      setNote({...note,[e.target.name]:e.target.value})
  }
  const ref = useRef(null)
  const handleEdit = (note) => {
    // alert("rehaan")
    setNote(note)
    ref.current.click();
    // console.log(note)
  }
  const eHandle = (e) =>{
    e.preventDefault();
    editNote(note);  
  }
  return (
    <>
      <AddNote />
      <button ref={ref} type="button" className="btn btn-primary d-none" data-toggle="modal" data-target="#exampleModal"></button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              
            <div className="container">
            {/* <h1 className="mt-3" style={{'textAlign': 'center'}}>Add a Note</h1> */}
            <form onSubmit={eHandle}>
                <div className="form-group my-3">
                    <b htmlFor="Title">Title</b>
                    <input  className="form-control" 
                     name="title" aria-describedby="emailHelp" placeholder="Enter Title" onChange={onChange} value={note.title || ''} minLength="3" required/>
                </div>
                <div className="form-group my-3">
                    <b htmlFor="Description">Description</b>
                    <textarea rows="5" className="form-control" name="description" placeholder="Enter Description"  onChange={onChange} value={note.description || ''} minLength="5" required/>
                </div>
                <div className="form-group my-3">
                    <b htmlFor="Tag">Tag</b>
                    <input className="form-control" name="tag"  placeholder="Enter Tag" value={note.tag || ''} onChange={onChange} />
                </div>
            <div className="modal-footer">
              <button type="sumbit" className="btn btn-primary">Save changes</button>
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
            </form>

        </div>


            </div>
          </div>
        </div>
      </div>

      <h1 style={{ 'textAlign': 'center' }}>Your Notes</h1>
      <div className="container">
        <div className="row">
          {notes.length > 0 ? notes.map(note => {
            return <NoteItem note={note} handleEdit={handleEdit} key={note._id}></NoteItem>
          }) : <b>No notes to display</b>};
        </div>
      </div>
    </>
  )


}

export default Note