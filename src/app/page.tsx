'use client'

import Finder from '@/components/finder'

export default function Home() {
    return (
        <main className="min-h-screen pb-10
            bg-[linear-gradient(to_right,rgba(0,0,0,0.3)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.3)_1px,transparent_1px)] 
            dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.10)_1px,transparent_1px)] 
            bg-[size:4rem_4rem] 
            bg-slate-50 dark:bg-dark
            font-[family-name:var(--font-nunito)]"
        >
            <div className="container mx-auto px-4 py-4 md:py-16 md:pb-8">
                <div className="flex flex-col items-center justify-center space-y-2.5">
                    <h1 className="text-4xl md:text-6xl font-light text-black dark:text-slate-100 text-center">
                        Tech Stack Builder
                    </h1>
                    <h2 className='text-lg text-center text-black dark:text-slate-100'>
                        Made by <a className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 underline underline-offset-2 transition-colors duration-200"  href="https://github.com/artumont">Artu</a> with ☕
                    </h2>
                </div>
            </div>
            <div className="container mx-auto px-8 md:px-20 sm:px-3 justify-center">
                <div className="bg-light-secondary dark:bg-dark-secondary rounded-xl shadow-lg p-6 w-full mx-auto border-opacity-25 border-2 border-black dark:border-[#ffffff44]">
                    <Finder />
                </div>
            </div>
        </main>
    );
}