const express = require('express');
const router = express.Router();
const {
  createDonation,
  getAllDonations,
  getDonationById,
  getCampaignStats
} = require('../controllers/donationController');

router.get('/stats', getCampaignStats);
router.post('/', createDonation);
router.get('/', getAllDonations);
router.get('/:id', getDonationById);

module.exports = router;
