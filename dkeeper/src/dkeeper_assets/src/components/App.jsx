import React, { useEffect, useState }  from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Note from "./Note.jsx";
//import notes from "./notes.js";
import CreateArea from "./CreateArea";
import { dkeeper } from "../../../declarations/dkeeper";

function App() {

    const [notes, setNotes] = useState([]);

    function deleteNote(id) {
        //console.log(id);
        dkeeper.deleteNote(id);
        setNotes((prevItems) => {
          return prevItems.filter((item, index) => {
            return index !== id;
          });
        });
      }

      function addNote(newNote) {
        //console.log(newNote);
        //const newValue = event.target.value;
        setNotes(prevItems => {
            dkeeper.createNote(newNote.title, newNote.content);
            return [newNote, ...prevItems];
          });
      }

      async function fetchData() {
        const notesArray = await dkeeper.readNotes();
        console.log(notesArray);
        setNotes(notesArray);
      }

      // Grab array of notes from canister on website load
      useEffect(() => {
        console.log("useEffect is triggered");
        fetchData();
      }, []);

  return (
    <div>
      <Header />
      <CreateArea addNote={addNote} />
      {notes.map((noteItem, index) => <Note key={index} id={index} title={noteItem.title} content={noteItem.content} deleteNote={deleteNote}  />)}
      <Footer />
    </div>
  );
}

export default App;