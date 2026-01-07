"use client";
import { useState, useEffect } from 'react';
import apiService from '@/services/api';

const LatestEvent = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const fetchedEvents = await apiService.get('/latest-events');
                setEvents(fetchedEvents);
            } catch (error) {
                console.error('Error fetching latest events:', error);
            }
        };

        fetchEvents();
    }, []);

    if (events.length === 0) {
        return null; // Don't render anything if there are no events
    }

    return (
        <section className="py-12 sm:py-16 md:py-20 lg:py-24">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="text-center mb-10 sm:mb-12 md:mb-16">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-white mb-3 sm:mb-4 leading-tight">
                        Latest Events
                    </h2>
                    <p className="text-base sm:text-lg text-gray-200 max-w-2xl mx-auto px-2">
                        Stay updated with our latest events and announcements.
                    </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {events.map((event) => (
                        <div key={event._id} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 hover:bg-white/10 transition-all flex flex-col">
                            <h3 className="text-xl font-semibold text-white mb-3">{event.title}</h3>
                            <p className="text-gray-300 mb-4 flex-grow">{event.description}</p>
                            {event.googleFormLink && (
                                <div className="mt-auto pt-4 border-t border-white/10">
                                    <a
                                        href={event.googleFormLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block w-full text-center px-6 py-3 rounded-full bg-[#a167a5]/80 backdrop-blur-md text-white font-medium hover:shadow-2xl hover:bg-[#a167a5] transition-all shadow-xl ring-1 ring-inset ring-white/10"
                                    >
                                        Register
                                    </a>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LatestEvent;
