import NoteContext from "./NotesContext";
import { useState } from "react";

const NoteState = (props) => {
  let host = "http://localhost:5000";
  let notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  // GET ALL NOTES
  const getNote = async () => {
    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZlMTliY2YwNjY4MDc2YmVhM2U5M2E1In0sImlhdCI6MTcyNjA2MTUzNX0.e4TA2zuGyHrFR6kbiuMNxKjb7kR116k5k30TqWIXlhY',
        },
      });
      const json = await response.json();
      setNotes(json);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  // ADD A NOTE
  const addNote = async (title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZlMTliY2YwNjY4MDc2YmVhM2U5M2E1In0sImlhdCI6MTcyNjA2MTUzNX0.e4TA2zuGyHrFR6kbiuMNxKjb7kR116k5k30TqWIXlhY',
        },
        body: JSON.stringify({ title, description, tag }),
      });

      const note = await response.json(); // Use the response data
      setNotes(notes.concat(note)); // Add the new note to the state
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  // DELETE A NOTE
  const deleteNote = async (id) => {
    try {
      //API CALL
      await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZlMTliY2YwNjY4MDc2YmVhM2U5M2E1In0sImlhdCI6MTcyNjA2MTUzNX0.e4TA2zuGyHrFR6kbiuMNxKjb7kR116k5k30TqWIXlhY',
        },
      });

      const newNotes = notes.filter((note) => note._id !== id);
      setNotes(newNotes);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  // EDIT A NOTE
  const editNote = async (id, title, description, tag) => {
    try {
      // API CALL
      await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZlMTliY2YwNjY4MDc2YmVhM2U5M2E1In0sImlhdCI6MTcyNjA2MTUzNX0.e4TA2zuGyHrFR6kbiuMNxKjb7kR116k5k30TqWIXlhY',
        },
        body: JSON.stringify({ title, description, tag }),
      });
  
      let newNotes = JSON.parse(JSON.stringify(notes));
  
      // Logic to edit note on client side
      for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if (element._id === id) {
          newNotes[index].title = title;
          newNotes[index].description = description;
          newNotes[index].tag = tag;
          break; 
        }
      }
      setNotes(newNotes);
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };
  

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
