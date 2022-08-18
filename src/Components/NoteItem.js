import React, { useContext, useRef } from 'react';
import NoteContext from '../ContextApi/NoteContext'

const NoteItem = (props) => {
  const { note,handleEdit } = props
  const context = useContext(NoteContext);
  const { deleteNote, } = context;

 
  return (
    <>
 
      <div className="col-3 my-3">

        <div className="card" style={{ width: '18rem' }}>

          <div className="card-body">
            <div className="d-flex bd-highlight">
              <h5 className="card-title">{note.title}</h5>

              <i className="fa-solid fa-pen-to-square mx-2" onClick={() => { handleEdit(note) }} >
              </i>
              <i className="fa-solid fa-trash" onClick={() => deleteNote(note._id)}></i>
            </div>
            <p className="card-text">{note.description}</p>
          </div>
        </div>
      </div>

    </>
  )
}

export default NoteItem
