export interface RequestData {
  body?: any;
  parser?: Parser;
  tester?: Tester;
  url: string;
}

export type Parser = (data: any) => any;

export type Tester = (data: any) => boolean;

export interface ReqError {
  error: any;
  status: number;
}
