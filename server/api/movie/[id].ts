import { Movie } from "~/types/movie";
import movie from ".";
import { getMovieList } from "../../common/store";

function getSimilarity(moive: Movie, types: string[]) {
  return moive.categories.filter((_) => _).reduce((a, c) => (types.includes(c) ? a + 1 : a), 0);
}

function getRelativeList(movieList: Movie[], movie: Movie) {
  if (!movie.categories) {
    movie.categories = [];
  }
  const categorys = movie.categories.map((item) => item).filter(Boolean);
  return movieList
    .sort((a, b) => {
      return getSimilarity(b, categorys) - getSimilarity(a, categorys);
    })
    .slice(0, 10);
}

export default defineEventHandler(async (event) => {
  let movieList = await getMovieList();
  const id: string = event.context.params.id;
  const current = movieList.find((item) => item.id === id);

  if (!current) return "Not Found";

  return {
    movie: current,
    relativeMovies: getRelativeList(
      movieList.filter((item) => item.id !== id),
      current
    ),
  };
});
