import GenericManageableTable from "../generic/GenericManageableTable";
import { Ring, RingCreateDto } from "../../types/ringTypes";
import { GridColDef } from '@mui/x-data-grid';

import RingDeleteDialog from "./RingDeleteDialog";
import RingEditDialog from "./RingEditDialog";
import RingAddDialog from "./RingAddDialog";


const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'power', headerName: 'Power', flex: 1 },
    { field: 'weight', headerName: 'Weight', flex: 1},
    { field: 'createdAt', headerName: 'Created At', flex: 1 },
    { field: 'updatedAt', headerName: 'Updated At', flex: 1 },
  ];


const RingManageableTable = () => {
  return (
    <GenericManageableTable<Ring, RingCreateDto>
      entityName="ring"
      columns={columns}
      AddDialogComponent={RingAddDialog}
      DeleteDialogComponent={RingDeleteDialog}
      EditDialogComponent={RingEditDialog}
    />
  );
};

export default RingManageableTable;
