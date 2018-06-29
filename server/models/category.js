const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let categorySchema = new Schema({

    name: {
        type: String,
        unique: true,
        required: [true, 'name is required']
    },
    description: {
        type: String,
        unique: true,
        required: [true, 'description is required']
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

});

module.exports = mongoose.model('Category', categorySchema);