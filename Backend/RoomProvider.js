// DAL

import mongoose from 'mongoose'
import 'dotenv/config'

console.log(process.env)
mongoose.connect("mongodb://127.0.0.1:27017")

const Schema = mongoose.Schema

const RoomSchema = new Schema({
    name: { type: String, required: true },
    hash: { type: String, required: true },
    owner: String,
    users: Array
})

var Room = mongoose.model('Room', RoomSchema)

// RoomProvider = function () { }

// method to interact with database

export default Room