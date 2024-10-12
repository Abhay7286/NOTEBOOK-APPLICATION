const express = require("express");
const fetchuser = require("../Middleware/fetchUser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

const router = express.Router();

// Route 1:get all notes using GET:localhost:5000/api/notes/fetchallnotes->login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// Route 2:Add notes using POST:localhost:5000/api/notes/addnote->login required
router.post(
    "/addnote",
    fetchuser,
    [
        body("title", "Add a valid title").isLength({ min: 3 }),
        body("description", "description should be atleast 5 characters").isLength({ min: 5 }),

    ],
    async (req, res) => {

        try {
            const { title, description, tag } = req.body;

            //return bad request when there is an error
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            // Create new note
            const note = new Note({
                title,
                description,
                tag,
                user: req.user.id
            });

            //to save in database
            const savedNote = await note.save()

            res.json(savedNote);


        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    });

// Route 3: Update an existing note using PUT:localhost:5000/notes/updatenote/:id -> login required
router.put("/updatenote/:id", fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;

        // Create a new note object
        const newNote = {};
        if (title) { newNote.title = title; }
        if (description) { newNote.description = description; }
        if (tag) { newNote.tag = tag; }

        // Find the note to be updated
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("NOT FOUND");
        }

        // Ensure the user owns this note
        if (note.user.toString() !== req.user.id) {
            return res.status(403).send("NOT ALLOWED"); 
        }

        // Update the note
        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });

        // Send the updated note as response
        res.json(note);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});

// Route 4: Delete an existing note using Delete:localhost:5000/notes/deletenote/:id -> login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
    try {

        // Find the note to be deleted
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("NOT FOUND"); 
        }

        // Ensure the user owns this note
        if (note.user.toString() !== req.user.id) {
            return res.status(403).send("NOT ALLOWED");
        }

        // delete the note
        note = await Note.findByIdAndDelete(req.params.id);

        // Send the deleted note as response
        res.json({"message":"Sucessfully deleted the note"});

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
});


module.exports = router;
