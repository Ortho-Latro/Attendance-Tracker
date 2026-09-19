import mongoose from 'mongoose';

const daysRule = new mongoose.Schema({
    days:[{
        type: String,
        enum: ['Friday', 'Saturday', 'Sunday'],
    }],

    
})