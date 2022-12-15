import { getMovieList } from "../../common/store";

interface Query {
  keyword?: string;
}

export default defineEventHandler(async (event) => {
  const query = getQuery(event) as Query;
  let movieList = await getMovieList();

  if (query.keyword) {
    movieList = movieList.filter((item) => item.title.includes(query.keyword!) || item.summary.includes(query.keyword!));
  }

  return movieList;
});
