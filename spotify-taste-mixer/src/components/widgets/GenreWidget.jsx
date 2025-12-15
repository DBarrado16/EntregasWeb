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
        <div className="bg-gradient-to-br from-red-950/90 to-amber-950/90 rounded-2xl p-5 border-2 border-amber-500/30 shadow-xl shadow-red-900/20 relative overflow-hidden">
            <h3 className="text-amber-100 font-bold text-lg mb-4 flex items-center gap-2" style={{ fontFamily: 'Georgia, serif' }} >Tipos de Rumbita</h3>

            <input
                type="text"
                placeholder="Buscale ahi algo bonico..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-red-900/50 text-amber-100 px-4 py-3 rounded-xl mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 border border-amber-500/30 placeholder-amber-300/40"
            />

            <div className="flex flex-wrap gap-2 max-h-44 overflow-y-auto pr-1">
                {filteredGenres.map(genre => (
                    <button
                        key={genre}
                        onClick={() => toggleGenre(genre)}
                        disabled={selectedGenres.length >= 5 && !selectedGenres.includes(genre)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                            selectedGenres.includes(genre)
                                ? 'bg-gradient-to-r from-amber-500 to-red-500 text-white shadow-lg shadow-amber-500/30 scale-105'
                                : 'bg-red-900/50 text-amber-200/80 hover:bg-red-800/60 border border-amber-500/20 hover:border-amber-500/50'
                        } disabled:opacity-40 disabled:cursor-not-allowed`}
                    >
                        {genre}
                    </button>
                ))}
            </div>

            {selectedGenres.length > 0 && (
                <p className="text-amber-400/60 text-xs mt-4 text-center italic">
                    {selectedGenres.length} de 5 seleccionaos válgame
                </p>
            )}
        </div>
    )
}