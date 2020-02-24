export interface Technology {
  link: string;
  name: string;
  iconType: 'fas' | 'fab';
}

export interface Technologies {
  [name: string]: Technology;
}
