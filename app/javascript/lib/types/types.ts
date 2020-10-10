export type Program = {
  id: string;
  code: string;
  mode: string;
  name: string;
  chars: [Char];
  output: string;
  messages: [Message];
  tick: number;
  settings: any;
};

export type Char = {
  id: number;
  name: string;
  votes_count: number;
};

export type Message = {
  id: number;
  name: string;
  is_code: boolean;
  user_id: number;
};

export enum MaxInputMode {
  Char, // MaxLength = 1
  Word, // Until white space character
  Line, // Until new-line character
}
