export interface SizerState {
  status?: string;
  rate?: [number, number];
  categories?: number[];
  [index: string]: string | number[] | undefined;
}
