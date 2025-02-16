import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridSortModel } from "@mui/x-data-grid";
import { Box, TextField, Button } from "@mui/material";
import { fetchEntities } from "../../services/genericService";
import { useWebSocketService } from "../../hooks/useWebSocketService"; 

interface GenericTableProps<T> {
  entityName: string;
  columns: GridColDef[];
  onRowSelect?: (entity: T) => void;
}

const GenericTable = <T extends { id: number }>({
  entityName,
  columns,
  onRowSelect
}: GenericTableProps<T>) => {
  const [entities, setEntities] = useState<T[]>([]);
  const [totalRows, setTotalRows] = useState<number>(0);
  const [paginationModel, setPaginationModel] = useState({
    page: 0, 
    pageSize: 5,
  });
  const [loading, setLoading] = useState(false);
  const [sortModel, setSortModel] = useState<GridSortModel>([{ field: "createdAt", sort: "desc" }]);
  const [filters, setFilters] = useState<{ [key: string]: any }>({});

  const { lastMessage } = useWebSocketService(); 

  useEffect(() => {
    handleFetchEntities();
  }, [paginationModel, sortModel]);

  useEffect(() => {
    if (lastMessage) {
      console.log("🔄 WebSocket update received, refreshing table...");
      handleFetchEntities();
    }
  }, [lastMessage]);

  const handleFetchEntities = async () => {
    setLoading(true);
    try {
      const response = await fetchEntities(
        entityName, 
        filters, 
        paginationModel.page, 
        paginationModel.pageSize, 
        `${sortModel[0].field},${sortModel[0].sort}`
      );
      setEntities(response.content as T[]);
      setTotalRows(response.totalElements);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Box display="flex" gap={2} mb={2}>
        {columns.map((col) => (
          <TextField 
            key={col.field} 
            label={col.headerName} 
            name={col.field} 
            variant="outlined" 
            size="small" 
            onChange={(e) => setFilters({ ...filters, [e.target.name]: e.target.value })} 
          />
        ))}
        <Button variant="contained" onClick={handleFetchEntities}>Apply Filters</Button>
      </Box>

      <DataGrid
        rows={entities}
        columns={columns}
        rowCount={totalRows}
        paginationMode="server"
        sortingMode="server"
        onSortModelChange={(newSortModel) => setSortModel(newSortModel)}
        loading={loading}
        autoHeight
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        onRowClick={(params) => onRowSelect && onRowSelect(params.row)}
      />
    </Box>
  );
};

export default GenericTable;
