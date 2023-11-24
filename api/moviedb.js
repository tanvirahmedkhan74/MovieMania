import axios from "axios";
import {apiKey} from '../constants';

// API TMDB endpoints

const baseUrl = 'https://api.themoviedb.org/3/';
const trendingMoviesEndpoint = `${baseUrl}trending/movie/day?api_key=${apiKey}`;
const upcomingMoviesEndpoint = `${baseUrl}movie/upcoming?api_key=${apiKey}`;
const topRatedMoviesEndpoint = `${baseUrl}movie/top_rated?api_key=${apiKey}`;

// dynamic end points

const movieDetailsEndPoint = id => `${baseUrl}movie/${id}?api_key=${apiKey}`;
const movieCreditsEndPoint = id => `${baseUrl}movie/${id}/credits?api_key=${apiKey}`;
const movieSimilarEndPoint = id => `${baseUrl}movie/${id}/similar?api_key=${apiKey}`;

const personDetailsEndPoint = id => `${baseUrl}person/${id}?api_key=${apiKey}`;
const personMoviesEndPoint = id => `${baseUrl}person/${id}/movie_credits?api_key=${apiKey}`;

const searchMoviesEndpoint = query => `${baseUrl}search/movie?query=${query}&api_key=${apiKey}`;

export const image500 = path => path ? `https://image.tmdb.org/t/p/w500/${path}` : null;
export const image342 = path => path ? `https://image.tmdb.org/t/p/w342/${path}` : null;
export const image185 = path => path ? `https://image.tmdb.org/t/p/w185/${path}` : null;

export const fallBackMoviePoster = 'https://st4.depositphotos.com/14953852/22772/v/450/depositphotos_227725020-stock-illustration-image-available-icon-flat-vector.jpg';
export const fallBackPersonImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqaK3_fCAX0YkP_nkVKAElPhMQf7PdrseDGw&usqp=CAU';

const apiCall = async (endpoint, params) => {
    const options = {
        method: 'GET',
        url: endpoint,
        params: params ? params : {}
    }

    try{
        const response = await axios.request(options);
        return response.data;
    }catch(error){
        console.log('Error: ', error);
        return{}
    }   
}

export const fetchTrendingMovies = ()=> {
    return apiCall(trendingMoviesEndpoint);
}

export const fetchUpcomingMovies = () => {
    return apiCall(upcomingMoviesEndpoint);
}

export const fetchTopRatedMovies = () => {
    return apiCall(topRatedMoviesEndpoint);
}

export const fetchMovieDetails = id => {
    return apiCall(movieDetailsEndPoint(id));
}

export const fetchMovieCredits = id => {
    return apiCall(movieCreditsEndPoint(id));
}

export const fetchMovieSimilar = id => {
    return apiCall(movieSimilarEndPoint(id));
}

export const fetchPersonDetails = id => {
    return apiCall(personDetailsEndPoint(id));
}

export const fetchPersonMovies = id => {
    return apiCall(personMoviesEndPoint(id));
}

export const searchMovies = query => {
    return apiCall(searchMoviesEndpoint(query));
}