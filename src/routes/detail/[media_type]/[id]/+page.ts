type ParamsType = {
    media_type: string;
    id: string | number;
};
import { fetchMovies } from '$lib/dataStore';

export async function load({ params }: { params: ParamsType }) {
    let data: any = null;
    const { media_type, id } = params;

    try {
        const moviesUrl = `https://api.themoviedb.org/3/${media_type}/${id}?append_to_response=account_states&language=en-EN`;
        const movies = await fetchMovies(moviesUrl);
        data = movies[0];
        data = { ...data, media_type };
    } catch (error) {
        console.error('Error fetching movies:', error);
    }

    return data;
}
