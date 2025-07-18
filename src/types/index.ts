export interface User {
  id: number;
  username: string;
  did: string;
  aiten: number;
  handle: string;
  delete?: boolean;
  created_at: string;
  planet?: number;
  model?: boolean;
  bsky?: boolean;
  fav?: string;
  game?: boolean;
  game_lv?: number;
  model_attack?: number;
  model_critical?: number;
  model_critical_d?: number;
  room?: boolean;
  login?: boolean;
  game_exp?: number;
}

export interface Card {
  id: number;
  card: number;
  cp: number;
  status: 'normal' | 'yui' | 'first' | 'second' | 'third' | 'fourth' | 'fifth' | 'sixth' | 'seven' | 'super' | 'lost';
  skill: 'critical' | 'post' | 'luck' | 'ten' | 'lost' | 'dragon' | 'nyan' | 'yui' | '3d' | 'model' | 'first' | 'normal';
  author?: string;
  url?: string;
  count?: number;
  created_at?: string;
  user_id?: number;
}

export interface CardOwner {
  id: number;
  h: string;
  owner: string | null;
  ten?: number;
  ten_skill?: boolean;
  first_skill?: boolean;
}

export interface Fanart {
  img: string;
  link: string;
  author: string;
  delete?: boolean;
}

export interface Seven {
  card: number;
  count: number;
  handle: string;
  cp: number;
}

export type LocationPath = 'di' | 'docs' | 'en' | 'vr' | 'te' | 'c' | 'svn' | 'fa' | 'ph' | 'pr' | 'owner' | string;