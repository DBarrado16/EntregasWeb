'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function CallbackPage(){
    const router = useRouter()
    const searchParams = useSearchParams()
    const [error, setError] = useState(null)

    useEffect(() => {
        const code = searchParams.get('code')
        const errorParam = searchParams.get('error')

        if(errorParam){
            setError('Acceso denegado por el usuario')
            return
        }

        if(!code){
            setError('No se recibió el codigo de autorización')
            return
        }

        const exchangeToken = async() => {
            try{
                const response = await fetch('/api/spotify-token', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ code })
                })

                const data = await response.json()

                if(!response.ok){
                    setError(data.error || 'Error al obtener token')
                    return
                }

                localStorage.setItem('spotify_token', data.access_token)
                localStorage.setItem('spotify_refresh_token', data.refresh_token)
                localStorage.setItem('spotify_token_expires', Date.now() + data.expires_in * 1000)

                router.push('/dashboard')
            } catch (err){
                setError('Error de conexión')
            }
        }

        exchangeToken()
    }, [searchParams, router])

    if (error) {
        return(
            <main className="min-h-screen bg-neutral-900 flex flex-col items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-red-500 mb-4">Error</h1>
                    <p className="text-neutral-400 mb-6">{error}</p>
                    <a
                        href="/"
                        className="text-green-500 hover:text-green-400 underline"
                    >
                        Volver a inicio
                    </a>
                </div>
            </main>
        )
    }



    return(
        <main className="min-h-screen bg-neutral-900 flex flex-col items-center justify-center">
            <div className="text-center">
                <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-neutral-400">Conectando con Spotify...</p>
            </div>
        </main>
    )
}