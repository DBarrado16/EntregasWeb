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
        <div className="bg-gradient-to-br from-red-950/90 to-amber-950/90 rounded-2xl p-5 border-2 border-amber-500/30 shadow-xl shadow-red-900/20 relative overflow-hidden">
            
            <h3 className="text-amber-100 font-bold text-lg mb-4 flex items-center gap-2" style={{fontFamily: 'Georgia, serif' }}>Artistas</h3>

            <input
                type="text"
                placeholder="Buscale ahí una buena rumbita..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full bg-red-900/50 text-amber-100 px-4 py-3 rounded-xl mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 border border-amber-500/30 placeholder-amber-300/40"
            />

            {selectedArtists.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                    {selectedArtists.map(artist => (
                        <span
                            key={artist.id}
                            className="bg-gradient-to-r from-amber-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-2 shadow-lg shadow-amber-500/20"
                        >
                            {artist.name}
                            <button
                                onClick={() => removeArtist(artist.id)}
                                className="hover:bg-white/20 rounded-full w-4 h-4 flex items-center justify-center transition-colors"
                            >
                                x
                            </button>
                        </span>
                    ))}
                </div>
            )}

            <div className="max-h-48 overflow-y-auto pr-1">
                {loading && (
                    <p className="text-amber-300/60 text-sm mt-2 italic">Buscando...</p>
                )}

                {!loading && results.length > 0 && (
                    <div className="space-y-2">
                        {results.map(artist => (
                            <button
                                key={artist.id}
                                onClick={() => toggleArtist(artist)}
                                disabled={selectedArtists.length >= 5 && !selectedArtists.find(a => a.id === artist.id)}
                                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
                                    selectedArtists.find(a => a.id === artist.id)
                                        ? 'bg-gradient-to-r from-amber-500/30 to-red-500/30 border-2 border-amber-500 shadow-lg shadow-amber-500/20'
                                        : 'bg-red-900/40 hover:bg-red-800/50 border border-amber-500/20 hover:border-amber-500/50'
                                } disabled:opacity-50 disabled:cursor-not-allowed`}
                            >
                                {artist.images?.[2] ? (
                                    <img
                                        src={artist.images[2].url}
                                        alt={artist.name}
                                        className="w-11 h-11 rounded-full object-cover ring-2 ring-amber-500/40"
                                    />
                                ) : (
                                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-red-700 to-amber-700 flex items-center justify-center">
                                        🎤
                                    </div>
                                )}
                                <div className="text-left flex-1">
                                    <p className="text-amber-100 text-sm font-semibold">{artist.name}</p>
                                    <p className="text-amber-400/50 text-xs">
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
                    {selectedArtists.length} has elegío ya suprimo (máx 5) 
                </p>
            )}
        </div>
    )
}