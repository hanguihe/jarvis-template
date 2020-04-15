export interface ExampleResponse {
  code: number;
  msg: string;
}

export interface ExampleData {
  id: number;
  name: string;
  gender: string;
  age: number;
  blood: string;
  birthday: string;
  height: string;
  weight: string;
  character: string;
  attribute: string;
  skills: string[];
}

export interface ExampleDataResponse extends ExampleResponse {
  data: Array<ExampleData>;
}
