//Componente para mostrar cada canción de la playlist
'use client'

export default function TrackCard({ track, onRemove, onFavorite, isFavorite }){
    return (
        <div className="flex items-center gap-3 bg-neutral-800 p-3 rounded-lg group">
            {track.album.images[2] ? (
                <img
                    src={track.album.images[2].url}
                    alt={track.album.name}
                    className="w-12 h-12 rounded object-cover"
                />
            ) : (
                <div className="w-12 h-12 rounded bg-neutral-700 flex items-center justify-center">
                    🎵
                </div>
            )}

            <div className="flex-1 overflow-hidden">
                <p className="text-white text-sm font-medium truncate">{track.name}</p>
                <p className="text-neutral-400 text-xs truncate">
                    {track.artists?.map(a => a.name).join(', ')}
                </p>
            </div>

            <span className="text-neutral-500 text-xs">
                {Math.floor(track.duration_ms / 60000)}:{String(Math.floor((track.duration_ms % 60000) / 1000)).padStart(2, '0')}
            </span>

            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                    onClick={() => onFavorite(track)}
                    className={`p-2 rounded-full transition-colors ${
                        isFavorite
                            ? 'text-green-500 hover:text-green-400'
                            : 'text-neutral-400 hover:text-white'
                    }`}
                    title={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                >
                    {isFavorite ? '★' : '☆'}
                </button>
                <button
                    onClick={() => onRemove(track.id)}
                    className="p-2 rounded-full text-neutral-400 hover:text-red-500 transition-colors"
                    title="Eliminar de la playlist"
                >
                    x
                </button>
            </div>
        </div>
    )
}