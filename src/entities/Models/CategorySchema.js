import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null },
    children: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }]
}, { timestamps: true });

export const Category = mongoose.model('Category' , categorySchema)