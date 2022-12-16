import OSS from "ali-oss";
import { Movie } from "~/types/movie";

export const ossStore = new OSS({
  region: "oss-cn-hangzhou",
  accessKeyId: process.env.ACCESS_KEY_ID as string,
  accessKeySecret: process.env.ACCESS_KEY_SECRET as string,
  bucket: "cq-movie",
});

export async function getMovieList(): Promise<Movie[]> {
  const result = await ossStore.get("movie.json");
  const buf = Buffer.from(result.content);
  return JSON.parse(buf.toString());
}
