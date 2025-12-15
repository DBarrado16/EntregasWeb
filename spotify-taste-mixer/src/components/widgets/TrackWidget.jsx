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
        <div className="bg-gradient-to-br from-red-950/90 to-amber-950/90 rounded-2xl p-5 border-2 border-amber-500/30 shadow-xl shadow-red-900/20 relative overflow-hidden">
            <h3 className="text-amber-100 font-bold text-lg mb-4 flex items-center gap-2" style={{ fontFamily: 'Georgia, serif' }}>Buscate ahi tu Rumbita</h3>

            <input
                type="text"
                placeholder="Que sea de los Yakis por favor..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-red-900/50 text-amber-100 px-4 py-3 rounded-xl mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 border border-amber-500/30 placeholder-amber-300/40"
            />

            {selectedTracks.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                    {selectedTracks.map((track) => (
                        <span
                            key={track.id}
                            className="bg-gradient-to-r from-amber-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-2 shadow-lg shadow-amber-500/20"
                        >
                            {track.name.length > 20 ? track.name.substring(0, 20) + '...' : track.name}
                            <button
                                onClick={() => removeTrack(track.id)}
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
                    <p className="text-amber-300/60 text-sm mt-2 italic">Buscandole ahí...</p>
                )}

                {!loading && results.length > 0 && (
                    <div className="space-y-2">
                        {results.map((track) => (
                            <button
                                key={track.id}
                                onClick={() => toggleTrack(track)}
                                disabled={selectedTracks.length >= 5 && !selectedTracks.find(t => t.id === track.id)}
                                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
                                    selectedTracks.find(t => t.id === track.id)
                                        ? 'bg-gradient-to-r from-amber-500/30 to-red-500/30 border-2 border-amber-500 shadow-lg shadow-amber-500/20'
                                        : 'bg-red-900/40 hover:bg-red-800/50 border border-amber-500/20 hover:border-amber-500/50'
                                } disabled:opacity-40 disabled:cursor-not-allowed`}
                            >
                                {track.album?.images?.[2] ? (
                                    <img
                                        src={track.album.images[2].url}
                                        alt={track.name}
                                        className="w-11 h-11 rounded-lg object-cover ring-2 ring-amber-500/40"
                                    />
                                ) : (
                                    <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-red-700 to-amber-700 flex items-center justify-center">
                                        🎵
                                    </div>
                                )}
                                <div className="text-left overflow-hidden flex-1">
                                    <p className="text-amber-100 text-sm truncate font-semibold">{track.name}</p>
                                    <p className="text-amber-400/50 text-xs truncate">
                                        {track.artists?.map(a => a.name).join(', ')}
                                    </p>
                                </div>
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {selectedTracks.length > 0 && (
                <p className="text-amber-400/60 text-xs mt-3 text-center italic">
                    {selectedTracks.length} de 5 por el patriarca yo brinco
                </p>
            )}
        </div>
    )   
}