const API_KEY = "cec1dbc5f2281d2a147e666dc08b5e0f";
const BASE_URL = "https://api.themoviedb.org/3";



interface BaseResponse {
    page:number;
    total_results:number;
    total_pages:number;
}

export interface Movie{
    adult:boolean,
    backdrop_path:string|null,
    genre_ids:number[],
    id:number,
    original_language:string,
    original_title:string,
    overview:string,
    popularity:number,
    poster_path:string|null,
    release_date:string,
    title:string,
    video:boolean,
    vote_average:number,
    vote_count:number,
}

export interface MovieResponse extends BaseResponse{
    results:Movie[]
}

const getTrending = () => 
    fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=en-US&page=1&region=KR`).then(response => response.json())

const getUpcoming = () => 
    fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1&region=KR`).then(response => response.json())


const getNowPlaying = () =>
    fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`).then(response => response.json())



export const moviesApi = { getTrending,getUpcoming,getNowPlaying}
