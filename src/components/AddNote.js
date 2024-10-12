import React, { useContext, useState } from "react";
import NoteContext from "../context/notes/NotesContext";

const AddNote = (props) => {
    const context = useContext(NoteContext);
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" });

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    };

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag); // Pass individual values
        setNote({ title: "", description: "", tag: "" });
    };
    

    return (
        <>
            <div className="container">
                <h1 className="my-4">Add a note</h1>
                <div className="mb-3 my-5">
                    <label htmlFor="title" className="form-label">
                        <h2>TITLE</h2>
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        onChange={onChange}
                        value={note.title}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                        <h2>DESCRIPTION</h2>
                    </label>
                    <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        rows="3"
                        onChange={onChange}
                        value={note.description}
                    ></textarea>
                </div>

                <div className="mb-3 my-2">
                    <label htmlFor="tag" className="form-label">
                        <h2>Tag</h2>
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="tag"
                        name="tag"
                        onChange={onChange}
                        value={note.tag}
                    />
                </div>
                <button id="submit" onClick={handleClick} disabled={note.title.length<5||note.description.length<5}>
                    Submit
                </button>
            </div>
        </>
    );
};

export default AddNote;
