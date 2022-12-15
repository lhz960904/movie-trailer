import { getMovieList } from "../../common/store";

export default defineEventHandler(async (event) => {
  const movieList = await getMovieList();
  return movieList.sort((a, b) => +(b.rate || 0) - +(a.rate || 0)).slice(0, 10);
});
