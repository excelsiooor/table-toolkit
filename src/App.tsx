import './App.css';
import { tableAPI } from './services/TableService';
import { tableSlice } from './redux/reducers/tableSlice';
import { useAppSelector, useAppDispatch } from './hooks/redux';
import{ CircularProgress, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import Lyout from './components/re-use/Loyout';
import Loader from './components/UI/Loader/Loader';
import Error from './components/UI/Alert/Error';
import SetupRowModal from './components/SetupRowModal';
import SetupRowForm from './components/SetupRowForm';
import { useRef } from 'react';

function App() {
  const dispatch = useAppDispatch()
  const { modalStatus } = useAppSelector(state => state.tableSlice)
  const { setModalStatus } = tableSlice.actions
  const {data: columns, isLoading: loadColumns, isError: errorColumns} = tableAPI.useGetColumnsQuery('');
  const {data: maxRows, isLoading: loadRows, isError: errorRows} = tableAPI.useGetMaxRowsQuery('');
  const [deleteRow, {isLoading: removeProcess, isError: removeError}] = tableAPI.useDeleteRowMutation()
  
  const lastElement = useRef<HTMLDivElement>(null);
  const observerRef = useRef<HTMLDivElement>(null);
  // const [limit, setLimit] = useState<number>(10);
  // const [getRows, {data: rows, isLoading: loadRows, isError: errorRows}] = tableAPI.useLazyGetRowsQuery()

  const openModal = () => {
    dispatch(setModalStatus(true))
  }
  const closeModal = () => {
    dispatch(setModalStatus(false))
  }

  //! it didn’t work out to implement an infinite loader, 
  //! so as not to spoil the architecture, 
  //! I’ll leave this attempt in the comments
  // it is not possible to write data normally from an rtk query request, 
  // I tried using createAsyncThunck(), 
  // but then I would have to rewrite all requests
  // useEffect(() => {
  //   getRows(limit)
  // }, [limit])

  // useEffect(() => {
  //   let options = {root: observerRef.current}
  //   let observer: IntersectionObserver
  //   if (loadRows) return;
  //   observer = new IntersectionObserver((entries:  IntersectionObserverEntry[]) => {
  //     if(maxRows) {
  //       if (entries[0].isIntersecting && limit < maxRows.length){
  //         setLimit( limit + 1 )
  //       }
  //     }
  //   }, options);
  //   if (observer) observer.disconnect();
  //   if (lastElement.current) {
  //     observer.observe(lastElement.current)
  //   }
  // }, [loadRows, limit])

  return (
    <Lyout>
      <Lyout>
          <Tooltip title="Create Row">
            <IconButton onClick={openModal}>
              <AddIcon/>
            </IconButton>
          </Tooltip>
      </Lyout>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{maxHeight: 440}}>
          {columns &&
            <div ref={observerRef}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.name}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody >
                  {maxRows &&
                    maxRows.map((row) => {
                      return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                          {columns.map((column) =>
                            <TableCell 
                              key={column.id} 
                              align={column.align}
                            >
                              {
                                column.id === 'salary'
                                ?row[column.id]+'$'
                                :column.id === 'remove'
                                ?<Tooltip title="Remove Row">
                                  <IconButton onClick={() => deleteRow(row)}>
                                    {
                                      removeProcess
                                      ?<CircularProgress size={24}/>
                                      :<ClearIcon/>
                                    }
                                  </IconButton>
                                </Tooltip>
                                :row[column.id]
                              }
                            </TableCell>
                            )}
                            <div ref={lastElement}></div>
                        </TableRow>
                      );
                    })
                  }
                </TableBody>
              </Table>
            </div>
          }
        </TableContainer>
      </Paper>
      
      {loadColumns && loadRows && 
        <Loader/>
      }
      {errorColumns && errorRows &&
        <Error>
          Error load data from server
        </Error>
      }
      {removeError&&
        <Error>
          Remove Error
        </Error>
      }
      <SetupRowModal
        status={modalStatus}
        closeModal={closeModal}
      >
        <SetupRowForm/>
      </SetupRowModal>
    </Lyout>
  );
}

export default App;
