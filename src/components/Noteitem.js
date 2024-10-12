import React,{useContext} from 'react';
import NotesContext from '../context/notes/NotesContext'; // Import the actual context

const Noteitem = (props) => {
    const { note,updateNote } = props
    const context = useContext(NotesContext); // Use the correct context
    let { deleteNote } = context;
    
    
    return (
        <>
            <div className="toast show" role="alert" aria-live="assertive" aria-atomic="true">
            <div className="toast-header">
                <strong className="me-auto">{note.title}</strong>
                <small className='mx-2'><i className="fa-solid fa-pen-to-square fs-6" onClick={()=>{updateNote(note)}}></i></small>
                <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close" id='delete' onClick={()=>deleteNote(note._id)}></button>
            </div>
            <div className="toast-body">
                {note.description}
            </div>
        </div>
        </>
    );
};

export default Noteitem;
