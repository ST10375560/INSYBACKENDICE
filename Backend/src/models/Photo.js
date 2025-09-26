import mongoose from 'mongoose';

const photoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, match: [/^[^<>]+$/, 'Title cannot contain <> characters.'] },
    description: { type: String, trim: true, match: [/^[^<>]+$/, 'Description cannot contain <> characters.'] },
    imageUrl: { type: String, required: true },
    cloudinaryId: { type: String, required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

const Photo = mongoose.model('Photo', photoSchema);
export default Photo;
