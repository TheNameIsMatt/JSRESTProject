const mongoose = require('mongoose');

//This is where we'll store the schema for the post schema/model are use interchagible

const PostSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Posts', PostSchema, "MySchemaName");