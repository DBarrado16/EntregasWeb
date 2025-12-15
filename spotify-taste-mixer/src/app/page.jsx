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
  <main className="min-h-screen bg-gradient-to-b from-black via-red-950 to-black flex flex-col items-center justify-center p-4">
    <div className="text-center">
      <img src="/images/losYakis.png" alt="Los Yakis, que grandes son" className="w-120 h-72 mx-auto" />
      <h1 className="text-5xl font-bold text-yellow-500 mb-2">Ritmo Kaló</h1>
      <p className="text-yellow-200/80 mb-2 text-lg">Pa tos los rumberos y requetonas del barrio suprimo</p>
      <p className="text-yellow-200/50 mb-8 text-sm italic">"Aro aro, ¿quién no tiene Spotify primo?"</p>
      <button
        onClick={handleLogin}
        className="bg-gradient-to-r from-red-700 via-red-600 to-red-700 hover:from-red-600 hover:via-red-500 hover:to-red-600 text-yellow-300 font-bold py-4 px-8 rounded-full transition-all duration-200 text-lg shadow-lg shadow-red-900/50 hover:scale-105 border-2 border-yellow-600 flex items-center gap-2 mx-auto">
        Entrar al Tablao
      </button>
      <p className="text-yellow-200/30 mt-8 text-xs italic">
        *Necesitas un Spotify, si no lo encuentras, pideselo al payo más cercano*
      </p>
    </div>
  </main>
)
}