//Componente para mostrar cada canción de la playlist
'use client'

export default function TrackCard({ track, onRemove, onFavorite, isFavorite }){
    return (
        <div className="flex items-center gap-3 bg-gradient-to-r from-red-900/60 to-amber-900/40 p-3 rounded-xl group border border-amber-500/20 hover:border-amber-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/10">
            {track.album.images[2] ? (
                <img
                    src={track.album.images[2].url}
                    alt={track.album.name}
                    className="w-12 h-12 rounded-lg object-cover ring-2 ring-amber-500/30 group-hover:ring-amber-500/60 transition-all"
                />
            ) : (
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-red-800 to-amber-800 flex items-center justify-center ring-2 ring-amber-500/30">
                    🎵
                </div>
            )}

            <div className="flex-1 overflow-hidden">
                <p className="text-amber-100 text-sm font-semibold truncate" style={{ fontFamily: 'Georgia, serif' }}>
                    {track.name}
                </p>
                <p className="text-amber-300/60 text-xs truncate">
                    {track.artists?.map(a => a.name).join(', ')}
                </p>
            </div>

            <span className="text-amber-400/50 text-xs font-mono">
                {Math.floor(track.duration_ms / 60000)}:{String(Math.floor((track.duration_ms % 60000) / 1000)).padStart(2, '0')}
            </span>

            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <button
                    onClick={() => onFavorite(track)}
                    className={`p-2 rounded-full transition-all duration-300 ${
                        isFavorite
                            ? 'text-amber-400 hover:text-amber-300 scale-110'
                            : 'text-amber-500/50 hover:text-amber-400'
                    }`}
                    title={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                >
                    {isFavorite ? '★' : '☆'}
                </button>
                <button
                    onClick={() => onRemove(track.id)}
                    className="p-2 rounded-full text-red-400/50 hover:text-red-400 hover:bg-red-500/20 transition-all duration-300"
                    title="Mala ruina pa esta canción"
                >
                    x
                </button>
            </div>
        </div>
    )
}