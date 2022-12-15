export interface Response<T> {
  code: number;
  errMsg: string;
  data: T;
}
