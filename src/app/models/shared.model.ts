export interface ISort {
  name: string;
  order: 'asc' | 'desc';
  limit?: number;
}

export interface IRouter {
  path: string;
  data?: any;
}

export interface IModal {
  nextUrl: string;
  title: string;
  content: string;
}
