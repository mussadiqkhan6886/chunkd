'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';
import Link from 'next/link';
import { Edit, Trash } from 'lucide-react';

interface ProductTableProps {
  products: CookieType[]; // categories with products
}

export default function DropTable({ products }: ProductTableProps) {

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/api/drops/${id}`);
      if (res.status === 200) {
        alert("Product deleted successfully!");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to delete product.");
    }
  };

  const columns: GridColDef<any>[] = [

    {
    field: 'image',
    headerName: 'Image',
    width: 100,
    sortable: false,
    renderCell: (params) => (
      params.row.images && params.row.images.length > 0 ? (
        <img
          src={params.row.images[0]}
          alt={params.row.name}
          style={{ width: 60, height: 60, objectFit: 'cover'}}
        />
      ) : (
        <span>No Image</span>
      )
    ),
  },
    { field: 'title', headerName: 'Title', flex: 1 },
  { field: 'price', headerName: 'Price', type: 'number', width: 100 },
  {
  field: 'releaseDate',
  headerName: 'Release Date',
  width: 180,
  renderCell: (params) => {
    if (!params.value) return "-";
    const date = new Date(params.value);
    return date.toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  },
},
{
  field: 'endDate',
  headerName: 'End Date',
  width: 180,
  renderCell: (params) => {
    if (!params.value) return "-";
    const date = new Date(params.value);
    return date.toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  },
},

  { field: 'durationDays', headerName: 'Duration (Days)', width: 80 },
  { field: 'totalLimit', headerName: 'Total Limit', width: 120 },
  { field: 'soldCount', headerName: 'Sold Count', width: 100 },
  { field: 'soldOut', headerName: 'Sold Out', width: 80, type: 'boolean' },
  { field: 'active', headerName: 'Active', width: 80, type: 'boolean' },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      width: 120,
      renderCell: (params) => (
        <Box>
          <IconButton color="primary">
            <Link href={`/admin-dashboard/update-drop/${params.row._id}`}><Edit /></Link>
          </IconButton>
          <IconButton color="error" onClick={() => handleDelete(params.row._id)}>
            <Trash />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box sx={{ height: 600, width: '100%', p: 2, borderRadius: 2 }}>
      <DataGrid
        rows={products}
        columns={columns}
        getRowId={(row) => row._id} 
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        pageSizeOptions={[10, 10, 20]}
        showToolbar
        disableRowSelectionOnClick
      />
    </Box>
  );
}
