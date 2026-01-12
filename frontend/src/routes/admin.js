// routes/admin.js
const express = require('express')
const router = express.Router()
const User = require('../models/User')
const Listing = require('../models/Listing')
const Booking = require('../models/Booking')
const Review = require('../models/Review')

// Get all providers
router.get('/providers', async (req, res) => {
  try {
    const providers = await User.find({ role: 'provider' })
      .select('username email phone location createdAt')
      .sort({ createdAt: -1 })
    
    // Get stats for each provider
    const providersWithStats = await Promise.all(
      providers.map(async (provider) => {
        const [listings, bookings] = await Promise.all([
          Listing.countDocuments({ userId: provider._id }),
          Booking.countDocuments({ providerId: provider._id })
        ])
        
        return {
          id: provider._id,
          username: provider.username,
          email: provider.email,
          phone: provider.phone,
          location: provider.location,
          createdAt: provider.createdAt,
          totalListings: listings,
          totalBookings: bookings
        }
      })
    )
    
    res.json(providersWithStats)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch providers' })
  }
})

// Get provider stats
router.get('/providers/:id/stats', async (req, res) => {
  try {
    const providerId = req.params.id
    
    const [listings, bookings, reviews] = await Promise.all([
      Listing.find({ userId: providerId }),
      Booking.find({ providerId }),
      Review.find({ providerId })
    ])
    
    const completedBookings = bookings.filter(b => b.status === 'completed').length
    const totalRevenue = bookings
      .filter(b => b.status === 'completed')
      .reduce((sum, booking) => sum + (booking.totalPrice || 0), 0)
    
    const avgRating = reviews.length > 0 
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : 0
    
    res.json({
      totalListings: listings.length,
      totalBookings: bookings.length,
      completedBookings,
      pendingBookings: bookings.filter(b => b.status === 'pending').length,
      avgRating,
      totalRevenue,
      responseRate: bookings.length > 0 
        ? Math.round((completedBookings / bookings.length) * 100)
        : 0
    })
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch provider stats' })
  }
})

// Get provider reviews
router.get('/providers/:id/reviews', async (req, res) => {
  try {
    const reviews = await Review.find({ providerId: req.params.id })
      .populate('userId', 'username')
      .sort({ createdAt: -1 })
    
    const formattedReviews = reviews.map(review => ({
      id: review._id,
      userName: review.userId?.username || 'Customer',
      rating: review.rating,
      comment: review.comment,
      createdAt: review.createdAt
    }))
    
    res.json(formattedReviews)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch reviews' })
  }
})

module.exports = router