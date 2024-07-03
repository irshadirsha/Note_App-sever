const Note= require('../Model/NoteModel')
require('dotenv').config();

const AddNote=async(req,res)=>{
    try {
        console.log(process.env.MONGO_URL)
        const newNote = new Note({
          title: req.body.title,
          content: req.body.content
        });
        const savedNote = await newNote.save();
        console.log(savedNote)
        res.json({
            message:"Note saved succesfully",
            savedNote});
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
}

const GetNote=async(req,res)=>{
    try {
        const notes = await Note.find();
        console.log(notes)
        res.json(notes);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
}
const OneNote=async(req,res)=>{
    try {
        console.log("API called oneNote");
        const id = req.params.id.trim();
        console.log(id);
        const note = await Note.findById(id);
        if (!note) return res.status(404).json({ message: 'Note not found' });
        res.json(note);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const UpdateNote=async(req,res)=>{
    try {
        console.log(req.params.id, req.body)
        const id = req.params.id.trim(); 
        const updatedNote = await Note.findByIdAndUpdate(id, req.body, { new: true });
        if (updatedNote) {
          res.json({
            message:"Note updated successfully",
            updatedNote});
        } else {
          res.status(404).json({ message: 'Note not found' });
        }
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
}

const DeleteNote=async(req,res)=>{
    try {const id = req.params.id.trim()
        const deletedNote = await Note.findByIdAndDelete(id);
        if (deletedNote) {
          res.json({ message: 'Note deleted' });
        } else {
          res.status(404).json({ message: 'Note not found' });
        }
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
}
module.exports={AddNote,GetNote,OneNote,UpdateNote,DeleteNote}
