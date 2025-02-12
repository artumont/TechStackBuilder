'use client'

import { Search } from './icons'
import { useState, useEffect } from 'react'

interface Technology {
    id: string;
    name: string;
    url: string;
}

export default function Finder() {
    const [searchQuery, setSearchQuery] = useState('')
    const [technologies, setTechnologies] = useState<Technology[]>([])
    const [filteredTechnologies, setFilteredTechnologies] = useState<Technology[]>([])

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
                setTechnologies(techArray)
                setFilteredTechnologies(techArray.slice(0, 20))
            } catch (error) {
                console.error('Error loading technologies:', error)
            }
        }

        fetchTechnologies()
    }, [])

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value)
        const filtered = technologies
            .filter(tech => {
                if (!e.target.value) {
                    return true
                }
                return tech.name.toLowerCase().includes(e.target.value.toLowerCase())
            }).slice(0, 20)
        setFilteredTechnologies(filtered)
    }

    return (
        <div className="container">
            <div className="relative">
                <input 
                    type="text"
                    value={searchQuery}
                    onChange={handleSearch}
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
            <div className="container mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredTechnologies.map(tech => (
                    <div 
                        key={tech.id}
                        className="p-4 border border-dark-secondary dark:border-light-secondary rounded-lg"
                    >
                        <img src={tech.url} alt={tech.name} className="w-auto h-auto" />
                        <h3 className="text-lg font-semibold mt-2">{tech.name}</h3>
                    </div>
                ))}
            </div>
        </div>
    )
}