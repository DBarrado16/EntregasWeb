'use client'

import { useState } from 'react'

const GENRES = [
    'acoustic', 'afrobeat', 'alt-rock', 'alternative', 'ambient',
    'blues', 'chill', 'classical', 'club', 'country',
    'dance', 'disco', 'drum-and-bass', 'dubstep', 'edm',
    'electronic', 'folk', 'funk', 'garage', 'gospel',
    'grunge', 'hard-rock', 'hardcore', 'heavy-metal', 'hip-hop',
    'house', 'indie', 'indie-pop', 'jazz', 'k-pop',
    'latin', 'metal', 'opera', 'party', 'piano',
    'pop', 'punk', 'r-n-b', 'reggae', 'reggaeton',
    'rock', 'rock-n-roll', 'salsa', 'samba', 'soul',
    'spanish', 'synth-pop', 'techno', 'trance', 'trip-hop',
    'frenchcore', 'flamenco', 'phonk', 'code', 'hard-groove'
]

export default function GenreWidget({ selectedGenres, onSelect }) {
    const [search, setSearch] = useState('')

    const filteredGenres = GENRES.filter(genre =>
        genre.toLowerCase().includes(search.toLowerCase())
    )

    const toggleGenre = (genre) => {
        if(selectedGenres.includes(genre)){
            onSelect(selectedGenres.filter(g => g !== genre))
        } else if(selectedGenres.length < 5){
            onSelect([...selectedGenres, genre])
        }
    }

    return(
        <div className="bg-neutral-800 rounded-xl p-4">
            <h3 className="text-white font-semihold mb-3">Géneros</h3>

            <input
                type="text"
                placeholder="Buscar géneros..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-neutral-700 text-white px-3 py-2 rounded-lg mb-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
                {filteredGenres.map(genre => (
                    <button
                        key={genre}
                        onClick={() => toggleGenre(genre)}
                        className={`px-3 py-1 rounded-full text-sm transition-colors ${
                            selectedGenres.includes(genre)
                                ? 'bg-green-500 text-black'
                                : 'bg-neutral-700 text-neutral-300 hover:bg-neutral-600'
                        }`}
                    >
                        {genre}
                    </button>
                ))}
            </div>

            {selectedGenres.length > 0 && (
                <p className="text-neutral-400 text-xs mt-2">
                    {selectedGenres.length}/5 seleccionados
                </p>
            )}
        </div>
    )
}