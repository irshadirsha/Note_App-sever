const express = require('express')

const router=express.Router()
const NoteController= require('../controller/NoteController')


router.post('/addNote',NoteController.AddNote)

router.get('/getNote',NoteController.GetNote)

router.get('/oneNote/:id',NoteController.OneNote);

router.patch('/updateNote/:id',NoteController.UpdateNote )

router.delete('/deleteNote/:id',NoteController.DeleteNote)


module.exports = router