import { PUBLIC_API_KEY } from '$env/static/public';
import { writable } from 'svelte/store';
const isLoading = writable<boolean>(false);
const watchlistNeedFetchStore = writable<boolean>(false);
const dataStore = writable<Movie[]>([]);
type Movie = { url: string; };
let unsubscribe: () => void;
let watchlistNeedFetch: boolean = false;
async function fetchMovies(url: string): Promise<Movie[]> {
    watchlistNeedFetchStore.subscribe(value => {
        watchlistNeedFetch = value;
    });
    const isWatchListPage = window.location.pathname.includes("/watch-list");
    try {
        // isLoading.set(true);
        let existingMovieData: Movie[] = [];
        const existingDataPromise = new Promise<Movie[]>((resolve) => {
            if (watchlistNeedFetch && isWatchListPage) {
                resolve([])
            }
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
            moviesWithUrl = fetchedMovies.cast ? fetchedMovies.cast.map((cast: Movie) => ({
                ...cast,
                url: url,
            })) : [{ ...fetchedMovies, url: url }];
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

export { isLoading, fetchMovies, watchlistNeedFetchStore };
