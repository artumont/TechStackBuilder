'use client'

import { Search, Link, Sparkles, Code, Brackets } from './icons'
import { useState, useEffect, useCallback } from 'react'

const RENDER_LIMIT = 30;

interface Technology {
    id: string;
    name: string;
    url: string;
}

const debounce = (func: Function, wait: number) => {
    let timeout: NodeJS.Timeout
    return (...args: any[]) => {
        clearTimeout(timeout)
        timeout = setTimeout(() => func(...args), wait)
    }
}

export default function Finder() {
    const [searchQuery, setSearchQuery] = useState('')
    const [technologies, setTechnologies] = useState<Technology[]>([])
    const [filteredTechnologies, setFilteredTechnologies] = useState<Technology[]>([])
    const [showToast, setShowToast] = useState(false)

    useEffect(() => {
        const fetchTechnologies = async () => {
            try {
                const response = await fetch('/data/tech-stack.json')
                const data = await response.json()
                const techArray = Object.entries(data).map(([name, url]) => ({
                    id: name.toLowerCase().replace(/\s+/g, '-'),
                    name,
                    url: url as string
                }))
                setTechnologies(techArray.sort((a, b) => a.name.length - b.name.length))
                setFilteredTechnologies(techArray.slice(0, RENDER_LIMIT))
            } catch (error) {
                console.error('Error loading technologies:', error)
            }
        }

        fetchTechnologies()
    }, [])

    const debouncedSearch = useCallback(
        debounce((searchTerm: string) => {
            const filtered = technologies
                .filter(tech => {
                    if (!searchTerm) {
                        return true
                    }
                    const techName = tech.name.trim().toLowerCase()
                    return techName.includes(searchTerm.toLowerCase())
                })
                .sort((a, b) => {
                    const aStartsWith = a.name.toLowerCase().startsWith(searchTerm.toLowerCase())
                    const bStartsWith = b.name.toLowerCase().startsWith(searchTerm.toLowerCase())
                    if (aStartsWith && !bStartsWith) return -1
                    if (!aStartsWith && bStartsWith) return 1
                    return a.name.length - b.name.length
                })
                .slice(0, RENDER_LIMIT) 
            setFilteredTechnologies(filtered)
        }, 50),
        [technologies]
    )

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value.trim()
        setSearchQuery(e.target.value)
        debouncedSearch(searchTerm)
    }

    const handleCopy = async (url: string, type: string) => {
        try {
            if (type == 'link') {
                await navigator.clipboard.writeText(url)
                setShowToast(true)
                setTimeout(() => {
                    setShowToast(false)
                }, 2000)
            }
            else if (type == 'embed') {
                await navigator.clipboard.writeText(`<img src="${url}"/>`)
                setShowToast(true)
                setTimeout(() => {
                    setShowToast(false)
                }, 2000)
            }
            else if (type == 'markdown') {
                await navigator.clipboard.writeText(`![${url}](${url})`)
                setShowToast(true)
                setTimeout(() => {
                    setShowToast(false)
                }, 2000)
            }
        } catch (err) {
            console.error('Failed to copy:', err)
        }
    }

    return (
        <div className="container">
            <div className="relative">
                <input 
                    type="text"
                    value={searchQuery}
                    onChange={handleSearch}
                    placeholder="Search technologies..."
                    className="w-full px-4 py-2 pr-10 rounded-lg border border-dark-secondary dark:border-[#ffffff44]
                    bg-transparent
                    text-dark dark:text-light
                    placeholder:text-dark-secondary dark:placeholder:text-light-secondary
                    focus:outline-none
                    transition-colors"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-secondary dark:text-light-secondary cursor-pointer"/>
            </div>  
            <div className="container mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredTechnologies.map(tech => (
                    <div 
                        key={tech.id}
                        className="flex flex-col items-start p-4 border border-dark-secondary dark:border-[#ffffff44] rounded-lg w-full"
                    >
                        <img src={tech.url} alt={tech.name} className="w-auto h-6" />
                        <div className='flex justify-between items-center w-full mt-2'>
                            <h3 className="text-lg font-semibold mt-2 text-black dark:text-white">{tech.name}</h3>
                            <div className='flex items-center mt-2'>
                                <button 
                                    onClick={() => handleCopy(tech.url, 'link')}
                                    className="m-1 px-1 py-1 rounded-lg border border-dark-secondary dark:border-[#ffffff44] text-black dark:text-white"
                                    title='Copy link'
                                >
                                    <Link className='w-5.2 h-5.2 flex-shrink-0'/>
                                </button>
                                <button 
                                    onClick={() => handleCopy(tech.url, 'embed')}
                                    className="m-1 px-1 py-1 rounded-lg border border-dark-secondary dark:border-[#ffffff44] text-black dark:text-white"
                                    title='Copy embed'
                                >
                                    <Code className='w-5.2 h-5.2 flex-shrink-0'/>
                                </button>
                                <button 
                                    onClick={() => handleCopy(tech.url, 'markdown')}
                                    className="m-1 px-1 py-1 rounded-lg border border-dark-secondary dark:border-[#ffffff44] text-black dark:text-white"
                                    title='Copy markdown'
                                >
                                    <Brackets className='w-5.2 h-5.2 flex-shrink-0'/>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {showToast && (
                <div 
                    className={`
                        fixed top-4 right-4 
                        bg-dark-secondary
                        px-4 py-2 rounded-md shadow-lg 
                        flex items-center gap-2
                    `}
                >
                    <span className="text-sm font-medium flex items-center">
                        Copied to clipboard!
                        <Sparkles className="w-4 h-4 flex-shrink-0 ml-2" />
                    </span>
                </div>
            )}
        </div>
    )
}