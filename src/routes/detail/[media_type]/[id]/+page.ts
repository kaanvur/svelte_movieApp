type ParamsType = {
    media_type: string;
    id: string | number;
};
export interface MovieData {
    id: number;
    title: string;
    name: string;
    original_title: string;
    overview: string;
    release_date: string;
    runtime: number;
    genres: Array<{ id: number; name: string }>;
    vote_average: number;
    vote_count: number;
    poster_path: string | null;
    backdrop_path: string | null;
    popularity: number;
    adult: boolean;
    video: boolean;
    media_type: string;
    original_language: string;
    first_air_date: Date;
    account_states: { watchlist: boolean };
    last_episode_to_air: { runtime: string };
}
import { fetchMovies } from '$lib/dataStore';

export async function load({ params }: { params: ParamsType }) {
    const { media_type, id } = params;
    let data: MovieData | null = null;
    try {
        const moviesUrl = `https://api.themoviedb.org/3/${media_type}/${id}?append_to_response=account_states&language=en-EN`;
        const movies = await fetchMovies(moviesUrl);
        data = movies[0] as unknown as MovieData;
        data.media_type = media_type;

    } catch (error) {
        console.error('Error fetching movies:', error);
    }

    return data;
}
