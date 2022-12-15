import { getMovieList } from "../../common/store";

interface Query {
  status?: string;
  rate?: string;
  categories?: string;
}

export default defineEventHandler(async (event) => {
  const query = getQuery(event) as Query;
  let movieList = await getMovieList();

  if (query.status) {
    movieList = movieList.filter((item) => item.isPlay == query.status);
  }

  if (query.categories) {
    const list = JSON.parse(query.categories) as string[];
    movieList = movieList.filter((item) => item.categories.some((v) => list.includes(v)));
  }

  if (query.rate) {
    const rate = JSON.parse(query.rate) as [number, number];
    movieList = movieList.filter((item) => +item.rate >= rate[0] && +item.rate <= rate[1]);
  }

  return movieList;
});
