import Artisan from '../models/artisan.model.js';

const registerArtisan = async (req, res) => {
  try {
    const { username, password, email, artisanName, description, service, rate, workingDays, workingHours, phoneNumber, location, profilePicture } = req.body;
    
    if (!email || !password || !artisanName || !service || !phoneNumber) {
      return res.status(400).json({ message: 'Required fields are missing' });
    }

    const artisan = await Artisan.create({
      username,
      password,
      email,
      artisanName,
      description,
      service,
      rate,
      workingDays,
      workingHours,
      phoneNumber,
      location,
      profilePicture,
      ratings: { average: 0, reviews: [] }
    });

    res.status(201).json({
      success: true,
      message: 'Account created!',
      artisanUsername: username,
    });
  } catch (error) {
    console.log(`Error:\n${error}`);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const getAllArtisans = async (req, res) => {
  try {
    const artisans = await Artisan.find();

    if (!artisans.length) {
      return res.status(404).json({ message: 'No artisans found' });
    }

    res.status(200).json({ artisans });
  } catch (error) {
    console.log(`Error:\n${error}`);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const getArtisan = async (req, res) => {
  try {
    const { artisanId } = req.params;
    const artisan = await Artisan.findById(artisanId);

    if (!artisan) {
      return res.status(404).json({ message: 'Artisan not found' });
    }

    res.status(200).json({ artisan });
  } catch (error) {
    console.log(`Error:\n${error}`);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const updateArtisan = async (req, res) => {
  try {
    const { artisanId } = req.params;
    const updateData = req.body;
    if (!artisanId) {
      return res.status(400).json({ message: 'Artisan ID is required' });
    }

    const artisan = await Artisan.findByIdAndUpdate(artisanId, updateData, { new: true });

    if (!artisan) {
      return res.status(404).json({ message: 'Artisan not found' });
    }

    res.status(200).json({ message: 'Artisan updated successfully', artisan });
  } catch (error) {
    console.log(`Error:\n${error}`);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteArtisan = async (req, res) => {
  try {
    const { artisanId } = req.params;
    if (!artisanId) {
      return res.status(400).json({ message: 'Artisan ID is required' });
    }

    const artisan = await Artisan.findByIdAndDelete(artisanId);

    if (!artisan) {
      return res.status(404).json({ message: 'Artisan not found' });
    }

    res.status(200).json({ message: 'Artisan deleted successfully' });
  } catch (error) {
    console.log(`Error:\n${error}`);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export default {
  registerArtisan,
  getAllArtisans,
  getArtisan,
  updateArtisan,
  deleteArtisan,
};
