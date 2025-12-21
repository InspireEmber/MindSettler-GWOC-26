const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

class ApiService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    if (config.body && typeof config.body === 'object') {
      config.body = JSON.stringify(config.body);
    }

    try {
      const response = await fetch(url, config);
      
      // Handle network errors or cases where response is not available
      if (!response) {
        throw new Error('Network error: Unable to connect to the server. Please make sure the backend server is running.');
      }

      // Check if response has content before parsing JSON
      const contentType = response.headers.get('content-type');
      let data;
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        // If not JSON, get text response
        const text = await response.text();
        throw new Error(text || `Server returned ${response.status}: ${response.statusText}`);
      }

      if (!response.ok) {
        throw new Error(data.message || data.error || `Server error: ${response.status}`);
      }

      // Extract data field if response has success/data structure
      return data.data !== undefined ? data.data : data;
    } catch (error) {
      // Handle network errors (connection refused, CORS, etc.)
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        throw new Error('Unable to connect to the server. Please ensure the backend server is running on http://localhost:5000');
      }
      // Re-throw other errors with their original message
      throw error;
    }
  }

  // Booking endpoints
  async createBooking(bookingData) {
    return this.request('/bookings', {
      method: 'POST',
      body: bookingData,
    });
  }

  async getBookingStatus(bookingId) {
    return this.request(`/bookings/${bookingId}`);
  }

  // Slot endpoints
  async getAvailableSlots(filters = {}) {
    const queryParams = new URLSearchParams(filters).toString();
    return this.request(`/slots/available?${queryParams}`);
  }
}

export default new ApiService();
