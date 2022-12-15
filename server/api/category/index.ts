import { Movie } from "~/types/movie";
import { getMovieList } from "../../common/store";

export default defineEventHandler(async (event) => {
  const movieList = await getMovieList();
  const set = new Set();
  const results: Movie["movieTypes"] = [];
  return [...new Set(movieList.map((item) => item.categories).flat())].map((item) => ({
    id: item,
    name: item,
  }));
});
