import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react';
import { IColumn, IRow } from '../models/TableDTO';

export const tableAPI = createApi({
  reducerPath: 'tableAPI',
  baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000'}),
  tagTypes: ['row'],
  endpoints: (build) => ({
    getColumns: build.query<IColumn[], string> ({
      query: () => ({
        url: '/columns',
      }),
    }),
    getRows: build.query<IRow[], string> ({
      query: () => ({
        url: '/rows',
      }),
      providesTags: () => ['row']
    }),
    createRow: build.mutation<IRow, IRow> ({
      query: (row) => ({
        url: '/rows',
        method: 'POST',
        body: row
      }),
      invalidatesTags: ['row']
    }),
    deleteRow: build.mutation<IRow, IRow> ({
      query: (row) => ({
        url: `/rows/${row.id}`,
        method: 'DELETE',
        body: row
      }),
      invalidatesTags: ['row']
    }),
  }),
})