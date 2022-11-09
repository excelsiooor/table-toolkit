export interface IRow {
  id: number;
  name: string;
  email: string;
  position: string | null;
  stack: string[];
  salary: number;
}

export interface IColumn {
  id: "name" | "email" | "position" | "stack" | "salary";
  name: string;
  minWidth?: number;
  align?: 'right';
}