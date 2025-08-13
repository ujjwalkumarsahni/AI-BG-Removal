import axios from 'axios';
import fs from 'fs';
import FormData from 'form-data';
import userModel from '../models/userModel.js';

const removeBgImage = async (req, res) => {
  try {
    // const { clerkId } = req.body;
    const clerkId = req.clerkId;

    const user = await userModel.findOne({ clerkId });

    if (!user) {
      return res.json({ success: false, message: 'User not found' });
    }

    if (user.creditBalance === 0) {
      return res.json({ success: false, message: 'No credit balance', creditBalance: user.creditBalance });
    }

    const imagePath = req.file.path;

    const imageFile = fs.createReadStream(imagePath);
    const formdata = new FormData();
    formdata.append('image_file', imageFile);

    const { data } = await axios.post(
      'https://clipdrop-api.co/remove-background/v1',
      formdata,
      {
        headers: {
          'x-api-key': process.env.CLIPDROP_API,
          ...formdata.getHeaders(),
        },
        responseType: 'arraybuffer',
      }
    );

    // Convert binary to base64
    const base64Image = Buffer.from(data, 'binary').toString('base64');
    const resultImage = `data:${req.file.mimetype};base64,${base64Image}`;

    // Update user credits
    const updatedUser = await userModel.findByIdAndUpdate(
      user._id,
      { creditBalance: user.creditBalance - 1 },
      { new: true }
    );

    // Delete the uploaded file to clean up
    fs.unlinkSync(imagePath);

    res.json({
      success: true,
      resultImage,
      creditBalance: updatedUser.creditBalance,
      message: 'Background Removed',
    });

  } catch (error) {
    console.error('Error removing background:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

const removeText = async (req, res) => {
  try {
    // const { clerkId } = req.body;
    const clerkId = req.clerkId;

    const user = await userModel.findOne({ clerkId });

    if (!user) {
      return res.json({ success: false, message: 'User not found' });
    }

    if (user.creditBalance === 0) {
      return res.json({ success: false, message: 'No credit balance', creditBalance: user.creditBalance });
    }

    const imagePath = req.file.path;

    const imageFile = fs.createReadStream(imagePath);
    const formdata = new FormData();
    formdata.append('image_file', imageFile);

    const { data } = await axios.post(
      'https://clipdrop-api.co/remove-text/v1',
      formdata,
      {
        headers: {
          'x-api-key': process.env.CLIPDROP_API,
          ...formdata.getHeaders(),
        },
        responseType: 'arraybuffer',
      }
    );

    // Convert binary to base64
    const base64Image = Buffer.from(data, 'binary').toString('base64');
    const resultImage = `data:${req.file.mimetype};base64,${base64Image}`;

    // Update user credits
    const updatedUser = await userModel.findByIdAndUpdate(
      user._id,
      { creditBalance: user.creditBalance - 1 },
      { new: true }
    );

    // Delete the uploaded file to clean up
    fs.unlinkSync(imagePath);

    res.json({
      success: true,
      resultImage,
      creditBalance: updatedUser.creditBalance,
      message: 'Text Removed',
    });

  } catch (error) {
    console.error('Error removing text:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
const reimagine = async (req, res) => {
  try {
    // const { clerkId } = req.body;
    const clerkId = req.clerkId;

    const user = await userModel.findOne({ clerkId });

    if (!user) {
      return res.json({ success: false, message: 'User not found' });
    }

    if (user.creditBalance === 0) {
      return res.json({ success: false, message: 'No credit balance', creditBalance: user.creditBalance });
    }

    const imagePath = req.file.path;

    const imageFile = fs.createReadStream(imagePath);
    const formdata = new FormData();
    formdata.append('image_file', imageFile);

    const { data } = await axios.post(
      'https://clipdrop-api.co/reimagine/v1/reimagine',
      formdata,
      {
        headers: {
          'x-api-key': process.env.CLIPDROP_API,
          ...formdata.getHeaders(),
        },
        responseType: 'arraybuffer',
      }
    );

    // Convert binary to base64
    const base64Image = Buffer.from(data, 'binary').toString('base64');
    const resultImage = `data:${req.file.mimetype};base64,${base64Image}`;

    // Update user credits
    const updatedUser = await userModel.findByIdAndUpdate(
      user._id,
      { creditBalance: user.creditBalance - 1 },
      { new: true }
    );

    // Delete the uploaded file to clean up
    fs.unlinkSync(imagePath);

    res.json({
      success: true,
      resultImage,
      creditBalance: updatedUser.creditBalance,
      message: 'Reimagine',
    });

  } catch (error) {
    console.error('Error Reimagine:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};



export { removeBgImage,removeText ,reimagine};
