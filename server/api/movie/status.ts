import { getMovieList } from "../../common/store";

interface Query {
  status?: string;
  page?: number;
  pageSize?: number;
}

export default defineEventHandler(async (event) => {
  const query = getQuery(event) as Query;
  let movieList = await getMovieList();

  if (query.status) {
    movieList = movieList.filter((item) => item.isPlay == query.status);
  }

  const total = movieList.length;
  const start = (query.page || 0) * (query.pageSize || 0);

  return {
    total,
    list: movieList.slice(start, start + (query.pageSize || 0)),
  };
});
