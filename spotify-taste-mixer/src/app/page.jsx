'use client'

export default function LoginPage(){
  const handleLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID
    const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI
    const scopes = [
      'playlist-modify-public',
      'playlist-modify-private',
      'user-top-read',
      'user-read-private'
    ]

    console.log('Client ID:', clientId)
    console.log('Redirect URI:', redirectUri)

    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes.join(' '))}`

    window.location.href = authUrl
  }

return(
  <main className="min-h-screen bg-gradient-to-b from neutral-900 to-black flex flex-col items-center justify-center">
    <div className="text-center">
      <h1 className="text-5xl font-bold text-white mb-4">SpotiDoro</h1>
      <p className="text-neutral-400 mb-8 text-lg">Genera playlists a partir de lo que te gusta niño</p>
      <button
        onClick={handleLogin}
        className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-200 text-lg"
      >Iniciar sesión con Spotify
      </button>
    </div>
  </main>
)
}