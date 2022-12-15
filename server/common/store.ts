import OSS from "ali-oss";
import { Movie } from "~/types/movie";

export const ossStore = new OSS({
  region: "oss-cn-hangzhou",
  accessKeyId: "LTAI5tHf6iAgityVBwrjWSvq",
  accessKeySecret: "Iir8GqjslMdoH3cfHOba6AzxKiUh0U",
  bucket: "cq-movie",
});

export async function getMovieList(): Promise<Movie[]> {
  const result = await ossStore.get("movie.json");
  const buf = Buffer.from(result.content);
  return JSON.parse(buf.toString());
}
