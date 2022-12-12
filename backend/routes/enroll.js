const express = require('express');
const router = express.Router();
const Enroll = require('../models/Enroll');
var fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');


// ROUTE 1
// adding new tasks

router.post('/newenroll', fetchuser, [
    body('', 'Enter a payment ID of lenght > 4').isLength({ min: 4 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { paymentID, batch } = req.body;
        const xmas95 = new Date();
        let month = xmas95.getMonth();
        const options = { month: "long" };
        month = new Intl.DateTimeFormat("en-US", options).format(xmas95);
        let year = new Date().getFullYear();
        if (paymentID == "11111") {
            const entry = new Enroll({ paymentID, batch, month: month, year: year, user: req.user.id, date: req.body.date });
            const savedEntry = await entry.save();
            res.json(savedEntry);
        }
        else {

            res.status(500).send("payment failed");
        }

    } catch (error) {
        console.log(error);
        res.status(500).send("Some error occured");
    }
})





// ROUTE 2
// fetching all tasks of user

router.get('/fetchallenroll', fetchuser, async (req, res) => {
    try {
        const enroll = await Enroll.find({ user: req.user.id });
        res.json(enroll);
    } catch (error) {
        console.log(error);
        res.status(500).send("Some error occured");
    }
})





// ROUTE 3
// updating tasks

router.put('/updatetasks/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    const newTask = {};
    if (title) {
        newTask.title = title;
    }
    if (description) {
        newTask.description = description;
    }
    if (tag) {
        newTask.tag = tag;
    }
    try {
        let task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).send("Tasks not Found");
        }
        if (task.user.toString() != req.user.id) {
            return res.status(404).send("Not allowed");
        }
        task = await Task.findByIdAndUpdate(req.params.id, { $set: newTask }, { new: true });
        res.json({ task });
    } catch (error) {
        console.log(error);
        res.status(500).send("Some error occured");
    }
})





// ROUTE 4
// deleting task

router.delete('/deletetasks/:id', fetchuser, async (req, res) => {
    try {
        let task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).send("Not Found");
        }
        if (task.user.toString() != req.user.id) {
            return res.status(404).send("Not allowed");
        }
        task = await Task.findByIdAndDelete(req.params.id);
        res.json({ "Success": "task deleted", task: task });
    } catch (error) {
        console.log(error);
        res.status(500).send("Some error occured");
    }
})


module.exports = router