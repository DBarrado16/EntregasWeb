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
                '¡Olé! Playlist creada con arte 💃',
                token
            )

            const trackUris = tracks.map(t => t.uri)
            await addTracksToPlaylist(playlist.id, trackUris, token)

            setSavedPlaylist(playlist)
            setShowNameInput(false)
            setPlaylistName('')
        } catch(err){
            console.error('No sa podío guardar válgame!:', err)
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
        return (
            <div className="bg-gradient-to-br from-red-950/80 to-amber-950/80 rounded-2xl p-8 text-center border-2 border-amber-500/30 shadow-xl shadow-red-900/20">
                <div className="w-12 h-12 border-4 border-amber-500 border-t-red-500 rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-amber-200/80 italic" style={{ fontFamily: 'Georgia, serif' }}>El patriarca está haciendo sus cosicas</p>
            </div>
        )
    }

    if(tracks.length === 0){
        return (
            <div className="bg-gradient-to-br from-red-950/80 to-amber-950/80 rounded-2xl p-8 text-center border-2 border-amber-500/30 shadow-xl shadow-red-900/20 relative overflow-hidden">
                <img src="/images/canelita.png" alt="Canelita" className="w-50 h-55 mx-auto mb-4" />
                <p className="text-amber-200/80 italic text-lg" style={{ fontFamily: 'Georgia, serif' }}>
                    Configura tó y dale comba pa que las niña se muevan solas!
                </p>
            </div>
        )
    }

    return (
        <div className="bg-gradient-to-br from-red-950/90 to-amber-950/90 rounded-2xl p-5 border-2 border-amber-500/40 shadow-2xl shadow-red-900/30 relative overflow-hidden">
            <div className="flex items-center justify-between mb-5">
                <div>
                    <h3 className="text-amber-100 font-bold text-xl flex items-center gap-2" style={{ fontFamily: 'Georgia, serif' }}>Tu Pleilis</h3>
                    <p className="text-amber-400/70 text-sm italic">{tracks.length} Rumbitas de las wenas</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={onAddMore}
                        className="bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-amber-100 px-4 py-2 rounded-full text-sm transition-all duration-300 shadow-lg hover:shadow-amber-500/30 border border-amber-500/30"
                    >
                        + Más arte
                    </button>
                    <button
                        onClick={onRefresh}
                        className="bg-gradient-to-r from-red-800 to-red-700 hover:from-red-700 hover:to-red-600 text-red-100 px-4 py-2 rounded-full text-sm transition-all duration-300 shadow-lg hover:shadow-red-500/30 border border-red-500/30"
                    >
                        ↻
                    </button>
                </div>
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-amber-600 scrollbar-track-transparent">
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

            <div className="mt-5">
            {savedPlaylist ? (
                <div className="bg-gradient-to-r from-amber-500/20 to-red-500/20 border-2 border-amber-500 rounded-xl p-4 text-center">
                    <p className="text-amber-300 text-sm mb-2 flex items-center justify-center gap-2">Playlist guardá con arte</p>
                    <a
                        href={savedPlaylist.external_urls.spotify}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-amber-100 underline text-sm hover:text-amber-300 transition-colors"
                    >
                        Ver en Spotify
                    </a>
                </div>
            ): showNameInput ? (
                <div className="space-y-3">
                    <input
                        type="text"
                        placeholder="Dile el nombre al patriarca..."
                        value={playlistName}
                        onChange={(e) => setPlaylistName(e.target.value)}
                        className="w-full bg-red-900/50 text-amber-100 px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 border border-amber-500/30 placeholder-amber-300/50" style={{ fontFamily: 'Georgia, serif' }}
                        autoFocus
                    />
                    <div className="flex gap-2">
                        <button
                            onClick={handleSaveToSpotify}
                            disabled={saving || !playlistName.trim()}
                            className="flex-1 bg-gradient-to-r from-amber-500 to-red-500 hover:from-amber-400 hover:to-red-400 disabled:from-amber-500/50 disabled:to-red-500/50 text-white font-bold py-3 rounded-full text-sm transition-all duration-300 shadow-lg hover:shadow-amber-500/50"
                        >
                            {saving ? 'Guardando...' : 'Guardarlo en Spotify'}
                        </button>
                        <button
                            onClick={() => setShowNameInput(false)}
                            className="px-5 py-3 bg-red-900/50 hover:bg-red-800/50 text-amber-200 rounded-full text-sm transition-colors border border-red-500/30"
                        >
                            Cancelale ahi
                        </button>
                    </div>
                </div>
            ) : (
                <button
                    onClick={() => setShowNameInput(true)}
                    className="w-full bg-gradient-to-r from-amber-500 via-red-500 to-amber-500 hover:from-amber-400 hover:via-red-400 hover:to-amber-400 text-white font-bold py-3 rounded-full text-sm transition-all duration-300 shadow-xl hover:shadow-amber-500/50 flex items-center justify-center gap-2 border-2 border-amber-400/30"
                >
                    Robarl... digoo guardarla
                </button>
            )}
            </div>
        </div>
    )
}