'use client'

import TrackCard from "./TrackCard"
import { useState } from "react"
import { createPlaylist, addTracksToPlaylist } from "@/lib/spotify"

export default function PlaylistDisplay({
    tracks,
    favorites,
    onRemoveTrack,
    onToggleFavorite,
    onRefresh,
    onAddMore,
    loading,
    userId
}) {
    const [saving, setSaving] = useState(false)
    const [savedPlaylist, setSavedPlaylist] = useState(null)
    const [playlistName, setPlaylistName] = useState('')
    const [showNameInput, setShowNameInput] = useState(false)

    const handleSaveToSpotify = async () => {
        if(!playlistName.trim()){
            setShowNameInput(true)
            return
        }

        const token = localStorage.getItem('spotify_token')
        if(!token || !userId || tracks.length === 0) return

        setSaving(true)
        try{
            const playlist = await createPlaylist(
                userId,
                playlistName,
                'Creada con un mono bailando 🐒🎶',
                token
            )

            const trackUris = tracks.map(t => t.uri)
            await addTracksToPlaylist(playlist.id, trackUris, token)

            setSavedPlaylist(playlist)
            setShowNameInput(false)
            setPlaylistName('')
        } catch(err){
            console.error('Error guardando la playlist:', err)
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
        return (
            <div className="bg-neutral-800/50 rounded-xl p-8 text-center">
                <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-neutral-400">Generando playlist...</p>
            </div>
        )
    }

    if(tracks.length === 0){
        return (
            <div className="bg-neutral-800/50 rounded-xl p-8 text-center">
                <p className="text-4xl mb-4">🎧</p>
                <p className="text-neutral-400">
                    Configura los widgets y genera tu playlist totalmente personalizada
                </p>
            </div>
        )
    }

    return (
        <div className="bg-neutral-800/50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h3 className="text-white font-semibold">Tu Playlist</h3>
                    <p className="text-neutral-400 text-sm">{tracks.length} canciones</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={onAddMore}
                        className="bg-neutral-700 hover:bg-neutral-600 text-white px-4 py-2 rounded-full text-sm transition-colors"
                    >
                        + Añadir más
                    </button>
                    <button
                        onClick={onRefresh}
                        className="bg-neutral-700 hover:bg-neutral-600 text-white px-4 py-2 rounded-full text-sm transition-colors"
                    >
                        ↻
                    </button>
                </div>
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto">
                {tracks.map(track => (
                    <TrackCard
                        key={track.id}
                        track={track}
                        isFavorite={favorites.some(f => f.id === track.id)}
                        onRemove={onRemoveTrack}
                        onFavorite={onToggleFavorite}
                    />
                ))}
            </div>

            {savedPlaylist ? (
                <div className="bg-green-500/20 border border-green-500 rounded-lg p-3 text-center">
                    <p className="text-green-500 text-sm mb-2">Playlist guardada lokete</p>
                    <a
                        href={savedPlaylist.external_urls.spotify}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white underline text-sm hover:text-green-400"
                    >
                        Ver en Spotify
                    </a>
                </div>
            ): showNameInput ? (
                <div className="space-y-2">
                    <input
                        type="text"
                        placeholder="Nombre de la playlist..."
                        value={playlistName}
                        onChange={(e) => setPlaylistName(e.target.value)}
                        className="w-full bg-neutral-700 text-white px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                        autoFocus
                    />
                    <div className="flex gap-2">
                        <button
                            onClick={handleSaveToSpotify}
                            disabled={saving || !playlistName.trim()}
                            className="flex-1 bg-green-500 hover:bg-green-400 disabled:bg-green-500/50 text-black font-semibold py-2 rounded-full text-sm transition-colors"
                        >
                            {saving ? 'Guardando...' : 'Guardar en Spotify'}
                        </button>
                        <button
                            onClick={() => setShowNameInput(false)}
                            className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 text-white rounded-full text-sm transition-colors"
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            ) : (
                <button
                    onClick={() => setShowNameInput(true)}
                    className="w-full bg-green-500 hover:bg-green-400 text-black font-semibold py-2 rounded-full text-sm transition-colors"
                >
                    Guardar en Spotify
                </button>
            )}
        </div>
    )
}