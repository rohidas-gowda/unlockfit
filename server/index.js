const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const User = require('./models/user.model')
const Weight = require('./models/weight.model')
const dotenv = require('dotenv')

dotenv.config()

mongoose.connect(process.env.MONGO_URL)
app.use(cors())
app.use(express.json())

app.post('/api/login', async (req, res) => {

    const user = await User.findOne({
        email: req.body.email,
    })

    if(user) {
        return res.json({ status: 'ok', user: true, email: user.email, name: user.name })
    } else {
        return res.json({ status: 'error', user: false})
    }
});

app.post('/api/getCustomerData', async (req, res) => {
    const weight = await Weight.find({
        email: req.body.email
    })

    if(weight) {
        return res.json({ status: 'ok', weight_status: true, weight});
    } else {
        return res.json({ status: 'error', weight_status: false})
    }

});

app.post('/api/customerreport', async (req, res) => {
    try {
        const insertData = await Weight.insertMany({
            email: req.body.email,
            name: req.body.name,
            dailydate: req.body.date,
            idealweight: req.body.idealWeightKg,
            currentweight: req.body.currentWeightKg,
            inkg: req.body.kgPounds
        })
        
        res.json({ status: 'ok' })
    } catch (error) {
        res.json({ status: 'error', error: 'Duplicate Data' })
    }

    try {
        await Weight.updateMany({'email': req.body.email},
        {$set: {'inkg': req.body.kgPounds}},
        {multi: true})
    } catch(error) {

    }
});

app.listen(1337, () => {
    console.log('Server started on 1337')
})