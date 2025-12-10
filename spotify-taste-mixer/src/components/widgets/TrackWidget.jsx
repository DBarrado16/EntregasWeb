'use client'

import { useState, useEffect } from 'react'
import { searchTracks } from '@/lib/spotify'

export default function TrackWidget({ selectedTracks, onSelect }) {
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
                const tracks = await searchTracks(search, token)
                setResults(tracks)
            } catch (err) {
                console.error('Error buscando canciones:', err)
            } finally {
                setLoading(false)
            }
        }, 500)
        return () => clearTimeout(timeoutId)
    }, [search])

    const toggleTrack = (track) => {
        const exists = selectedTracks.find(t => t.id === track.id)

        if(exists){
            onSelect(selectedTracks.filter(t => t.id !== track.id))
        } else if (selectedTracks.length < 5){
            onSelect([...selectedTracks, track])
        }
    }

    const removeTrack = (trackId) => {
        onSelect(selectedTracks.filter(t => t.id !== trackId))
    }

    return (
        <div className="bg-neutral-800 rounded-xl p-4">
            <h3 className="text-white font-semibold  mb-3">Canciones</h3>

            <input
                type="text"
                placeholder="Buscar canciones..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-neutral-700 text-white px-3 py-2 rounded-lg mb-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            {selectedTracks.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                    {selectedTracks.map((track) => (
                        <span
                            key={track.id}
                            className="bg-green-500 text-black px-2 py-1 rounded-full text-xs flex items-center gap-1"
                        >
                            {track.name.length > 20 ? track.name.substring(0, 20) + '...' : track.name}
                            <button
                                onClick={() => removeTrack(track.id)}
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
                        {results.map((track) => (
                            <button
                                key={track.id}
                                onClick={() => toggleTrack(track)}
                                disabled={selectedTracks.length >= 5 && !selectedTracks.find(t => t.id === track.id)}
                                className={`w-full flex items-center gap-3 p-2 rounded-lg transition-colors ${
                                    selectedTracks.find(t => t.id === track.id)
                                        ? 'bg-green-500/20 border border-green-500'
                                        : 'bg-neutral-700 hover:bg-neutral-600'
                                } disabled:opacity-50 disabled:cursor-not-allowed`}
                            >
                                {track.album?.images?.[2] ? (
                                    <img
                                        src={track.album.images[2].url}
                                        alt={track.name}
                                        className="w-10 h-10 rounded object-cover"
                                    />
                                ) : (
                                    <div className="w-10 h-10 rounded bg-neutral-600 flex items-center justify-center">
                                        🎵
                                    </div>
                                )}
                                <div className="text-left overflow-hidden">
                                    <p className="text-white text-sm truncate">{track.name}</p>
                                    <p className="text-neutral-400 text-xs truncate">
                                        {track.artists?.map(a => a.name).join(', ')}
                                    </p>
                                </div>
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {selectedTracks.length > 0 && (
                <p className="text-neutral-400 text-xs mt-2">
                    {selectedTracks.length}/5 seleccionadas
                </p>
            )}
        </div>
    )   
}