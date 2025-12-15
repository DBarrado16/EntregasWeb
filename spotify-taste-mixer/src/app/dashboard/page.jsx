'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import GenreWidget from '../../components/widgets/GenreWidget'
import PopularityWidget from '../../components/widgets/PopularityWidget'
import DecadeWidget from '../../components/widgets/DecadeWidget'
import ArtistWidget from '@/components/widgets/ArtistWidget'
import TrackWidget from '@/components/widgets/TrackWidget'
import PlaylistDisplay from '@/components/PlaylistDisplay'

export default function DashboardPage(){
        const router = useRouter()
        const [user, setUser] = useState(null)
        const [loading, setLoading] = useState(true)

        //Estado de los widgets
        const [selectedGenres, setSelectedGenres] = useState([])
        const [selectedDecades, setSelectedDecades] = useState([])
        const [selectedPopularity, setSelectedPopularity] = useState(null)
        const [selectedArtists, setSelectedArtists] = useState([])
        const [selectedTracks, setSelectedTracks] = useState([])

        //Estado de la playlist 
        const [playlist, setPlaylist] = useState([])
        const [favorites, setFavorites] = useState([])
        const [generatingPlaylist, setGeneratingPlaylist] = useState(false)

        //Cargar favoritos de localStorage al iniciar
        useEffect(() => {
            const savedFavorites = localStorage.getItem('spotify_favorites')
            if(savedFavorites){
                setFavorites(JSON.parse(savedFavorites))
            }
        }, [])

        //Guardar favoritos en localStorage cuando cambien
        useEffect(() => {
            localStorage.setItem('spotify_favorites', JSON.stringify(favorites))
        }, [favorites])

        useEffect(() => {
            const token = localStorage.getItem('spotify_token')

            if(!token){
                router.push('/')
                return
            }

            const fetchUser = async() => {
                try{
                    const response = await fetch('https://api.spotify.com/v1/me', {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })

                    if(!response.ok){
                        throw new Error('Token inválido o expirado')
                    }

                    const data = await response.json()
                    setUser(data)
                } catch (err){
                    localStorage.removeItem('spotify_token')
                    localStorage.removeItem('spotify_refresh_token')
                    router.push('/')
                } finally {
                    setLoading(false)
                }
            } 
        fetchUser()
    }, [router])

    const handleLogout = () => {
        localStorage.removeItem('spotify_token')
        localStorage.removeItem('spotify_refresh_token')
        localStorage.removeItem('spotify_token_expires')
        router.push('/')
    }

    //Funcion para generar la playlist
    const generatePlaylist = async (addMore = false) => {
        const token = localStorage.getItem('spotify_token')
        if(!token) return

        setGeneratingPlaylist(true)

        try{
            let allTracks = addMore ? [...playlist] : []
            const existingIds = new Set(allTracks.map(t => t.id))

            const queries = []

            selectedArtists.forEach(artist => {
                queries.push(`artist:${artist.name}`)
            })

            selectedGenres.forEach(genre => {
                queries.push(`genre:${genre}`)
            })

            selectedDecades.forEach(decade => {
                queries.push(`year:${decade.start}-${decade.end}`)
            })

            if(queries.length === 0){
                queries.push('top hits')
            }

            for(const query of queries.slice(0, 5)) {
                if(!query) continue

                const response = await fetch(
                    `https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(query)}&limit=10`,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }
                )

                if(response.ok){
                    const data = await response.json()
                    const newTracks = data.tracks.items.filter(t => !existingIds.has(t.id))

                    const filteredTracks = filterByPopularity(newTracks, selectedPopularity)

                    filteredTracks.forEach(track => {
                        if(!existingIds.has(track.id)){
                            existingIds.add(track.id)
                            allTracks.push(track)
                        }
                    })
                }
            }

            selectedTracks.forEach(track => {
                if(!existingIds.has(track.id)) {
                    existingIds.add(track.id)
                    allTracks.push(track)
                }
            })

            allTracks = shuffleArray(allTracks).slice(0, 30)

            setPlaylist(allTracks)
        }catch (err){
            console.error('Error generando la playlist:', err)
        }finally {
            setGeneratingPlaylist(false)
        }
    }

    const filterByPopularity = (tracks, popularity) => {
        if(!popularity) return tracks

        return tracks.filter(track => {
            const pop = track.popularity
            switch(popularity){
                case 'high':
                    return pop >= 70
                case 'medium':
                    return pop >= 40 && pop < 70
                case 'low':
                    return pop < 40
                default:
                    return true
            }
        })
    }

    const shuffleArray = (array) => {
        const shuffled = [...array]
        for (let i = shuffled.length -1; i > 0; i--){
            const j = Math.floor(Math.random() * (i + 1))
            ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
        }
        return shuffled
    }

    const removeTrack = (trackId) => {
        setPlaylist(playlist.filter(t => t.id !== trackId))
    }

    const toggleFavorite = (track) => {
        const exists = favorites.find(f => f.id === track.id)
        if(exists){
            setFavorites(favorites.filter(f => f.id !== track.id))
        } else {
            setFavorites([...favorites, track])
        }
    }


    if(loading){
        return(
            <main className="min-h-screen bg-gradient-to-b from-black via-red-950 to-black flex items-center justify-center">
                <div className="text-center">
                    <div className="mb-4">
                        <img 
                            src="/images/poquitoapoco.png" 
                            alt="El patriarca está preparando el tablao" 
                            className="w-60 h-60 mx-auto rounded-full animate-spin"
                        />
                    </div>
                    <p className="text-yellow-200/70">Preparando el tablao...</p>
                    <p className="text-yellow-200/50 text-sm mt-2">Ole Ole El Arrebato!!</p>
                </div>
            </main>
        )
    }

    return(
        <main className="min-h-screen bg-gradient-to-b from-black via-red-950 to-black p-8">
            <div className="max-w-7xl mx-auto">
                <header className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold text-yellow-500" style={{textShadow: '1px 1px 2px #000'}}>Ritmo Kaló</h1>
                    <div className="flex items-center gap-4">
                        <span className="text-yellow-200/70">
                            Buenas, {user?.display_name} que los Yakis te bendigan!
                        </span>
                        <button
                            onClick={handleLogout}
                            className="bg-red-900/50 hover:bg-red-800 text-yellow-300 px-4 py-2 rounded-full text-sm transition-colors border border-yellow-600/50"
                        >
                            Salir a la calle
                        </button>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <ArtistWidget
                                selectedArtists={selectedArtists}
                                onSelect={setSelectedArtists}
                            />
                            <TrackWidget
                                selectedTracks={selectedTracks}
                                onSelect={setSelectedTracks}
                            />
                            <GenreWidget
                                selectedGenres={selectedGenres}
                                onSelect={setSelectedGenres}
                            />
                            <DecadeWidget
                                selectedDecades={selectedDecades}
                                onSelect={setSelectedDecades}
                            />
                            <PopularityWidget
                                selectedPopularity={selectedPopularity}
                                onSelect={setSelectedPopularity}
                            />
                        </div>

                        <button
                            onClick={() => generatePlaylist(false)}
                            disabled={generatingPlaylist}
                            className="w-full bg-gradient-to-r from-red-700 via-red-600 to-red-700 hover:from-red-600 hover:via-red-500 hover:to-red-600 disabled:opacity-50 text-yellow-300 font-bold py-3 px-6 rounded-full transition-all border-2 border-yellow-600"
                        >
                            {generatingPlaylist ? 'Espera mi arma kel patriarca está preparando tu pleilis' : 'Hablar con el patriarca'}
                        </button>
                    </div>


                    <div className="lg:col-span-1">
                        <PlaylistDisplay
                            tracks={playlist}
                            favorites={favorites}
                            onRemoveTrack={removeTrack}
                            onToggleFavorite={toggleFavorite}
                            onRefresh={() => generatePlaylist(false)}
                            onAddMore={() => generatePlaylist(true)}
                            loading={generatingPlaylist}
                            userId={user?.id}
                        />
                    </div>
                </div>
            </div>
        </main>
    )
}