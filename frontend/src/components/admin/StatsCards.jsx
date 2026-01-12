// src/components/admin/StatsCards.jsx
import React from 'react';
import './DashboardCharts.css';

const StatsCards = ({ stats }) => {
  return (
    <div className="stats-cards-grid">
      <div className="stat-card card-1">
        <div className="stat-icon">👥</div>
        <div className="stat-content">
          <h3>Total Users</h3>
          <p className="stat-value">{stats?.totalUsers || 0}</p>
        </div>
      </div>
      
      <div className="stat-card card-2">
        <div className="stat-icon">📊</div>
        <div className="stat-content">
          <h3>Total Bookings</h3>
          <p className="stat-value">{stats?.totalBookings || 0}</p>
        </div>
      </div>
      
      <div className="stat-card card-3">
        <div className="stat-icon">💰</div>
        <div className="stat-content">
          <h3>Total Revenue</h3>
          <p className="stat-value">${stats?.totalRevenue || 0}</p>
        </div>
      </div>
      
      <div className="stat-card card-4">
        <div className="stat-icon">🏪</div>
        <div className="stat-content">
          <h3>Active Listings</h3>
          <p className="stat-value">{stats?.approvedListings || 0}</p>
        </div>
      </div>
    </div>
  );
};

export default StatsCards;