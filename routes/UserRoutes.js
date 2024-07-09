import express from 'express'
import User from '../models/User.js'

const router = express.Router()

//ROTTA PER MOSTRARE GLI UTENTI NEL DB
router.get('/', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const skip = (page - 1) * limit;

    try {
        const users = await User.find({}).skip(skip).limit(limit);
        const totalUsers = await User.countDocuments();
        const totalPages = Math.ceil(totalUsers/limit);

        res.json({
            users,
            totalUsers,
            totalPages,
            currentPage: page
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

    

//ROTTA PER UN SINGOLO UTENTE NEL DB
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if(!user) {
            return res.status(404).json({ message: 'utente non trovato'})
        } 
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//ROTTA PER CREARE UN UTENTE 
router.post('/', async (req, res) => {
    const user = new User(req.body)
    try {
        const newUser = await user.save()
        res.status(201).json(newUser)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})


//ROTTA PER AGGIORNARE UN UTENTE
router.patch('/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        })
        res.json(updatedUser)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

//ROTTA PER ELIMINARE UN UTENTE 
router.delete('/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.json({ message: 'Utente eliminato'})
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

export default router