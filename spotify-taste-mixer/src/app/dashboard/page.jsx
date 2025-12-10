'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import GenreWidget from '../../components/widgets/GenreWidget'
import MoodWidget from '../../components/widgets/MoodWidget'
import PopularityWidget from '../../components/widgets/PopularityWidget'
import DecadeWidget from '../../components/widgets/DecadeWidget'
import ArtistWidget from '@/components/widgets/ArtistWidget'
import TrackWidget from '@/components/widgets/TrackWidget'
import PlaylistDisplay from '@/components/PlaylistDisplay'

export default function DashboardPage(){
        const router = useRouter()
        const [user, setUser] = useState(null)
        const [loading, setLoading] = useState(true)

        const [selectedGenres, setSelectedGenres] = useState([])
        const [selectedDecades, setSelectedDecades] = useState([])
        const [selectedMood, setSelectedMood] = useState(null)
        const [selectedPopularity, setSelectedPopularity] = useState(null)
        const [selectedArtists, setSelectedArtists] = useState([])
        const [selectedTracks, setSelectedTracks] = useState([])

        const [playlist, setPlaylist] = useState([])
        const [favorites, setFavorites] = useState([])
        const [generatingPlaylist, setGeneratingPlaylist] = useState(false)

        useEffect(() => {
            const savedFavorites = localStorage.getItem('spotify_favorites')
            if(savedFavorites){
                setFavorites(JSON.parse(savedFavorites))
            }
        }, [])

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

            if (selectedMood){
                const moodQueries = {
                    energetic: 'workout energy',
                    chill: 'chill relax',
                    sad: 'sad melancholy',
                    party: 'party dance',
                    calm: 'calm peaceful',
                    motivating: 'motivation power'
                }
                queries.push(moodQueries[selectedMood.value] || '')
            }

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
            <main className="min-h-screen bg-neutral-900 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
            </main>
        )
    }

    return(
        <main className="min-h-screen bg-neutral-900 p-8">
            <div className="max-w-6xl mx-auto">
                <header className="max-w-6xl mx-auto">
                    <h1 className="text-2xl font-bold text-white">Spotify Taste Mixer</h1>
                    <div className="flex items-center gap-4">
                        <span className="text-neutral-400">
                            Hola, {user?.display_name}
                        </span>
                        <button
                            onClick={handleLogout}
                            className="bg-neutral-800 hover:bg-neutral-700 text-white px-4 py-2 rounded-full text-sm transition-colors"
                        >
                            Cerrar sesión
                        </button>
                    </div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
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
                            <MoodWidget
                                selectedMood={selectedMood}
                                onSelect={setSelectedMood}
                            />
                            <PopularityWidget
                                selectedPopularity={selectedPopularity}
                                onSelect={setSelectedPopularity}
                            />
                        </div>

                        <button
                            onClick={() => generatePlaylist(false)}
                            disabled={generatingPlaylist}
                            className="w-full bg-green-500 hover:bg-green-400 disabled:bg-green-500/50 text-black font-semibold py-3 px-6 rounded-full transition-colors"
                        >
                            {generatingPlaylist ? 'Generando, mira un monito para que te entretenga mientras tanto -->🐒' : 'Generar Playlist'}
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