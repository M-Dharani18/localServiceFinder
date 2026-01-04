import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Star, 
  MessageSquare, 
  Calendar,
  Award,
  TrendingUp,
  BarChart3,
  CheckCircle,
  Edit,
  Save,
  X,
  BookOpen,
  Clock,
  CheckCircle2,
  XCircle,
  Percent
} from 'lucide-react';
import reviewAPI from '@/api/reviews';
import { getCustomerBookingsApi } from '@/api/bookings';
import { toast } from 'react-toastify';

const CustomerProfile = () => {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [reviewStats, setReviewStats] = useState({
    totalReviews: 0,
    averageRating: 0,
    ratingDistribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
    recentReviews: []
  });
  const [bookingsStats, setBookingsStats] = useState({
    total: 0,
    completed: 0,
    upcoming: 0,
    cancelled: 0,
    pending: 0
  });
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    bio: ''
  });

  useEffect(() => {
    if (user) {
      loadProfileData();
      loadReviews();
      loadBookingsStats();
    }
  }, [user]);

  const loadProfileData = () => {
    setProfileData({
      fullName: user.fullName || user.username || '',
      email: user.email || '',
      phone: user.phone || '',
      address: user.address || '',
      bio: user.bio || 'Tell us about yourself...'
    });
  };

  const loadReviews = async () => {
  try {
    // CORRECTED: Use reviewAPI.getCustomerReviews instead of getCustomerReviews
    const customerReviews = await reviewAPI.getCustomerReviews(user.id);
    setReviews(customerReviews || []);
    
    if (customerReviews && customerReviews.length > 0) {
      const totalReviews = customerReviews.length;
      const totalRating = customerReviews.reduce((sum, review) => sum + review.rating, 0);
      const averageRating = totalRating / totalReviews;
      
      const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
      customerReviews.forEach(review => {
        const rating = Math.round(review.rating);
        if (distribution[rating] !== undefined) {
          distribution[rating]++;
        }
      });

      const recentReviews = [...customerReviews]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 3);

      setReviewStats({
        totalReviews,
        averageRating,
        ratingDistribution: distribution,
        recentReviews
      });
    }
  } catch (error) {
    console.error('Failed to load reviews:', error);
    toast.error('Failed to load review statistics');
  }
};

  const loadBookingsStats = async () => {
    try {
      const bookings = await getCustomerBookingsApi(user.id);
      const total = bookings.length || 0;
      const completed = bookings.filter(b => b.status === 'COMPLETED').length;
      const upcoming = bookings.filter(b => 
        b.status === 'CONFIRMED' && new Date(b.bookingDateTime) > new Date()
      ).length;
      const cancelled = bookings.filter(b => b.status === 'CANCELLED').length;
      const pending = bookings.filter(b => b.status === 'PENDING').length;

      setBookingsStats({ total, completed, upcoming, cancelled, pending });
    } catch (error) {
      console.error('Failed to load booking stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = async () => {
    try {
      await updateProfile(profileData);
      toast.success('Profile updated successfully!');
      setEditing(false);
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  const renderStars = (rating, size = 16) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={size}
            className={
              star <= Math.round(rating)
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            }
          />
        ))}
      </div>
    );
  };

  const getRatingPercentage = (rating) => {
    const total = reviewStats.totalReviews;
    if (total === 0) return 0;
    return Math.round((reviewStats.ratingDistribution[rating] / total) * 100);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-fuchsia-50 pt-16">
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-fuchsia-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header - Compact */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                My Profile
              </h1>
              <p className="text-sm text-gray-600 mt-1">Manage your account and review your activity</p>
            </div>
            <button
              onClick={() => setEditing(!editing)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white font-medium rounded-lg hover:shadow-lg transition-all"
            >
              {editing ? (
                <>
                  <X size={16} />
                  Cancel
                </>
              ) : (
                <>
                  <Edit size={16} />
                  Edit Profile
                </>
              )}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Information Card */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100">
              <div className="p-6">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                    {user?.fullName?.charAt(0) || user?.username?.charAt(0) || 'U'}
                  </div>
                  <div className="flex-1">
                    {editing ? (
                      <input
                        type="text"
                        name="fullName"
                        value={profileData.fullName}
                        onChange={handleInputChange}
                        className="text-xl font-bold text-gray-800 border-b-2 border-purple-300 focus:outline-none focus:border-purple-500 w-full mb-2"
                        placeholder="Your name"
                      />
                    ) : (
                      <h2 className="text-xl font-bold text-gray-800 mb-2">{profileData.fullName}</h2>
                    )}
                    <div className="flex items-center gap-2 text-gray-600">
                      <Mail size={14} />
                      {editing ? (
                        <input
                          type="email"
                          name="email"
                          value={profileData.email}
                          onChange={handleInputChange}
                          className="border-b-2 border-purple-300 focus:outline-none focus:border-purple-500 flex-1"
                        />
                      ) : (
                        <span className="text-sm">{profileData.email}</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Contact Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-500 flex items-center gap-2">
                      <Phone size={12} />
                      Phone
                    </label>
                    {editing ? (
                      <input
                        type="text"
                        name="phone"
                        value={profileData.phone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter phone number"
                      />
                    ) : (
                      <p className="text-sm text-gray-800">{profileData.phone || 'Not provided'}</p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-gray-500 flex items-center gap-2">
                      <MapPin size={12} />
                      Address
                    </label>
                    {editing ? (
                      <input
                        type="text"
                        name="address"
                        value={profileData.address}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Enter address"
                      />
                    ) : (
                      <p className="text-sm text-gray-800">{profileData.address || 'Not provided'}</p>
                    )}
                  </div>
                </div>

                {/* Bio Section */}
                <div className="mb-4">
                  <label className="text-xs font-medium text-gray-500 mb-2 block">About Me</label>
                  {editing ? (
                    <textarea
                      name="bio"
                      value={profileData.bio}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Tell us about yourself..."
                    />
                  ) : (
                    <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">{profileData.bio}</p>
                  )}
                </div>

                {/* Member Since */}
                <div className="flex items-center gap-2 text-xs text-gray-500 pt-4 border-t border-gray-100">
                  <Calendar size={12} />
                  <span>Member since {user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { 
                    month: 'short', 
                    year: 'numeric' 
                  }) : 'Recently'}</span>
                </div>

                {editing && (
                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <button
                      onClick={handleSaveProfile}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-green-500 text-white font-medium rounded-lg hover:shadow-lg transition-all"
                    >
                      <Save size={16} />
                      Save Changes
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Recent Reviews Card */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <MessageSquare size={18} className="text-purple-600" />
                    Recent Reviews
                  </h3>
                  {reviewStats.recentReviews.length > 0 && (
                    <button
                      onClick={() => navigate('/customer/bookings')}
                      className="text-sm text-purple-600 hover:text-purple-700 font-medium"
                    >
                      View All →
                    </button>
                  )}
                </div>

                {reviewStats.recentReviews.length === 0 ? (
                  <div className="text-center py-8">
                    <MessageSquare size={32} className="mx-auto text-gray-300 mb-3" />
                    <p className="text-gray-500 text-sm">No reviews yet</p>
                    <p className="text-xs text-gray-400 mt-1">Complete a booking to leave your first review</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {reviewStats.recentReviews.map((review) => (
                      <div key={review.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2 mb-2">
                            {renderStars(review.rating)}
                            <span className="text-sm font-semibold text-gray-800">
                              {review.rating.toFixed(1)}/5
                            </span>
                          </div>
                          <span className="text-xs text-gray-500">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        {review.comment && (
                          <p className="text-sm text-gray-700 mt-2">{review.comment}</p>
                        )}
                        <div className="mt-3 pt-3 border-t border-gray-100">
                          <p className="text-xs text-gray-600">
                            Service: <span className="font-medium">{review.serviceName}</span>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Stats */}
          <div className="space-y-6">
            {/* Review Statistics Card */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Award size={18} className="text-purple-600" />
                  Review Stats
                </h3>

                {/* Average Rating */}
                <div className="text-center mb-6">
                  <div className="flex items-baseline justify-center gap-1 mb-2">
                    <span className="text-3xl font-bold text-gray-800">
                      {reviewStats.averageRating.toFixed(1)}
                    </span>
                    <span className="text-lg text-gray-500">/5</span>
                  </div>
                  <div className="flex justify-center mb-2">
                    {renderStars(reviewStats.averageRating, 20)}
                  </div>
                  <p className="text-sm text-gray-600">
                    {reviewStats.totalReviews} {reviewStats.totalReviews === 1 ? 'review' : 'reviews'}
                  </p>
                </div>

                {/* Rating Distribution */}
                <div className="space-y-2 mb-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Rating Breakdown</h4>
                  {[5, 4, 3, 2, 1].map((rating) => {
                    const percentage = getRatingPercentage(rating);
                    return (
                      <div key={rating} className="flex items-center gap-3">
                        <div className="flex items-center gap-1 w-10">
                          <span className="text-sm font-medium text-gray-700">{rating}</span>
                          <Star size={12} className="fill-yellow-400 text-yellow-400" />
                        </div>
                        <div className="flex-1">
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                        <span className="text-xs text-gray-600 w-12 text-right">
                          {percentage}%
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Satisfaction Rate */}
                <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-3 rounded-lg border border-emerald-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-emerald-600" />
                      <span className="text-sm font-medium text-gray-700">Satisfaction</span>
                    </div>
                    <span className="text-xl font-bold text-emerald-700">
                      {reviewStats.totalReviews > 0 
                        ? `${Math.round((reviewStats.ratingDistribution[5] + reviewStats.ratingDistribution[4]) / reviewStats.totalReviews * 100)}%`
                        : '0%'
                      }
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    4-5 star ratings
                  </p>
                </div>
              </div>
            </div>

            {/* Booking Statistics Card */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <TrendingUp size={18} className="text-purple-600" />
                  Booking Stats
                </h3>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <BookOpen size={14} className="text-gray-600" />
                      <span className="text-xs font-medium text-gray-600">Total</span>
                    </div>
                    <p className="text-xl font-bold text-gray-800">{bookingsStats.total}</p>
                  </div>
                  
                  <div className="bg-emerald-50 p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle2 size={14} className="text-emerald-600" />
                      <span className="text-xs font-medium text-emerald-700">Completed</span>
                    </div>
                    <p className="text-xl font-bold text-emerald-800">{bookingsStats.completed}</p>
                  </div>
                  
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock size={14} className="text-blue-600" />
                      <span className="text-xs font-medium text-blue-700">Upcoming</span>
                    </div>
                    <p className="text-xl font-bold text-blue-800">{bookingsStats.upcoming}</p>
                  </div>
                  
                  <div className="bg-amber-50 p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock size={14} className="text-amber-600" />
                      <span className="text-xs font-medium text-amber-700">Pending</span>
                    </div>
                    <p className="text-xl font-bold text-amber-800">{bookingsStats.pending}</p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Cancelled</span>
                    <span className="text-lg font-bold text-rose-700">{bookingsStats.cancelled}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contribution Card */}
            <div className="bg-gradient-to-br from-purple-600 to-fuchsia-600 rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Your Contribution</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageSquare size={14} className="text-purple-200" />
                    <span className="text-purple-100">Reviews Written</span>
                  </div>
                  <span className="text-lg font-bold text-white">{reviewStats.totalReviews}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star size={14} className="text-purple-200" />
                    <span className="text-purple-100">Services Rated</span>
                  </div>
                  <span className="text-lg font-bold text-white">
                    {[...new Set(reviews.map(r => r.listingId))].length}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle size={14} className="text-purple-200" />
                    <span className="text-purple-100">Helpful Reviews</span>
                  </div>
                  <span className="text-lg font-bold text-white">
                    {reviewStats.ratingDistribution[5] + reviewStats.ratingDistribution[4]}
                  </span>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-purple-500/30">
                <p className="text-xs text-purple-200 text-center">
                  Thanks for helping our community! ✨
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;