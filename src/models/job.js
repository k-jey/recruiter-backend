const monggose = require('mongoose')
const validator = require('validator')

const jobSchema = new monggose.Schema({
    //test cosjbfdklsflaa;ga
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
//sdfghjksufsf
const Job = monggose.model('Job', jobSchema)

module.exports = Job