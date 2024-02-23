const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZDVlYzkyYWNiZTNjMzRhYjEzMTYyMTdhZWI5MzRiNyIsInN1YiI6IjY1ZDc2NDQwZTZkM2NjMDE2MmMwYmI0YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hnCU5v9EpHEJLW4i5fc0p1tE8o48mkaq2W2leV7hYVg'
    }
};

fetch('https://api.themoviedb.org/3/trending/all/day?language=tr-TR', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));