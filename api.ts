const API_KEY = "cec1dbc5f2281d2a147e666dc08b5e0f";
const BASE_URL = "https://api.themoviedb.org/3";

const getTrending = () => 
    fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=en-US&page=1&region=KR`).then(response => response.json())

const getUpcoming = () => 
    fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1&region=KR`).then(response => response.json())


const getNowPlaying = () =>
    fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`).then(response => response.json())



export const moviesApi = { getTrending,getUpcoming,getNowPlaying}
