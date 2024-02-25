import { PUBLIC_API_KEY } from '$env/static/public';
import { writable } from 'svelte/store';

const isLoading = writable(false);

const dataStore = writable<Movie[]>([]);
type Movie = { url: string; };
let unsubscribe: () => void;

async function fetchMovies(url: string): Promise<Movie[]> {
    try {
        isLoading.set(true);

        let existingMovieData: Movie[] = [];
        const existingDataPromise = new Promise<Movie[]>((resolve) => {
            unsubscribe = dataStore.subscribe((data) => {
                existingMovieData = data.filter((movie) => movie.url === url);
                resolve(existingMovieData);
            });
        });

        const movies = await existingDataPromise;

        if (movies.length > 0) {
            console.log('Movie data already exists:', movies);
            isLoading.set(false);
            return movies;
        }

        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${PUBLIC_API_KEY}`,
            },
        };

        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const fetchedMovies = await response.json();
        let moviesWithUrl: [] = [];
        if (fetchedMovies.results) {
            moviesWithUrl = fetchedMovies.results?.map((movie: Movie) => {
                return {
                    ...movie,
                    url: url,
                };
            });
        }
        if (!fetchedMovies.results) {
            moviesWithUrl = fetchedMovies.cast?.map((cast: Movie) => {
                return {
                    ...cast,
                    url: url,
                };
            });
        }

        dataStore.update((data) => [...data, ...moviesWithUrl]);
        isLoading.set(false);
        return moviesWithUrl;
    } catch (error) {
        console.error('Error fetching movies:', error);
        isLoading.set(false);
        throw error;
    } finally {
        if (unsubscribe) {
            unsubscribe();
        }
    }
}

export { isLoading, fetchMovies };
