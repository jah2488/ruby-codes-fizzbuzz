export interface IProgram {
  id: string;
  code: string;
  mode: string;
  name: string;
  chars: [IChar];
  chat: [IChar];
};

export interface IChar {
  name: string;
  votes_count: number;
  user_id: number;
};
