import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridSortModel } from '@mui/x-data-grid';
import { fetchRings, updateRing } from '../services/ringService';
import { Ring } from '../types/ringTypes';
import { Box, TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const RingTable: React.FC = () => {
  const [rings, setRings] = useState<Ring[]>([]);
  const [totalRows, setTotalRows] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [loading, setLoading] = useState(false);
  const [sortModel, setSortModel] = useState<GridSortModel>([{ field: 'createdAt', sort: 'desc' }]);
  const [filters, setFilters] = useState<{ name?: string; power?: number }>({});
  
  // State for popup editor
  const [open, setOpen] = useState(false);
  const [selectedRing, setSelectedRing] = useState<Ring | null>(null);

  const handleFetchRings = async () => {
    setLoading(true);
    try {
      const response = await fetchRings(filters, page, pageSize, `${sortModel[0].field},${sortModel[0].sort}`);
      setRings(response.content);
      setTotalRows(response.totalElements);
    } catch (error) {
      console.error('Error fetching rings:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetchRings();
  }, [page, pageSize, sortModel]);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'power', headerName: 'Power', width: 150 },
    { field: 'weight', headerName: 'Weight', width: 150 },
    { field: 'createdAt', headerName: 'Created At', width: 200 },
    { field: 'updatedAt', headerName: 'Updated At', width: 200 },
  ];

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRing(null);
  };

  const handleSave = async () => {
    if (selectedRing) {
      try {
        await updateRing(selectedRing);
        handleFetchRings(); // Refresh data
        setOpen(false);
      } catch (error) {
        console.error('Error updating ring:', error);
      }
    }
  };

  return (
    <Box>
      {/* Filters */}
      <Box display="flex" gap={2} mb={2}>
        <TextField label="Name" name="name" variant="outlined" size="small" onChange={handleFilterChange} />
        <TextField label="Power" name="power" type="number" variant="outlined" size="small" onChange={handleFilterChange} />
        <TextField label="Weight" name="weight" type="number" variant="outlined" size="small" onChange={handleFilterChange} />
        <Button variant="contained" onClick={handleFetchRings}>Apply Filters</Button>
      </Box>

      <DataGrid
        rows={rings}
        columns={columns}
        rowCount={totalRows}
        paginationMode="server"
        sortingMode="server"
        onSortModelChange={(newSortModel) => setSortModel(newSortModel)}
        loading={loading}
        autoHeight
      />

      {/* Edit Popup */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Ring</DialogTitle>
        <DialogContent>
          <TextField label="Name" fullWidth margin="dense" value={selectedRing?.name || ''} onChange={(e) => setSelectedRing({ ...selectedRing!, name: e.target.value })} />
          <TextField label="Power" type="number" fullWidth margin="dense" value={selectedRing?.power || ''} onChange={(e) => setSelectedRing({ ...selectedRing!, power: Number(e.target.value) })} />
          <TextField label="Weight" type="number" fullWidth margin="dense" value={selectedRing?.weight || ''} onChange={(e) => setSelectedRing({ ...selectedRing!, weight: Number(e.target.value) })} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">Cancel</Button>
          <Button onClick={handleSave} color="primary" variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RingTable;
