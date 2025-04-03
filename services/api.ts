// http://www.omdbapi.com/?apikey=[yourkey]
export const TMDB_CONFIG = {
  BASE_URL: 'https://api.themoviedb.org/3',
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`
  }
};

export const BE_CONFIG = {
  BASE_URL: 'https://backend-absolute-cinema-production.up.railway.app',
  headers: {
    "Content-Type": "application/json"
  }
}

export async function fetchMovies({ query }: { query:string }) {
  const endpoint = query ? 
    `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}` 
      :`${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

  const response = await fetch(endpoint, {
    method: 'GET',
    headers: TMDB_CONFIG.headers
  });
    
  if (!response.ok) {
    console.log(response);
    // @ts-ignore
    throw new Error('Failed fetch movie', response.statusText)
  }

  const data = await response.json()
    
  return data.results;
}

export async function fetchMovieDetails(movieId: string): Promise<MovieDetails> {
  try {
    const response = await fetch(
      `${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`,
      {
        method: "GET",
        headers: TMDB_CONFIG.headers,
      }
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch movie details: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
}

export async function fetchRegistration(name: string, email: string, password: string) {
  try {
    const response = await fetch(`${BE_CONFIG.BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: BE_CONFIG.headers, 
      body: JSON.stringify({ name, email, password })
    });

    const data = await response.json();
    
    if (!response.ok && response.status != 400 && response.status != 404) {
      throw new Error(`Error ${response.status}: ${data.message || "Something went wrong"}`)
    }

    return { statusCode: response.status, data }
  } catch (error) {
    console.error("Error fetching registration user:", error);
    throw error;
  }
}

export async function fetchLogin(email: string, password: string) {
  try {
    const response = await fetch(`${BE_CONFIG.BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: BE_CONFIG.headers,
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok && response.status != 400 && response.status != 404) {
      throw new Error(`Error ${response.status}: ${data.message || "Something went wrong"}`)
    }

    return { statusCode: response.status, data }
  } catch (error) {
    console.error("Error fetching registration user:", error);
    throw error;
  }
}

export async function fetchUser(token: string | null) {
  try {
    const response = await fetch(`${BE_CONFIG.BASE_URL}/api/user`, {
      method: 'GET',
      headers: {
        ...BE_CONFIG.headers,
        Authorization: `Bearer ${token}`
      }
    });

    const data = await response.json();
    
    return { data };
  } catch (error) {
    console.error("Error fetching registration user:", error);
    throw error;
  }
}

export async function fetchSaveMovie(token: string | null, movie: MovieDetails) {
  try {
    const response = await fetch(`${BE_CONFIG.BASE_URL}/api/movie`, {
      method: 'POST',
      headers: {
        ...BE_CONFIG.headers,
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ movie_id: movie.id, title: movie.title, poster_url: movie.poster_path })
    });
    
    const data = await response.json();
    
    return { statusCode: response.status, ...data };
  } catch (error) {
    console.error("Error fetching registration user:", error);
    throw error;
  }
}

export async function fetchGetSavedMovie(token: string | null) {
  try {
    const response = await fetch(`${BE_CONFIG.BASE_URL}/api/movie`, {
      method: 'GET',
      headers: {
        ...BE_CONFIG.headers,
        Authorization: `Bearer ${token}`
      }
    });
    
    const data = await response.json();
    
    return data;
  } catch (error) {
    console.error("Error fetching registration user:", error);
    throw error;
  }
}

export async function fetchRemoveSavedMovie(token: string | null, movie_id: number) {
  try {
    const response = await fetch(`${BE_CONFIG.BASE_URL}/api/movie/${movie_id}`, {
      method: 'DELETE',
      headers: {
        ...BE_CONFIG.headers,
        Authorization: `Bearer ${token}`
      }
    });
    
    const data = await response.json();
    
    return { statusCode: response.status, ...data};
  } catch (error) {
    console.error("Error fetching registration user:", error);
    throw error;
  }
}
