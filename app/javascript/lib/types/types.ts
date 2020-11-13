export type Program = {
  id: string;
  code: string;
  mode: string;
  name: string;
  chars: [Char];
  output: string;
  messages: [Message];
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

export const maxInputModeToInt = (mim: MaxInputMode) => {
  switch (mim) {
    case MaxInputMode.Char:
      return 1;
    case MaxInputMode.Word:
      return 5;
    case MaxInputMode.Line:
      return 11;
    default:
      return 0;
  }
}