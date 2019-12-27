export interface Technology {
  icon?: string;
  link: string;
  name: string;
}

export interface Technologies {
  [name: string]: Technology;
}
