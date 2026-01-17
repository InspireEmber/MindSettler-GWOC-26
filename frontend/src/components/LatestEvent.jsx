"use client";
import { useState, useEffect } from 'react';
import apiService from '@/services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ArrowRight, ExternalLink, Sparkles, X } from 'lucide-react';
import SeamlessVideo from './SeamlessVideo';

const LatestEvent = () => {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);

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

    // Lock body scroll when modal is open
    useEffect(() => {
        if (selectedEvent) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [selectedEvent]);

    if (events.length === 0) {
        return null;
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    return (
        <section className="py-20 md:py-32 relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#DD1764]/10 rounded-full blur-[100px] pointer-events-none" />

            {/* FULL SCREEN MODAL */}
            <AnimatePresence>
                {selectedEvent && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
                    >
                        {/* Backdrop Blur */}
                        <div
                            className="absolute inset-0 bg-black/60 backdrop-blur-md"
                            onClick={() => setSelectedEvent(null)}
                        />

                        {/* Modal Content */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0b0220] rounded-[3rem] border border-white/10 shadow-2xl flex flex-col md:flex-row overflow-hidden group"
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedEvent(null)}
                                className="absolute top-6 right-6 z-50 w-12 h-12 rounded-full bg-black/20 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300 group-hover:border-white/20"
                            >
                                <X size={24} />
                            </button>

                            {/* Left Side - Visuals */}
                            <div className="w-full md:w-2/5 relative min-h-[300px] md:min-h-full overflow-hidden bg-gradient-to-br from-[#4b2d7f]/40 to-[#0b0220]">
                                {/* Animated Blobs */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-[#eeb9ff]/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                                <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#DD1764]/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                                <div className="absolute inset-0 bg-white/5 backdrop-blur-[2px]" />

                                <div className="relative z-30 h-full flex flex-col justify-end p-8 md:p-12">
                                    <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-6 border border-white/20 shadow-lg">
                                        <Calendar className="w-8 h-8 text-[#eeb9ff]" />
                                    </div>
                                    <h3 className="text-3xl md:text-4xl font-light text-white leading-tight mb-2">
                                        {selectedEvent.title}
                                    </h3>
                                    <p className="text-[#eeb9ff] font-medium tracking-wide text-sm uppercase">Event Details</p>
                                </div>
                            </div>

                            {/* Right Side - Description */}
                            <div className="w-full md:w-3/5 p-8 md:p-12 flex flex-col bg-gradient-to-br from-[#eeb9ff]/10 to-[#DD1764]/10 backdrop-blur-xl relative overflow-hidden">
                                {/* Subtle decorative circle */}
                                <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#eeb9ff]/10 rounded-full blur-3xl pointer-events-none" />

                                <div className="flex-grow relative z-10">
                                    <h4 className="text-xl text-[#eeb9ff] mb-6 font-serif italic">About this event</h4>
                                    <div className="prose prose-invert max-w-none">
                                        <p className="text-gray-200 text-lg leading-relaxed font-light font-redhat whitespace-pre-line">
                                            {selectedEvent.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="pt-8 mt-8 border-t border-white/10 flex flex-col sm:flex-row gap-4">
                                    {selectedEvent.googleFormLink && (
                                        <a
                                            href={selectedEvent.googleFormLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 px-8 py-4 rounded-full bg-[#eeb9ff] text-[#3F2965] font-bold text-lg text-center hover:bg-white transition-colors shadow-lg shadow-[#eeb9ff]/10 flex items-center justify-center gap-2 group/btn"
                                        >
                                            Register Now
                                            <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
                                        </a>
                                    )}
                                    <button
                                        onClick={() => setSelectedEvent(null)}
                                        className="px-8 py-4 rounded-full border border-white/20 text-white font-medium hover:bg-white/5 transition-colors"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>


            <div className="max-w-6xl mx-auto px-6 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16 md:mb-24"
                >
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <span className="h-px w-8 bg-[#eeb9ff]/50"></span>
                        <span className="text-[#eeb9ff] text-xs font-bold uppercase tracking-[0.2em]">Join Us</span>
                        <span className="h-px w-8 bg-[#eeb9ff]/50"></span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-light text-[#eeb9ff] mb-6 leading-tight tracking-tight">
                        Upcoming Events
                    </h2>
                    <p className="text-xl md:text-3xl text-white font-light max-w-3xl mx-auto font-redhat leading-relaxed">
                        Opportunities to learn, connect, and grow together.
                    </p>
                </motion.div>

                {/* Events Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {events.map((event) => (
                        <motion.div
                            key={event._id}
                            variants={cardVariants}
                            whileHover={{ y: -10 }}
                            onClick={() => setSelectedEvent(event)}
                            className="group relative flex flex-col h-full bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 overflow-hidden hover:bg-white/10 hover:border-[#eeb9ff]/30 transition-all duration-500 shadow-xl cursor-pointer"
                        >
                            {/* Card Glow Effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#eeb9ff]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                            <div className="relative p-8 flex flex-col h-full z-10">
                                {/* Icon / Badge */}
                                <div className="mb-6 flex justify-between items-start">
                                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform duration-300">
                                        <Calendar className="w-6 h-6 text-[#eeb9ff]" />
                                    </div>
                                    <div className="px-3 py-1 rounded-full bg-[#eeb9ff]/10 border border-[#eeb9ff]/20 text-[#eeb9ff] text-xs font-medium uppercase tracking-wider">
                                        Workshop
                                    </div>
                                </div>

                                {/* Content */}
                                <h3 className="text-2xl text-white mb-4 group-hover:text-[#eeb9ff] transition-colors line-clamp-2">
                                    {event.title}
                                </h3>

                                <p className="text-gray-300 font-light leading-relaxed mb-8 line-clamp-3 text-sm flex-grow font-redhat">
                                    {event.description}
                                </p>

                                {/* Action */}
                                <div className="mt-auto pointer-events-none group-hover:translate-x-2 transition-transform duration-300 flex items-center gap-2 text-[#eeb9ff] font-medium text-sm">
                                    Read More & Register <ArrowRight size={16} />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default LatestEvent;
