'use client';

import { useState, useEffect } from 'react';
import api from '@/services/api';

const LatestEvent = () => {
  const [latestEvent, setLatestEvent] = useState(null);

  useEffect(() => {
    const fetchLatestEvent = async () => {
      try {
        const { data } = await api.get('/latest-events');
        const activeEvent = data.find((event) => event.status === 'active');
        setLatestEvent(activeEvent);
      } catch (error) {
        console.error('Error fetching latest event:', error);
      }
    };

    fetchLatestEvent();
  }, []);

  if (!latestEvent) {
    return null;
  }

  return (
    <div className="bg-blue-100 border-t-4 border-blue-500 rounded-b text-blue-900 px-4 py-3 shadow-md my-8">
      <div className="flex">
        <div className="py-1">
          <svg
            className="fill-current h-6 w-6 text-blue-500 mr-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12zm-1-5a1 1 0 011-1h2a1 1 0 110 2h-1v1a1 1 0 11-2 0v-2zm-1-9a1 1 0 011-1h2a1 1 0 110 2h-1v1a1 1 0 11-2 0V2z" />
          </svg>
        </div>
        <div>
          <p className="font-bold">{latestEvent.title}</p>
          <p className="text-sm">{latestEvent.description}</p>
          <a
            href={latestEvent.googleFormLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline font-semibold mt-2 inline-block"
          >
            Register Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default LatestEvent;
