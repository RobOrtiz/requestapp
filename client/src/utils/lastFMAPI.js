import axios from "axios";

function lastFMAPI(artist, track) {
    const API_KEY = process.env.REACT_APP_LASTFM_API_KEY;
    const urlArtist = artist.trim().split(' ').join("+").toLowerCase();
    const urlTrack = track.trim().split(' ').join("+").toLowerCase();

    let url = `http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=${API_KEY}&artist=${urlArtist}=${urlTrack}&format=json`;

    return axios.get(url);
}

export default lastFMAPI;