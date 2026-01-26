// import api from './axios';

// export const customerProfileAPI = {
//   // Get customer profile
//   getProfile: async (customerId) => {
//     try {
//       const response = await api.get(`/customer/profile/${customerId}`);
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching customer profile:', error);
//       if (error.response?.status === 404) {
//         return null; // Profile not created yet
//       }
//       throw error;
//     }
//   },

//   // Save/update customer profile
//   saveProfile: async (profileData) => {
//     try {
//       const response = await api.post('/customer/profile/save', profileData);
//       return response.data;
//     } catch (error) {
//       console.error('Error saving customer profile:', error);
//       throw error;
//     }
//   },

//   // Update customer profile
//   updateProfile: async (customerId, profileData) => {
//     try {
//       const response = await api.put(`/customer/profile/update/${customerId}`, profileData);
//       return response.data;
//     } catch (error) {
//       console.error('Error updating customer profile:', error);
//       throw error;
//     }
//   },

//   // Check if profile exists
//   checkProfileExists: async (customerId) => {
//     try {
//       const response = await api.get(`/customer/profile/exists/${customerId}`);
//       return response.data;
//     } catch (error) {
//       console.error('Error checking profile existence:', error);
//       return false;
//     }
//   }
// };




import api from './axios';

export const customerProfileAPI = {
  // Get customer profile
  getProfile: async (customerId) => {
    try {
      const response = await api.get(`/customer/profile/${customerId}`);
      // FIX: Check if response is successful
      if (response.status === 200) {
        return response.data;
      } else if (response.status === 404) {
        console.log('Profile not found for customer:', customerId);
        return null;
      }
      return null;
    } catch (error) {
      console.error('Error fetching customer profile:', error);
      // Don't throw error, just return null
      return null;
    }
  },

  // Save/update customer profile
  saveProfile: async (profileData) => {
    try {
      const response = await api.post('/customer/profile/save', profileData);
      return response.data;
    } catch (error) {
      console.error('Error saving customer profile:', error);
      throw error;
    }
  },

  // Update customer profile
  updateProfile: async (customerId, profileData) => {
    try {
      const response = await api.put(`/customer/profile/update/${customerId}`, profileData);
      return response.data;
    } catch (error) {
      console.error('Error updating customer profile:', error);
      throw error;
    }
  },

  // Check if profile exists - FIXED: Extract the boolean value
  checkProfileExists: async (customerId) => {
    try {
      const response = await api.get(`/customer/profile/exists/${customerId}`);
      // Extract the boolean value from the response
      return response.data.exists || false;
    } catch (error) {
      console.error('Error checking profile existence:', error);
      return false;
    }
  }
};