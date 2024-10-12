import React, { useContext, useEffect, useRef, useState } from "react";
import NotesContext from "../context/notes/NotesContext"; // Import the actual context
import Noteitem from "./Noteitem";

const Notes = (props) => {
    const context = useContext(NotesContext); // Use the correct context
    let { notes, getNote, editNote } = context;
    const [note, setNote] = useState({
        id: "",
        etitle: "",
        edescription: "",
        etag: "",
    });

    useEffect(() => {
        getNote();
    }, []);

    const ref = useRef(null);
    const refClose = useRef(null);

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({
            id: currentNote._id,
            etitle: currentNote.title,
            edescription: currentNote.description,
            etag: currentNote.tag,
        });
        props.showAlert("updated notes successfully","success")
    };

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    const handleClick = (e) => {
        e.preventDefault();
        editNote(note.id, note.etitle, note.edescription, note.etag);
        ref.current.click();
    };

    return (
        <>
            <button
                type="button"
                className="btn btn-primary d-none"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                ref={ref}
            >
                Launch demo modal
            </button>

            <div
                className="modal fade"
                id="exampleModal"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">
                                title
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3 my-5">
                                <label htmlFor="etitle" className="form-label">
                                    <h2>TITLE</h2>
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="etitle"
                                    name="etitle"
                                    onChange={onChange}
                                    value={note.etitle}
                                    minLength={5} required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="edescription" className="form-label">
                                    <h2>DESCRIPTION</h2>
                                </label>
                                <textarea
                                    className="form-control"
                                    id="edescription"
                                    name="edescription"
                                    rows="3"
                                    onChange={onChange}
                                    value={note.edescription}
                                ></textarea>
                            </div>

                            <div className="mb-3 my-2">
                                <label htmlFor="etag" className="form-label">
                                    <h2>Tag</h2>
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="etag"
                                    name="etag"
                                    onChange={onChange}
                                    value={note.etag}
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                            <button
                                ref={refClose}
                                type="button"
                                className="btn btn-primary"
                                onClick={handleClick}
                                disabled={note.etitle.length<5||note.edescription.length<5}
                            >
                                Update Note
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row d-flex flex-wrap my-4">
                <h2 className="w-100">YOUR NOTES</h2>
                {notes.length === 0 && ( <p>No notes available. Start adding some!</p>)}
                {notes.map((note, index) => (
                    <div key={index} className="col-md-4 d-flex mb-3 my-4">
                        <Noteitem note={note} updateNote={updateNote} />
                    </div>
                ))}
            </div>

        </>
    );
};

export default Notes;
