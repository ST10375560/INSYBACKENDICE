import { error } from "console";
import Photo from "../models/Photo.js";
import cloudinary from "../utils/cloudinary.js";
import stream from 'stream';

const streamUpload = (buffer) => {
  return new Promise((resolve, reject) => {
    const bufferStream = new stream.PassThrough();
    bufferStream.end(buffer);

    const uploadStream = cloudinary.uploader.upload_stream(
    { resource_type: 'image', folder: 'securephot'},
    (error, result) => {
        if (result) {
            resolve(result);
        } else {
            reject(error);
        }
    });

    bufferStream.pipe(uploadStream);
});
};
const createPhoto = async (req, res) => {
    try {
        const { title, description} = req.body;
        if (!title || !req.file) {
            return res.status(400).json({ message: 'Title and image are required' });
        }

        const result = await streamUpload(req.file.buffer);

        const photo = new Photo({
            title,
            description,
            imageUrl: result.secure_url,
            cloudinaryId: result.public_id,
            owner: req.user.id,
        });

        await photo.save();
        res.status(201).json(photo);
    } catch (error) {
        res.status(500).json({ message: error.message || 'Server error' });
    }
};

const updatePhoto = async (req, res) => {
    try {
        const photo = await Photo.findById(req.params.id);
        if (!photo) {
            return res.status(404).json({ message: 'Photo not found' });
        }
        if (photo.owner.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized' });
        }

        const { title, description } = req.body;
        photo.title = title || photo.title;
        photo.description = description || photo.description;

        if (req.file) {
            const result = await streamUpload(req.file.buffer);
            photo.imageUrl = result.secure_url;
            photo.cloudinaryId = result.public_id;
        }

        await photo.save();
        res.status(200).json(photo);
    } catch (error) {
        res.status(500).json({ message: error.message || 'Server error' });
    }
};

const deletePhoto = async (req, res) => {
    try {
        const photo = await Photo.findById(req.params.id);
        if (!photo) {
            return res.status(404).json({ message: 'Photo not found' });
        }
        if (photo.owner.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized' });
        }

        await cloudinary.uploader.destroy(photo.cloudinaryId);
        await photo.remove();
        res.status(200).json({ message: 'Photo deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message || 'Server error' });
    }
};

const getPhotoById = async (req, res) => {
    try {
        const photo = await Photo.findById(req.params.id).populate('owner', 'username email');
        if (!photo) {
            return res.status(404).json({ message: 'Photo not found' });
        }   
        if(photo.owner.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized' });
        }
        res.status(200).json(photo);
    } catch (error) {
        res.status(500).json({ message: error.message || 'Server error' });
    }
};

// The following two handlers were referenced by routes but not implemented in source.
const getPhotos = async (req, res) => {
    try {
        const photos = await Photo.find({ owner: req.user.id });
        res.status(200).json(photos);
    } catch (error) {
        res.status(500).json({ message: error.message || 'Server error' });
    }
};

const getAllPhotos = async (_req, res) => {
    try {
        const photos = await Photo.find();
        res.status(200).json(photos);
    } catch (error) {
        res.status(500).json({ message: error.message || 'Server error' });
    }
};

export default {
    createPhoto,
    getPhotos,
    getPhotoById,
    updatePhoto,
    deletePhoto,
    getAllPhotos,
};
