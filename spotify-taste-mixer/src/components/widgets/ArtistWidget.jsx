'use client'

import { useState, useEffect } from 'react'
import { searchArtists } from '@/lib/spotify' //preguntar que es el searhchArtists

export default function ArtistWidget({ selectedArtists, onSelect }) {
    const [search, setSearch] = useState('')
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem('spotify_token')

        if(!search.trim() || !token) {
            setResults([])
            return
        }

        const timeoutId = setTimeout(async () => {
            setLoading(true)
            try {
                const artists = await searchArtists(search, token)
                setResults(artists)
            } catch (err) {
                console.error('Error buscando artistas:', err)
            } finally {
                setLoading(false)
            }
        }, 500)

        return () => clearTimeout(timeoutId)
    }, [search])

    const toggleArtist = (artist) => {
        const exists = selectedArtists.find(a => a.id === artist.id)

        if(exists){
            onSelect(selectedArtists.filter(a => a.id !== artist.id))
        } else if (selectedArtists.length < 5){
            onSelect([...selectedArtists, artist])
        }
    }

    const removeArtist = (artistId) => {
        onSelect(selectedArtists.filter(a => a.id !== artistId))
    } 

    return (
        <div className="bg-neutral-800 rounded-xl p-4">
            <h3 className="text-white font-semibold  mb-3">Artistas</h3>

            <input
                type="text"
                placeholder="Buscar artistas..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full bg-neutral-700 text-white px-3 py-2 rounded-lg mb-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            {selectedArtists.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                    {selectedArtists.map(artist => (
                        <span
                            key={artist.id}
                            className="bg-green-500 text-black px-2 py-1 rounded-full text-xs flex items-center gap-1"
                        >
                            {artist.name}
                            <button
                                onClick={() => removeArtist(artist.id)}
                                className="hover:bg-green-600 rounded-full w-4 h-4 flex items-center justify-center"
                            >
                                x
                            </button>
                        </span>
                    ))}
                </div>
            )}

            <div className="max-h-48 overflow-y-auto">
                {loading && (
                    <p className="text-neutral-400 text-sm">Buscando...</p>
                )}

                {!loading && results.length > 0 && (
                    <div className="space-y-2">
                        {results.map(artist => (
                            <button
                                key={artist.id}
                                onClick={() => toggleArtist(artist)}
                                disabled={selectedArtists.length >= 5 && !selectedArtists.find(a => a.id === artist.id)}
                                className={`w-full flex items-center gap-3 p-2 rounded-lg transition-colors ${
                                    selectedArtists.find(a => a.id === artist.id)
                                        ? 'bg-green-500/20 border border-green-500'
                                        : 'bg-neutral-700 hover:bg-neutral-600'
                                } disabled:opacity-50 disabled:cursor-not-allowed`}
                            >
                                {artist.images?.[2] ? (
                                    <img
                                        src={artist.images[2].url}
                                        alt={artist.name}
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="w-10 h-10 rounded-full bg-neutral-600 flex items-center justify-center">
                                        🎤
                                    </div>
                                )}
                                <div className="text-left">
                                    <p className="text-white text-sm">{artist.name}</p>
                                    <p className="text-neutral-400 text-xs">
                                        {artist.followers?.total?.toLocaleString()} seguidores
                                    </p>
                                </div>
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {selectedArtists.length > 0 && (
                <p className="text-neutral-400 text-xs mt-2">
                    {selectedArtists.length}/5 seleccionados
                </p>
            )}
        </div>
    )
}