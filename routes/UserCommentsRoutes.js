import express from "express";
import Usercomments from '../models/Comments.js'

const UserRoute = express.Router()


//ROTTA PER TROVARE I COMMENTI
UserRoute.get('/', async (req, res) => {
  try {
    const comments = await Usercomments.find({})
    res.json(comments)
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

//ROTTA PER UN SINGOLO COMMENTO
UserRoute.get('/:id', async (req, res) => {
  try {
    const comment = await Usercomments.findById(req.params.id)
    res.json(comment)
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

//ROTTA PER AGGIUNGERE UN COMMENTO
UserRoute.post('/', async (req, res) => {
  const newComment = new Usercomments(req.body)
  try {
    const newCommentSave = await newComment.save()
    res.status(201).json(newCommentSave)
  } catch (error) {
    res.status(400).json({message:error.message})
  }
})

//ROTTA PER ELIMINARE UN COMMENTO
UserRoute.delete('/:id', async(req, res) => {
  try {
    await Usercomments.findByIdAndDelete(req.params.id)
    res.json({message: 'Utente eliminato'})
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

export default UserRoute
