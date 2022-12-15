import { getMovieList } from "../../common/store";

export default defineEventHandler(async (event) => {
  const movieList = await getMovieList();
  const comming = movieList.filter((item) => item.isPlay == "0");
  const playing = movieList.filter((item) => item.isPlay == "1");
  return {
    comming: {
      count: comming.length,
      movies: comming.slice(0, 8),
    },
    playing: {
      count: playing.length,
      movies: playing.slice(0, 8),
    },
  };
});
