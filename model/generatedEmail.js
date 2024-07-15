import mongoose from 'mongoose';

const generatedEmailSchema = new mongoose.Schema({
    prompt: {
        type: String,
        required: true
    },
    emailContent: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const GeneratedEmail = mongoose.model('GeneratedEmail', generatedEmailSchema);

export default GeneratedEmail;
