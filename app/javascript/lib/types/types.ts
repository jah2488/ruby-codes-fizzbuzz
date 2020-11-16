export type Program = {
  id: string;
  code: string;
  mode: string;
  name: string;
  chars: [Char];
  output: { raw: string; err_ln: number; }
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
  color: string;
  is_code: boolean;
  user_id: number;
};