import { Autocomplete, AutocompleteChangeReason, Button, TextField } from '@mui/material';
import { FC, SyntheticEvent } from "react";
import { validEmail } from '../global/validate';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { formStatusSlice } from '../redux/reducers/formStatusSlice';
import { tableSlice } from '../redux/reducers/tableSlice';

interface ISetupRowForm {
  closeModal: () => void;
}

const SetupRowForm: FC<ISetupRowForm> = ({closeModal}) => {
  const dispatch = useAppDispatch()
  const {newRow, positions, stack} = useAppSelector(state => state.tableSlice)
  const validSatus = useAppSelector(state => state.formStatusSlice)
  const { setName, setPosition, setStack, setEmail, setSalary } = tableSlice.actions
  const { 
    setErrorName, 
    setErrorEmail, 
    setErrorPosition, 
    setErrorStack, 
    setErrorSalary, 
    setNameMass, 
    setEmailMass, 
    setPositionMass, 
    setStackMass, 
    setSalaryMass
  } = formStatusSlice.actions
  
  const changeName = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch(setName(e.target.value))
    if (e.target.value === '') {
      dispatch(setErrorName(true))
      dispatch(setNameMass('please fill the field'))
    } else {
      dispatch(setErrorName(false))
      dispatch(setNameMass(''))
    }
  }
  const changeEmail = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch(setEmail(e.target.value))
    if (e.target.value === '') {
      dispatch(setErrorEmail(true))
      dispatch(setEmailMass('please fill the field'))
    } else if (!validEmail.test(e.target.value)) {
      dispatch(setErrorEmail(true))
      dispatch(setEmailMass('incorrect email address'))
    }else {
      dispatch(setErrorEmail(false))
      dispatch(setEmailMass(''))
    }
  }
  const changeSalary = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    dispatch(setSalary(parseInt(e.target.value)))
    if (e.target.value === '') {
      dispatch(setErrorSalary(true))
      dispatch(setSalaryMass('please fill the field'))
    } else {
      dispatch(setErrorSalary(false))
      dispatch(setSalaryMass(''))
    }
  }

  const changePostion = (event: SyntheticEvent<Element, Event>, value: string | null, reason: AutocompleteChangeReason) => {
    reason = 'selectOption'
    dispatch(setPosition(value))
    if (value === '' || value === null) {
      dispatch(setErrorPosition(true))
      dispatch(setPositionMass('please fill the field'))
    } else {
      dispatch(setErrorPosition(false))
      dispatch(setPositionMass(''))
    }
  }
  const changeStack = (event: SyntheticEvent<Element, Event>, value: string[], reason: AutocompleteChangeReason) => {
    reason = 'selectOption'
    dispatch(setStack(value))
    if (value.length === 0) {
      dispatch(setErrorStack(true))
      dispatch(setStackMass('please fill the field'))
    } else {
      dispatch(setErrorStack(false))
      dispatch(setStackMass(''))
    }
  }

  const sendNewRow = () => {
    if (newRow.name === '') {
      dispatch(setErrorName(true))
      dispatch(setNameMass('please fill the field'))
    } else if (newRow.email === '') {
      dispatch(setErrorEmail(true))
      dispatch(setEmailMass('please fill the field'))
    } else if (!validEmail.test(newRow.email)) {
      dispatch(setErrorEmail(true))
      dispatch(setEmailMass('incorrect email address'))
    } else if (newRow.position === null) {
      dispatch(setErrorPosition(true))
      dispatch(setPositionMass('please fill the field'))
    } else if (newRow.stack.length === 0) {
      dispatch(setErrorStack(true))
      dispatch(setStackMass('please fill the field'))
    } else if (newRow.salary === 0) {
      dispatch(setErrorSalary(true))
      dispatch(setSalaryMass('please fill the field'))
    } else if (validSatus.isErrorName 
      || validSatus.isErrorEmail 
      || validSatus.isErrorPosition 
      || validSatus.isErrorStack 
      || validSatus.isErrorSalary !== true) {
      closeModal()
    }
  }

  return (
    <>
      <TextField
        error={validSatus.isErrorName}
        type="text"
        label='Name'
        helperText={validSatus.errorName}
        value={newRow.name}
        onChange={changeName}
        fullWidth
      />
      <TextField
        error={validSatus.isErrorEmail}
        helperText={validSatus.errorEmail}
        type="email"
        label='Email'
        value={newRow.email}
        onChange={changeEmail}
        fullWidth
      />
      <TextField
        helperText={validSatus.errorSalary}
        error={validSatus.isErrorSalary}
        type="number"
        label='Salary'
        value={newRow.salary}
        onChange={changeSalary}
        fullWidth
      />
      <Autocomplete
        disablePortal
        id="positions"
        onChange={changePostion}
        options={positions}
        fullWidth
        renderInput={(params) => 
          <TextField 
            helperText={validSatus.errorPosition}
            error={validSatus.isErrorPosition} 
            {...params} 
            label="Position" 
          />
        }
      />
      <Autocomplete
        multiple
        freeSolo
        id="stack"
        onChange={changeStack}
        options={stack}
        fullWidth
        getOptionLabel={(option) => option}
        renderInput={(params) => (
          <TextField
            helperText={validSatus.errorStack}
            error={validSatus.isErrorStack}
            {...params}
            label="Stack"
            placeholder="Add Skills"
          />
        )}
      />
      <Button variant="contained" onClick={sendNewRow}>SEND</Button>
    </>
  );
};

export default SetupRowForm;
