const express = require('express');
const router = express.Router();
const {
  createDonation,
  getAllDonations,
  getDonationById,
  getCampaignStats
} = require('../controllers/donationController');

router.post('/', createDonation);
router.get('/', getAllDonations);
router.get('/:id', getDonationById);
router.get('/stats', getCampaignStats);

module.exports = router;
