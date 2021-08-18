let timer = null;

export function debounce(fn, time) {
  if(timer) {
    clearTimeout(timer);
  }
  timer = setTimeout(fn, time);
}

export function getPlaylist(authToken) {
  // https://open.spotify.com/playlist/7s6MOTbFPscC1Ls4DrxqdS?si=afa90052cf8c43f7

  return fetch(`https://api.spotify.com/v1/playlists/7s6MOTbFPscC1Ls4DrxqdS?fields=${encodeURIComponent('id, tracks.items(track(name, uri))')}`, { //
    method: 'GET',
    mode: 'cors',
    cache: 'default',
    headers : {
      'Content-Type' : 'application/json',
      'Authorization' : `Bearer ${authToken}`
    }
  })
    .then(response => response.json())
}

export async function transferPlayback(authToken, device_id) {
  let data = {
    device_ids: [device_id],
    play: false,
  }
  // https://api.spotify.com/v1/me/player
  await fetch(`https://api.spotify.com/v1/me/player`, {
    method: 'PUT',
    mode: 'cors',
    cache: 'default',
    headers : {
      'Content-Type' : 'application/json',
      'Authorization' : `Bearer ${authToken}`
    },
    body: JSON.stringify(data)
  })
  .catch(err => console.error(err));
}

export async function addPlaylistToQueue(authToken, uris, deviceId) {
  for(let uri of uris) {
    await fetch(`https://api.spotify.com/v1/me/player/queue?uri=${uri}&device_id=${deviceId}`, {
      method: 'POST',
      mode: 'cors',
      cache: 'default',
      headers : {
        'Content-Type' : 'application/json',
        'Authorization' : `Bearer ${authToken}`
      }
    });
  }
}