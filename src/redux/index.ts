import { combineReducers, configureStore } from '@reduxjs/toolkit';
import tableSlice from './reducers/tableSlice';
import { tableAPI } from '../services/TableService';
import formStatusSlice from './reducers/formStatusSlice';


const rootReducer = combineReducers({
  tableSlice,
  formStatusSlice,
  [tableAPI.reducerPath]: tableAPI.reducer
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => 
      getDefaultMiddleware()
      .concat(tableAPI.middleware)
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']