'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import GenreWidget from '../../components/widgets/GenreWidget'

export default function DashboardPage(){
    const router = useRouter()
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const [selectedGenres, setSelectedGenres] = useState([])

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

if(loading){
    return(
        <main className="min-h screen bg-neutral-900 flex items-center justify-center">
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
                <GenreWidget
                    selectedGenres={selectedGenres}
                    onSelect={setSelectedGenres}
                />



            </div>


            <div className="bg-neutral-800 rounded-xl p-4">
                <h3 className="text-white font-semibold mb-2">Selecciones actuales:</h3>
                <p className="text-neutral-400 text-sm">
                    Géneros: {selectedGenres.join(', ') || 'Ninguno'}
                </p>
            </div>
        </div>
    </main>
)
}