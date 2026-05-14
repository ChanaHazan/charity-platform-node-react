const Donation = require('../models/Donation');
const Fundraiser = require('../models/Fundraiser');

exports.createDonation = async (req, res) => {
  const { fundraiserId, amount, donorName, message } = req.body;

  if (!fundraiserId || !amount || !donorName) {
    return res.status(400).json({ message: 'Missing required fields: fundraiserId, amount, donorName' });
  }

  try {
    const fundraiser = await Fundraiser.findById(fundraiserId);
    if (!fundraiser) {
      return res.status(404).json({ message: 'Fundraiser not found' });
    }

    const donation = await Donation.create({ fundraiserId, amount, donorName, message });
    res.status(201).json(donation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllDonations = async (req, res) => {
  try {
    const donations = await Donation.find().populate('fundraiserId', 'name target groupId');
    res.json(donations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getDonationById = async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id).populate('fundraiserId', 'name target groupId');
    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }
    res.json(donation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCampaignStats = async (req, res) => {
  try {
    const result = await Donation.aggregate([
      { $group: { _id: null, totalRaised: { $sum: "$amount" } } }
    ]);
    const total = result.length > 0 ? result[0].totalRaised : 0;
    res.status(200).json({ totalRaised: total , goal: 1000000, percentage: total / 10000 * 100 });
  }
  catch (error) {
    res.status(500).json({ message: "שגיאה בחישוב נתוני הקמפיין", error: error.message });
  }
}
