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