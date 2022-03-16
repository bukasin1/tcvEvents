const Events = require("../models/event.model")
const eventSchema = require("../utils/validation").eventSchema

exports.addEvent = async(req, res) => {
    try{
        const validation = eventSchema.validate(req.body)
        if (validation.error) {
            res.status(404).send({
                error_message: validation.error.details[0].message
            })
            return;
        }
        const event = await Events.findOne(req.body)
        if(event){
            res.status(401).send({
                error_message: "Event created already"
            })
            return;
        }
        await Events.create(req.body)
        res.status(201).send({
            message: "Event successfully created"
        })
    }catch(error){
        console.log(error, "error")
        res.status(404).send({
            error_message: "An error occured!",
            error
        })
    }
}

exports.discoverEvents = async(req, res) => {
    try{
        console.log(req.user)
        const interests = req.user.interests.split(',')
        console.log(interests)
        const events = interests.map(async(interest) => {
            console.log(interest, "interest")
            const filtered = await Events.find({category: interest})
            return filtered
        })
        console.log((await Promise.all(events)).flat())
        res.status(201).send({
            events: (await Promise.all(events)).flat()
        })

    }catch(error){
        console.log(error, "error")
        res.status(404).send({
            error_message: "An error occured!",
            error
        })
    }
}