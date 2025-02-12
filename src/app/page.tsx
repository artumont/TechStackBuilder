'use client'

import Image from "next/image";
import { Search } from 'lucide-react';

export default function Home() {
    return (
        <main className="min-h-screen 
            bg-[linear-gradient(to_right,rgba(0,0,0,0.3)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.3)_1px,transparent_1px)] 
            dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.10)_1px,transparent_1px)] 
            bg-[size:4rem_4rem] 
            bg-slate-50 dark:bg-dark
            font-[family-name:var(--font-nunito)]"
        >
            <div className="container mx-auto px-4 py-8 md:py-16">
                <div className="flex flex-col items-center justify-center space-y-8">
                    <h1 className="text-4xl md:text-6xl font-light text-black dark:text-slate-100 text-center">
                        Tech Stack Builder
                    </h1>
                </div>
            </div>
            <div className="container mx-auto px-8 md:px-20 sm:px-3 justify-center">
                <div className="bg-light-secondary dark:bg-dark-secondary rounded-xl shadow-lg p-6 w-full mx-auto border-2 border-black dark:border-white">
                    <div className="relative">
                        <input 
                            type="text"
                            placeholder="Search technologies..."
                            className="w-full px-4 py-2 pr-10 rounded-lg border border-dark-secondary dark:border-light-secondary
                            bg-transparent
                            text-dark dark:text-light
                            placeholder:text-dark-secondary dark:placeholder:text-light-secondary
                            focus:outline-none
                            transition-colors"
                        />
                        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-secondary dark:text-light-secondary cursor-pointer"/>
                    </div>     
                    {/* Content will go here */}
                </div>
            </div>
        </main>
    );
}