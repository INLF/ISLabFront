import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridSortModel } from "@mui/x-data-grid";
import { Box, Button, TextField, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { GenericAddDialogProps, GenericDeleteDialogProps, GenericEditDialogProps } from "./GenericsDialog";
import { createEntity, updateEntity, deleteEntity, fetchEntities } from "../../services/genericService";
import { useWebSocketService } from "../../hooks/useWebSocketService"; 

interface GenericManageableTableProps<T, TDto> {
  entityName: string;
  columns: GridColDef[];
  AddDialogComponent: React.FC<GenericAddDialogProps<TDto>>;
  DeleteDialogComponent: React.FC<GenericDeleteDialogProps>;
  EditDialogComponent: React.FC<GenericEditDialogProps<T>>;
}

const GenericManageableTable = <T extends { id: number }, TDto>({
  entityName,
  columns,
  AddDialogComponent,
  DeleteDialogComponent,
  EditDialogComponent,
}: GenericManageableTableProps<T, TDto>) => {
  const [entities, setEntities] = useState<T[]>([]);
  const [totalRows, setTotalRows] = useState<number>(0);
  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 5,
  });
  const [loading, setLoading] = useState(false);
  const [sortModel, setSortModel] = useState<GridSortModel>([{ field: "createdAt", sort: "desc" }]);
  const [filters, setFilters] = useState<any>({});
  const [editOpen, setEditOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState<T | null>(null);
  const [entityIdToDelete, setEntityIdToDelete] = useState<number>(-1);

  const { lastMessage } = useWebSocketService(); 

  const handleFetch = async () => {
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
      console.error("Error fetching entities:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetch();
  }, [paginationModel, sortModel]);

  useEffect(() => {
    if (lastMessage) {
      console.log("🔄 WebSocket update received, refreshing table...");
      handleFetch();
    }
  }, [lastMessage]);

  return (
    <Box>
      {/* Filters */}
      <Box display="flex" gap={2} mb={2}>
        {columns.map((col, key) => (
          <TextField
            key={key}
            label={col.headerName}
            name={col.field}
            variant="outlined"
            size="small"
            onChange={(e) => setFilters({ ...filters, [e.target.name]: e.target.value })}
          />
        ))}
        <Button variant="contained" onClick={handleFetch}>
          Apply Filters
        </Button>
      </Box>

      <DataGrid
        rows={entities}
        columns={[
          ...columns,
          {
            field: "actions",
            headerName: "Actions",
            width: 120,
            sortable: false,
            disableColumnMenu: true,
            renderCell: (params) => (
              <>
                <IconButton
                  onClick={() => {
                    setSelectedEntity(params.row);
                    setEditOpen(true);
                  }}
                >
                  <EditIcon color="action" />
                </IconButton>
                <IconButton
                  onClick={() => {
                    setEntityIdToDelete(params.row.id);
                    setDeleteOpen(true);
                  }}
                >
                  <DeleteIcon color="error" />
                </IconButton>
              </>
            ),
          },
        ]}
        rowCount={totalRows}
        paginationMode="server"
        sortingMode="server"
        onSortModelChange={(newSortModel) => setSortModel(newSortModel)}
        loading={loading}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        autoHeight
      />

      <AddDialogComponent
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onSave={async (entity: TDto) => {
          await createEntity(entityName, entity);
          handleFetch();
          setAddOpen(false);
        }}
      />
      <DeleteDialogComponent
        open={deleteOpen}
        onClose={() => {
          setDeleteOpen(false);
        }}
        onConfirm={async () => {
          await deleteEntity(entityName, entityIdToDelete);
          handleFetch();
          setDeleteOpen(false);
        }}
      />
      <EditDialogComponent
        open={editOpen}
        onClose={() => {
          setEditOpen(false);
          setSelectedEntity(null);
        }}
        onSave={async (updatedEntity: T) => {
          console.log("onSave received:", updatedEntity);
          await updateEntity(entityName, updatedEntity);
          handleFetch();
          setEditOpen(false);
        }}
        selectedEntity={selectedEntity}
      />

      <Button variant="contained" onClick={() => setAddOpen(true)}>
        Add {entityName}
      </Button>
    </Box>
  );
};

export default GenericManageableTable;
