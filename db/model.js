
const mongoose = require('mongoose');

const card_schema = new mongoose.Schema({
    name: { type: String, required: true },
    job_title: { type: String, default: null },
    company: { type: String, default: null },
    email: {
        // INFO - not making email a required field
        type: String, default: null,
        //INFO: only validating email if provided otherwise default will be null
        validate: {
            validator: function (email) {
                const email_regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                if (email === null || email === '') {
                    return true; // Allowing null or empty value
                }
                return email_regex.test(email);
            },
            message: props => `${props.value} is not a valid email!`
        },
    },
    //INFO Not applying validation on phone
    phone: { type: String, default: null },
    address: { type: String, default: null },
    file: { type: mongoose.Types.ObjectId, refs: 'files' }
}, { timestamps: true });

const file_schema = new mongoose.Schema({
    name: { type: String, required: true },
    file: {
        data: Buffer,
        content_type: String
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60 * 60 * 24 * 7, // expires after 1 week
    },

});

const file_model = mongoose.model('file', file_schema);
const card_model = mongoose.model('card', card_schema);

module.exports = { card_model, file_model };