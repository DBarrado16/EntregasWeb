const SPOTIFY_API = 'https://api.spotify.com/v1'

async function fetchSpotify(endpoint, token){
    const response = await fetch(`${SPOTIFY_API}${endpoint}`, {
        headers:{
            'Authorization': `Bearer ${token}`
        }
    })

    if(!response.ok){
        throw new Error('Error en la solicitud a Spotify')
    }

    return response.json()
}

export async function searchArtists(query, token){
    const data = await fetchSpotify(`/search?type=artist&q=${encodeURIComponent(query)}&limit=10`, token)
    return data.artists.items
}

export async function searchTracks(query, token){
    const data = await fetchSpotify(`/search?type=track&q=${encodeURIComponent(query)}&limit=10`, token)
    return data.tracks.items
}

export async function searchTracksWithFilters(filters, token){
    let query = ''

    if(filters.artist){
        query += `artist:${filters.artist} `
    }

    if(filters.genre){
        query += `genre:${filters.genre} `
    }

    if(filters.year){
        query += `year:${filters.year} `
    }

    if(filters.query){
        query += filters.query
    }

    //Si no hay query, buscar algo genérico
    if(!query.trim()){
        query = 'year:2025'
    }

    const data = await fetchSpotify(`/search?type=track&q=${encodeURIComponent(query.trim())}&limit=20`, token)
    return data.tracks.items
}

export async function getUserProfile(token){
    return fetchSpotify('/me', token)
}

export async function getTopTracks(token, timeRange = 'medium_term') {
    const data = await fetchSpotify(`/me/top/tracks?time_range=${timeRange}&limit=20`, token)
    return data.items
}

export async function getTopArtists(token, timeRange = 'medium_term') {
    const data = await fetchSpotify(`/me/top/artists?time_range=${timeRange}&limit=20`, token)
    return data.items
}

export async function createPlaylist(userId, name, description, token){
    const response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            description: description,
            public: false
        })
    })

    if(!response.ok){
        throw new Error('Error creando la playlist')
    }

    return response.json()
}

export async function addTracksToPlaylist(playlistId, trackUris, token){
    const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            uris: trackUris
        })
    })

    if(!response.ok){
        throw new Error('Error añadiendo canciones a la playlist')
    }
    
    return response.json()
}