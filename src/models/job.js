const monggose = require('mongoose')
const validator = require('validator')

const jobSchema = new monggose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    status:{
        type: Boolean,
        default: 'true'
    },
    owner: {
        type: monggose.SchemaTypes.ObjectId,
        require: true,
        ref: 'User'
    }
}, {
    timestamps: true
})

const Job = monggose.model('Job', jobSchema)

module.exports = Job