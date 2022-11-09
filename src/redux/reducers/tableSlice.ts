import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IRow } from '../../models/TableDTO';

interface ITable {
  newRow: IRow;
  modalStatus: boolean;
  positions: string[];
  stack: string[];
}

const initialState: ITable = {
  newRow: {
    id: 0,
    name: '',
    email: '',
    position: null,
    stack: [],
    salary: 0,
  },
  modalStatus: false,
  positions: ['junior', 'middle', 'senior', 'team-lead', 'tech-lead'],
  stack: ['JS', 'TS', 'React', 'Redux'],
};

export const tableSlice = createSlice({
  name: 'tableSlice',
  initialState,
  reducers: {
    setId: (state, action: PayloadAction<number>) => {
      state.newRow.id = action.payload
    },
    setName: (state, action: PayloadAction<string>) => {
      state.newRow.name = action.payload
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.newRow.email = action.payload
    },
    setPosition: (state, action: PayloadAction<string | null>) => {
      state.newRow.position = action.payload
    },
    setStack: (state, action: PayloadAction<string[]>) => {
      state.newRow.stack = [action.payload.join('/')]
    },
    setSalary: (state, action: PayloadAction<number>) => {
      state.newRow.salary = action.payload
    },
    setModalStatus: (state, action: PayloadAction<boolean>) => {
      state.modalStatus = action.payload
    },
  }
})

export default tableSlice.reducer;