"use client";
import { useState, useEffect } from 'react';
import apiService from '@/services/api';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, ExternalLink, Sparkles } from 'lucide-react';

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
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#3F2965]/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#DD1764]/10 rounded-full blur-[100px] pointer-events-none" />

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
                    <h2 className="text-4xl md:text-5xl font-light text-white mb-6">
                        Upcoming <span className="font-serif italic text-transparent bg-clip-text bg-gradient-to-r from-[#eeb9ff] to-white">Events</span>
                    </h2>
                    <p className="text-lg text-gray-300 font-light max-w-2xl mx-auto font-redhat">
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
                            className="group relative flex flex-col h-full bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 overflow-hidden hover:bg-white/10 hover:border-[#eeb9ff]/30 transition-all duration-500 shadow-xl"
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
                                <h3 className="text-2xl font-serif text-white mb-4 group-hover:text-[#eeb9ff] transition-colors line-clamp-2">
                                    {event.title}
                                </h3>

                                <p className="text-gray-300 font-light leading-relaxed mb-8 line-clamp-3 text-sm flex-grow font-redhat">
                                    {event.description}
                                </p>

                                {/* Action */}
                                {event.googleFormLink && (
                                    <div className="mt-auto">
                                        <a
                                            href={event.googleFormLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group/btn flex items-center justify-between w-full py-4 text-white border-t border-white/10 group-hover:border-[#eeb9ff]/30 transition-colors"
                                        >
                                            <span className="font-medium group-hover/btn:px-2 transition-all duration-300">Register Now</span>
                                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover/btn:bg-[#eeb9ff] group-hover/btn:text-[#2E2A36] transition-all duration-300">
                                                <ArrowRight size={14} className="-rotate-45 group-hover/btn:rotate-0 transition-transform duration-300" />
                                            </div>
                                        </a>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default LatestEvent;
