const mongoose = require('mongoose')

const MassageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a name."],
        unique: true,
        trim: true,
        maxlength: [50, "name cannot be more than 50 characters."]
    },
    address: {
        type: String,
        required: [true, "Please add an address."]
    },
    district: {
        type: String,
        required: [true, "Please add a district."]
    },
    province: {
        type: String,
        required: [true, "Please add a province."]
    },
    tel: {
        type: String,
        required: [true, "Please add a tel"]
    }
});

module.exports = mongoose.model('Massage', MassageSchema);