const mongoose = require('mongoose');
const uuid = require('uuid');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
let stringId = ObjectId.toString();

const _idNew = uuid.v4();


const coachSchema = new Schema({
    name: String,
    specialty: String,
    monthlyPrice: String
});

const Gyms = new Schema({
    id: ObjectId,
    name: String,
    location: String,
    price: String,
    openTime: String,
    closeTime: String,
    coaches: [coachSchema]
});


var GymsModel = mongoose.model('Gyms', Gyms);

module.exports = GymsModel;