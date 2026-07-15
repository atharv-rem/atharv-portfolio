"use client";

import { useState } from 'react'
import quote_dark from '@/public/quote_dark.svg'
import quote_light from '@/public/quote_light.svg'
import Image from 'next/image'
import testimonialData from '../assets/testimonial.json'
import { DrawUnderlineLink } from '@/components/sora-ui/texts/draw-underline-link'
import { motion, AnimatePresence } from 'motion/react'
import { HugeiconsIcon } from '@hugeicons/react'
import { ArrowDown01Icon, ArrowUp01Icon } from '@hugeicons/core-free-icons'

export default function Testimonial() {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div id="testimonial" className="flex flex-col w-full relative">
            <div className="relative left-1/2 -translate-x-1/2 h-[20px] w-[calc(100%+2rem)] max-w-[450px] pattern-hatch border-b border-t border-neutral-200 dark:border-neutral-800" />
            <div id="github-header" className="relative left-1/2 -translate-x-1/2 uppercase font-open text-[12px] text-[#8b8b8b] dark:text-[#d0d0d0] bg-white dark:bg-neutral-900 w-[calc(100%+2rem)] h-[30px] max-w-[450px] border-b border-l border-neutral-200 dark:border-neutral-800 flex items-center justify-start px-3 leading-none">
            testimonials
            </div>
            
            {/* We coordinate layout shifts, using margin-bottom on children instead of container gap to avoid sudden padding jumps */}
            <motion.div layout className="flex flex-col w-full max-w-[450px] px-4 py-6">
                {/* First Testimonial: Always fully visible */}
                <motion.div 
                    layout
                    className="bg-[#f9f9f9] dark:bg-[#232323] flex flex-col gap-4 items-start justify-center border border-neutral-200 dark:border-neutral-800 p-3 w-full rounded-[10px] relative overflow-hidden h-auto mb-4"
                >
                    <div className="flex items-center justify-end w-full">
                        <Image
                            src={quote_light}
                            alt="Quote Icon"
                            width={25}
                            height={25}
                            className="block dark:hidden object-contain"
                        />
                        <Image
                            src={quote_dark}
                            alt="Quote Icon"
                            width={25}
                            height={25}
                            className="hidden dark:block object-contain"
                        />
                    </div>
                    <p className="text-[12px] text-neutral-700 dark:text-[#bcbcbc] font-open">
                        {testimonialData[0].content}
                    </p>
                    <div className="flex flex-col items-start justify-center">
                        <DrawUnderlineLink 
                            href={testimonialData[0].link}
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="sm"
                            className="peer text-[15px] font-bold text-black dark:text-neutral-100 font-open"
                            underlineColor="currentColor"
                        >
                            {testimonialData[0].name}
                        </DrawUnderlineLink>
                        <p className="text-[12px] text-neutral-700 dark:text-[#bcbcbc] font-open leading-[15px] mt-[-6px] peer-hover:mt-[2px] transition-all duration-300">
                            {testimonialData[0].role}
                        </p>
                    </div>
                </motion.div>

                {/* Plain-text Read More button with down arrow */}
                <AnimatePresence mode="popLayout">
                    {!isExpanded && (
                        <motion.div 
                            layout
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="flex justify-center overflow-hidden"
                        >
                            <button 
                                onClick={() => setIsExpanded(true)}
                                className="flex items-center gap-1 text-[14px] font-open font-medium text-[#3e3e3e] dark:text-[#d0d0d0] hover:text-black dark:hover:text-white transition-colors cursor-pointer select-none bg-transparent border-none p-0 outline-none"
                            >
                                <span>Read more</span>
                                <HugeiconsIcon icon={ArrowDown01Icon} className="size-5" strokeWidth={2.5} />
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Remaining Testimonial Cards: Wrapped in an unpadded container to animate height from 0 to auto without padding jumps */}
                <AnimatePresence initial={false}>
                    {isExpanded && testimonialData.slice(1).map((testimonial, index) => (
                        <motion.div 
                            layout
                            key={index} 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="overflow-hidden w-full"
                        >
                            <div className="bg-[#f9f9f9] dark:bg-[#232323] flex flex-col gap-4 items-start justify-center border border-neutral-200 dark:border-neutral-800 p-3 w-full rounded-[10px] relative mb-4">
                                <div className="flex items-center justify-end w-full">
                                    <Image
                                        src={quote_light}
                                        alt="Quote Icon"
                                        width={25}
                                        height={25}
                                        className="block dark:hidden object-contain"
                                    />
                                    <Image
                                        src={quote_dark}
                                        alt="Quote Icon"
                                        width={25}
                                        height={25}
                                        className="hidden dark:block object-contain"
                                    />
                                </div>
                                <p className="text-[12px] text-neutral-700 dark:text-[#bcbcbc] font-open">
                                    {testimonial.content}
                                </p>
                                <div className="flex flex-col items-start justify-center">
                                    <DrawUnderlineLink 
                                        href={testimonial.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        variant="sm"
                                        className="peer text-[15px] font-bold text-black dark:text-neutral-100 font-open"
                                        underlineColor="currentColor"
                                    >
                                        {testimonial.name}
                                    </DrawUnderlineLink>
                                    <p className="text-[12px] text-neutral-700 dark:text-[#bcbcbc] font-open leading-[15px] mt-[-6px] peer-hover:mt-[2px] transition-all duration-300">
                                        {testimonial.role}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
                
                {/* Plain-text Show Less button with up arrow */}
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div 
                            layout
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="flex justify-center overflow-hidden"
                        >
                            <button 
                                onClick={() => setIsExpanded(false)}
                                className="flex items-center gap-1 text-[14px] font-open font-medium text-[#3e3e3e] dark:text-[#d0d0d0] hover:text-black dark:hover:text-white transition-colors cursor-pointer select-none bg-transparent border-none p-0 outline-none"
                            >
                                <span>Show less</span>
                                <HugeiconsIcon icon={ArrowUp01Icon} className="size-5" strokeWidth={2.5} />
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    )
}