const router = require("express").Router();
const pin = require("../model/pin");

//create a pin
router.post("/", async (req, res) => {
  const newPin = new pin({
    username: req.body.username,
    title: req.body.title,
    desc: req.body.desc,
    rating: req.body.rating,
    long: req.body.long,
    lat: req.body.lat,
  });

  try {
    const savedPin = await newPin.save();
    res.status(200).json(savedPin);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all pins

router.get("/", async (req, res) => {
  try {
    const pins = await pin.find();
    res.status(200).json(pins);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
