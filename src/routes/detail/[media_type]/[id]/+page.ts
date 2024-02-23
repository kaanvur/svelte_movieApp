type ParamsType = {
    media_type: string;
    id: string | number;
};
import { PUBLIC_API_KEY } from '$env/static/public';
export async function load({ params }: { params: ParamsType }) {
    async function fetchMovies() {
        const { media_type, id } = params;
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${PUBLIC_API_KEY}`
            }
        };

        try {
            const response = await fetch(`https://api.themoviedb.org/3/${media_type}/${id}?append_to_response=account_states&language=en-EN`, options);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            let data = await response.json();
            data = { ...data, media_type }
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    };

    return await fetchMovies();
}
