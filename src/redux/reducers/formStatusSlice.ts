import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ITable {
  isDisabled: boolean;
  isErrorName: boolean;
  isErrorEmail: boolean;  
  isErrorPosition: boolean;  
  isErrorStack: boolean;  
  isErrorSalary: boolean;
  errorName: string;
  errorEmail: string;
  errorPosition: string;
  errorStack: string;
  errorSalary: string;
}

const initialState: ITable = {
  isDisabled: false,
  isErrorName: false,
  isErrorEmail: false,
  isErrorPosition: false,
  isErrorStack: false,
  isErrorSalary: false,
  errorName: '',
  errorEmail: '',
  errorPosition: '',
  errorStack: '',
  errorSalary: '',
};

export const formStatusSlice = createSlice({
  name: 'formStatusSlice',
  initialState,
  reducers: {
    setDisabled: (state, action: PayloadAction<boolean>) => {
      state.isDisabled = action.payload
    },
    setErrorName: (state, action: PayloadAction<boolean>) => {
      state.isErrorName = action.payload
    },
    setErrorEmail: (state, action: PayloadAction<boolean>) => {
      state.isErrorEmail = action.payload
    },
    setErrorPosition: (state, action: PayloadAction<boolean>) => {
      state.isErrorPosition = action.payload
    },
    setErrorStack: (state, action: PayloadAction<boolean>) => {
      state.isErrorStack = action.payload
    },
    setErrorSalary: (state, action: PayloadAction<boolean>) => {
      state.isErrorSalary = action.payload
    },
    setNameMass: (state, action: PayloadAction<string>) => {
      state.errorName = action.payload
    },
    setEmailMass: (state, action: PayloadAction<string>) => {
      state.errorEmail = action.payload
    },
    setPositionMass: (state, action: PayloadAction<string>) => {
      state.errorPosition = action.payload
    },
    setStackMass: (state, action: PayloadAction<string>) => {
      state.errorStack = action.payload
    },
    setSalaryMass: (state, action: PayloadAction<string>) => {
      state.errorSalary = action.payload
    },
  }
})

export default formStatusSlice.reducer;