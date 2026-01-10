// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// class ApiService {
//   /**
//    * Universal Request Handler
//    * @param {string} endpoint - API path
//    * @param {object} options - Fetch options
//    * @param {boolean} fullResponse - If true, returns the raw data object instead of data.data
//    */
//   async request(endpoint, options = {}, fullResponse = false) {
//     const config = {
//       credentials: 'include',
//       cache:'no-store',
//       headers: { 'Content-Type': 'application/json', ...options.headers },
//       ...options,
//       body: options.body && typeof options.body === 'object' ? JSON.stringify(options.body) : options.body,
//     };

//     try {
//       const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
//       if (!response) throw new Error('Network error: Unable to connect to server.');

//       const contentType = response.headers.get('content-type');
//       if (!contentType?.includes('application/json')) {
//         const text = await response.text();
//         throw new Error(text || `Server Error ${response.status}`);
//       }

//       const data = await response.json();
//       if (!response.ok) throw new Error(data.message || data.error || `Error ${response.status}`);

//       // Return full object if requested (needed for Chatbot/Auth), otherwise extract .data
//       return fullResponse ? data : (data.data !== undefined ? data.data : data);
//     } catch (error) {
//       if (error instanceof TypeError && error.message === 'Failed to fetch') {
//         throw new Error('Connection refused. Please ensure backend is running on port 5000.');
//       }
//       throw error;
//     }
//   }

//   // Booking & Slots
//   createBooking(body) { return this.request('/bookings', { method: 'POST', body }); }
//   getBookingStatus(id) { return this.request(`/bookings/${id}`); }
//   getAvailableSlots(filters = {}) { 
//     return this.request(`/slots/available?${new URLSearchParams(filters)}`); 
//   }

//   // Corporate
//   createCorporateInquiry(body) { return this.request('/corporate/inquiries', { method: 'POST', body }); }
//   getCorporateInquiries(query = {}) { 
//     return this.request(`/corporate/inquiries?${new URLSearchParams(query)}`); 
//   }
//   updateCorporateInquiryStatus(id, status) {
//     return this.request(`/corporate/inquiries/${id}/status`, { method: 'PUT', body: { status } });
//   }

//   // Auth & Profile
//   userSignup(body) { return this.request('/auth/user/signup', { method: 'POST', body }, true); }
//   userLogin(body) { return this.request('/auth/user/login', { method: 'POST', body }, true); }
//   getUserProfile() { return this.request('/users/profile'); }
//   getUserSessionsSummary() { return this.request('/users/sessions-summary'); }
//   getUserSessions() { return this.request('/users/sessions'); }

//   // Chatbot - Uses the 'fullResponse' flag to match your backend logic
//   sendChatMessage(body) { 
//     return this.request('/chatbot/chat', { method: 'POST', body }, true); 
//   }
// }

// export default new ApiService();



'use client'
// Robust URL construction to prevent double /api issues
let base_url = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000').trim();

// Strip trailing slashes
while (base_url.endsWith('/')) {
  base_url = base_url.slice(0, -1);
}

// Strip /api suffix if present (we'll add it back cleanly)
if (base_url.endsWith('/api')) {
  base_url = base_url.slice(0, -4); // Remove '/api'
}

// Always add /api at the end
const API_BASE_URL = `${base_url}/api`;

console.log('[API Service] Using API_BASE_URL:', API_BASE_URL);

class ApiService {
  /**
   * Universal Request Handler
   * @param {string} endpoint - API path
   * @param {object} options - Fetch options
   * @param {boolean} fullResponse - If true, returns the raw data object instead of data.data
   */
  async request(endpoint, options = {}, fullResponse = false) {
    const config = {
      credentials: 'include',
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json', ...options.headers },
      ...options,
      body: options.body && typeof options.body === 'object' ? JSON.stringify(options.body) : options.body,
    };

    const url = `${API_BASE_URL}${endpoint}`;

    try {
      const response = await fetch(url, config);
      if (!response) throw new Error('Network error: Unable to connect to server.');

      const contentType = response.headers.get('content-type');
      if (!contentType?.includes('application/json')) {
        const text = await response.text();
        throw new Error(`Server Error ${response.status} at ${url}. Response: ${text.slice(0, 100)}`);
      }

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || data.error || `Error ${response.status} at ${url}`);

      // Return full object if requested (needed for Chatbot/Auth), otherwise extract .data
      return fullResponse ? data : (data.data !== undefined ? data.data : data);
    } catch (error) {
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        throw new Error(`Connection refused to ${url}. Please check if the backend is running.`);
      }
      throw error;
    }
  }

  // Generic methods
  get(endpoint, options) { return this.request(endpoint, { method: 'GET', ...options }); }
  post(endpoint, body, options) { return this.request(endpoint, { method: 'POST', body, ...options }); }
  put(endpoint, body, options) { return this.request(endpoint, { method: 'PUT', body, ...options }); }
  delete(endpoint, options) { return this.request(endpoint, { method: 'DELETE', ...options }); }


  // Booking & Slots
  createBooking(body) { return this.request('/bookings', { method: 'POST', body }); }
  getBookingStatus(id) { return this.request(`/bookings/${id}`); }
  getAvailableSlots(filters = {}) {
    return this.request(`/slots/available?${new URLSearchParams(filters)}`);
  }

  // Corporate
  createCorporateInquiry(body) { return this.request('/corporate/inquiries', { method: 'POST', body }); }
  getCorporateInquiries(query = {}) {
    return this.request(`/corporate/inquiries?${new URLSearchParams(query)}`);
  }
  updateCorporateInquiryStatus(id, status) {
    return this.request(`/corporate/inquiries/${id}/status`, { method: 'PUT', body: { status } });
  }

  // Auth & Profile
  userSignup(body) { return this.request('/auth/user/signup', { method: 'POST', body }, true); }
  userLogin(body) { return this.request('/auth/user/login', { method: 'POST', body }, true); }
  getUserProfile() { return this.request('/users/profile'); }
  getUserSessionsSummary() { return this.request('/users/sessions-summary'); }
  getUserSessions() { return this.request('/users/sessions'); }

  // Calendar
  addToGoogleCalendar(bookingId) { return this.request(`/bookings/${bookingId}/calendar`, { method: 'POST' }); }

  // Chatbot - Uses the 'fullResponse' flag to match your backend logic
  sendChatMessage(body) {
    return this.request('/chatbot/chat', { method: 'POST', body }, true);
  }
}

export default new ApiService();