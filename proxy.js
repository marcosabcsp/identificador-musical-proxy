// Proxy seguro para busca no Spotify (open source)
// Não expõe Client Secret — apenas repassa requisições

async function getSpotifyLink(title, artist) {
  const query = encodeURIComponent(`${title} ${artist}`);
  const url = `https://embed.spotify.com/v1/sdk/search?q=${query}&type=track&limit=1`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.tracks && data.tracks.items && data.tracks.items[0]) {
      return data.tracks.items[0].external_urls.spotify;
    }
  } catch (e) {
    console.error("Erro ao buscar no Spotify:", e);
  }
  return null;
}

// Esta página só serve como endpoint — não tem interface visual
// O app móvel fará requisições diretamente via parâmetros (implementado no Flutter)