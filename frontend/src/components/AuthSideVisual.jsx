"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const cards = [
    { id: 1, src: "/images/loginimage3.JPG", alt: "MindSettler Moment 1" },
    { id: 2, src: "/images/loginimage5.jpg", alt: "MindSettler Moment 2" },
    { id: 3, src: "/images/loginimage6.JPG", alt: "MindSettler Moment 3" },
];

export default function AuthSideVisual() {
    const [activeIndex, setActiveIndex] = useState(null); // For hover
    const [expandedIndex, setExpandedIndex] = useState(null); // For click

    return (
        <div className="relative w-full h-full min-h-[500px] flex items-center justify-center">

            <div className="relative w-[320px] h-[480px]">
                {cards.map((card, index) => {
                    const isHovered = activeIndex === index;
                    const isExpanded = expandedIndex === index;

                    // Rotation and position for the "fan" effect
                    const rotate = (index - 1) * 12; // -12, 0, 12
                    const x = (index - 1) * 60; // Increased spacing slightly

                    return (
                        <motion.div
                            key={card.id}
                            className={`absolute top-0 left-0 w-full h-full rounded-2xl shadow-2xl overflow-hidden cursor-pointer border-4 border-white/20 hover:border-[#eeb9ff]/50 transition-colors backdrop-blur-sm bg-black/20`}
                            style={{
                                top: 0,
                                left: 0,
                                transformOrigin: "bottom center",
                            }}
                            initial={{ rotate, x, y: 0, scale: 1, zIndex: index }}
                            animate={{
                                rotate: isExpanded ? 0 : isHovered ? 0 : rotate,
                                x: isExpanded ? 0 : isHovered ? (index - 1) * 30 : x,
                                y: isExpanded ? 0 : isHovered ? -50 : 0,
                                scale: isExpanded ? 1.05 : isHovered ? 1.05 : 1,
                                zIndex: isExpanded ? 50 : isHovered ? 40 : index,
                            }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                            onMouseEnter={() => setActiveIndex(index)}
                            onMouseLeave={() => setActiveIndex(null)}
                            layoutId={`card-${card.id}`}
                        >
                            <img
                                src={card.src}
                                alt={card.alt}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/5 hover:bg-transparent transition-colors" />
                        </motion.div>
                    );
                })}
            </div>

            {/* Expanded Modal Overlay */}
            <AnimatePresence>
                {expandedIndex !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
                        onClick={() => setExpandedIndex(null)}
                    >
                        <motion.div
                            layoutId={`card-${cards[expandedIndex].id}`}
                            className="relative w-full max-w-[90vw] max-h-[90vh] flex items-center justify-center bg-white rounded-2xl overflow-hidden shadow-2xl"
                            style={{ width: 'auto', height: 'auto' }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={cards[expandedIndex].src}
                                alt={cards[expandedIndex].alt}
                                className="max-w-full max-h-[90vh] object-contain"
                            />
                            <button
                                className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors flex items-center justify-center z-10"
                                onClick={() => setExpandedIndex(null)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
