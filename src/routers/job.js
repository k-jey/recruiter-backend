const express = require('express')
const Job = require('../models/job')
const auth = require('../middleware/auth')
const adminAuth = require('../middleware/adminAuth')
const router = new express.Router()

router.post('/jobs', adminAuth, async (req, res) => {
    const job = new Job({
        ...req.body,
        owner: req.user._id
    })

    try{
        await job.save()
        res.status(201).send(job)
    }catch (e){
        res.status(400).send(e)
    }
})

router.get('/jobs/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const job = await Job.findOne({ _id })

        if(!job){
            return res.status(404).send()
        }
        res.send(job)
    } catch (e){
        res.status(500).send()
    }
})

router.get('/jobsAll', async (req, res) => {
    
    try {
        const job = await Job.find({ })
        
        if(!job){
            return res.status(404).send()
        }
        res.send(job)

    } catch (e){
        res.status(500).send
    }
})

router.patch('/jobs/:id', adminAuth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidUpdate){
        return res.status(400).send({error: 'Not Valid Update'})
    }
    
    try{
        const job = await Job.findOne({ _id: req.params.id, owner: req.user._id})

        if (!job){
            return res.status(404).send()
        }

        updates.forEach((update) => job[update] = req.body[update])
        await job.save()
        res.send(job)

    } catch (e){
        res.status(400).send(e)
    }
})

router.delete('/jobs/:id', adminAuth, async (req, res) => {
    try{
        const job = await Job.findOneAndDelete({_id: req.params.id, owner: req.user._id})

        if (!job){
            return res.status(404).send()
        }

        res.send(job)
    }catch(e){
        res.status(500).status(e)
    }
})

module.exports = router