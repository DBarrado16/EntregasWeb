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
            setError('El espotifai no te deja a que mal payo le has robao??')
            return
        }

        if(!code){
            setError('Ke nos falta el codigo miarma')
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
                    setError(data.error || '¡Ayy ke se ma roto el token niño!')
                    return
                }

                localStorage.setItem('spotify_token', data.access_token)
                localStorage.setItem('spotify_refresh_token', data.refresh_token)
                localStorage.setItem('spotify_token_expires', Date.now() + data.expires_in * 1000)

                router.push('/dashboard')
            } catch (err){
                setError('Un mal payo nos ha cortao la conesión primo')
            }
        }

        exchangeToken()
    }, [searchParams, router])

    if (error) {
        return(
            <main className="min-h-screen bg-gradient-to-b from-black via-red-950 to-black flex flex-col items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-red-400 mb-4">Error</h1>
                    <p className="text-yellow-200/70 mb-6">{error}</p>
                    <a
                        href="/"
                        className="text-yellow-500 hover:text-yellow-400 underline"
                    >
                        Volver a la entrada
                    </a>
                </div>
            </main>
        )
    }



    return(
        <main className="min-h-screen bg-gradient-to-b from-black via-red-950 to-black flex flex-col items-center justify-center">
            <div className="text-center">
                <img 
                    src="/images/poquitoapoco.png" 
                    alt="El patriarca está preparando el tablao" 
                    className="w-60 h-60 mx-auto rounded-full animate-spin"
                />
                <p className="text-yellow-200/70">Preparando el tablao...</p>
                <p className="text-yellow-200/50 text-sm mt-2">Ole Ole Mis Chunguitos!!</p>
            </div>
        </main>
    )
}