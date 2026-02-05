import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    title: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    },
    content: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    },

},
 {timestamps: true}
);

const Note = mongoose.model("Note", noteSchema)

export default Note;