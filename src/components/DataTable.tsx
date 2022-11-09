import{ Paper, TableContainer, Table, TableBody, TableCell, TableHead, TableRow} from '@mui/material';
import React, { FC } from 'react';
import { IColumn } from '../models/TableDTO';

interface IDataTableProps {
  children: React.ReactElement | React.ReactNode;
  columns: IColumn[]
}

const DataTable: FC<IDataTableProps> = ({children, columns}) => {
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
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
          <TableBody>
            {children}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default DataTable;