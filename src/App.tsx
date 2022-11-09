import './App.css';
import { tableAPI } from './services/TableService';
import { tableSlice } from './redux/reducers/tableSlice';
import { useAppSelector, useAppDispatch } from './hooks/redux';
import{ IconButton, TableCell, TableRow, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import DataTable from './components/DataTable';
import Lyout from './components/re-use/Loyout';
import Loader from './components/UI/Loader/Loader';
import Error from './components/UI/Alert/Error';
import SetupRowModal from './components/SetupRowModal';
import SetupRowForm from './components/SetupRowForm';

function App() {
  const dispatch = useAppDispatch()
  const { modalStatus } = useAppSelector(state => state.tableSlice)
  const { setModalStatus, setId } = tableSlice.actions
  const {data: columns, isLoading: loadColumns, isError: errorColumns} = tableAPI.useGetColumnsQuery('');
  const {data: rows, isLoading: loadRows, isError: errorRows} = tableAPI.useGetRowsQuery('');
  
  const openModal = () => {
    dispatch(setModalStatus(true))
  }
  const closeModal = () => {
    dispatch(setModalStatus(false))
  }


  return (
    <Lyout>
      <Lyout>
          <Tooltip title="Create Row">
            <IconButton onClick={openModal}>
              <AddIcon/>
            </IconButton>
          </Tooltip>
      </Lyout>
      {loadColumns && loadRows && 
        <Loader/>
      }
      {errorColumns && errorRows &&
        <Error>
          Error load data from server
        </Error>
      }
      {columns &&
        <DataTable columns={columns}>
        {rows &&
          rows.map((row) => {
            return (
              <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                {columns.map((column) =>
                  <TableCell key={column.id} align={column.align}>
                    {
                      column.id === 'salary'
                      ?row[column.id]+'$'
                      :row[column.id]
                    }
                  </TableCell>
                  )}
                  <TableCell>
                    <Tooltip title="Delete Row">
                      <IconButton>
                        <ClearIcon/>
                      </IconButton>
                    </Tooltip>
                  </TableCell>
              </TableRow>
            );
          })}
        </DataTable>
      }
      <SetupRowModal
        status={modalStatus}
        closeModal={closeModal}
      >
        <SetupRowForm closeModal={closeModal}/>
      </SetupRowModal>
    </Lyout>
  );
}

export default App;
