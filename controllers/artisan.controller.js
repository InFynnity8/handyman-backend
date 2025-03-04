import Artisan from '../models/artisan.model.js';

const registerArtisan = async (req, res) => {
  try {
    const { username, password , email } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Enter email or password'});
    }


    const artisan = await  Artisan.create({
      username: username,
      password: password,
      email: email
    });

    res.status(200).json({
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
    const artisans = await  Artisan.find();

    if (!artisans) {
      return res.status(404).json({ message: 'there are no artisan' })
    }

    res.status(200).json({
      artisans: artisans
    });
  } catch (error) {
    console.log(`Error:\n${error}`);
	  return res.status(500).json({ message: 'internal server error' });
  }
};
  
const getArtisan = async (req, res) => {
  try {
    const { artisanId } = req.params;
    console.log(req.params);
    const artisan = await Artisan.findById(artisanId);

    if (!artisan) {
      return res.status(404).json({ message: 'Artisan not found' });
    }

    res.status(200).json({
      ArtisanBody: artisan
    });
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
      return res.status(400).json({ message: 'Artisan Id must be specified as a parameter' });
    }

    const artisan = await  Artisan.findByIdAndUpdate(artisanId,  updateData, { new: true });

    if (!artisan) {
      return res.status(404).json({ message: 'Artisan not found' });
    }

    res.status(200).json({
      message: 'Artisan updated successfully',
      ArtisanBody: artisan
    });
  } catch (error) {
    console.log(`Error:\n${error}`);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
  
const deleteArtisan = async (req, res) => {
  try {
    const { artisanId } = req.params;

    if (!artisanId) {
      return res.status(400).json({ message: 'Artisan Id must be specified as a parameter' });
    }

    const artisan = await  Artisan.findByIdAndDelete(artisanId);

    if (!artisan) {
      return res.status(404).json({ message: 'Artisan not found' });
    }

    res.status(200).json({ message: 'Artisan deleted' });
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