export type Program = {
  id: string;
  code: string;
  mode: string;
  name: string;
  chars: [Char];
  chat: [Char];
  tick: number;
  settings: any;
};

export type Char = {
  name: string;
  votes_count: number;
  user_id: number;
};

export enum MaxInputMode {
  Char, // MaxLength = 1
  Word, // Until white space character
  Line, // Until new-line character
}
