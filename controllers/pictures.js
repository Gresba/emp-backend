import Picture from "../models/picture.js"

export const getPictures = async (req, res) => {
  try {
    const pictures = await Picture.find();

    res.status(200).json(pictures);
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err.message })
  }
}

export const getPicture = async (req, res) => {
  try {
    const params = req.params;

    const id = params.id;

    const picture = await Picture.findById(id).populate("Comments");

    res.status(200).json(picture);
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err.message })
  }
}
