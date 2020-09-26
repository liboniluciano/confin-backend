declare namespace Express {
  export interface Request {
    user: {
      id: number;
      name: string;
      mail: string;
    };
  }
}