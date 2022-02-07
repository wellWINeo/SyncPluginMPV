import { Router } from 'express';
import Room from './RoomProvider.js';
import { v4 as uuidv4 } from 'uuid'

const router = Router()

router.post('/createRoom', async (req, res, next) => {
    // generate unique id
    var uuid = uuidv4()
    req.body.users = [uuid]
    req.body.owner = uuid

    // create room in MongoDB
    Room.create(req.body, (err, room) => {
        if (err) return next(err)
        res.json({
            roomId: room._id,
            uuid: uuid
        })
    })
})

router.get('/joinRoom/:id', async (req, res, next) => {
    if (!req.body.hash && !req.params.id) res.sendStatus(400)

    var uuid = uuidv4()

    const room = await Room.findById(req.params.id)
    if (!room) return res.json(400)

    room.users.push(uuid)

    await room.save()

    res.json({ uuid: uuid })
})



export default router