import GenericManageableTable from "../generic/GenericManageableTable";
import { Creature, CreatureCreateDto } from "../../types/creatureTypes";
import { GridColDef } from '@mui/x-data-grid';

import CreatureDeleteDialog from "./CreatureDeleteDialog";
import CreatureEditDialog from "./CreatureEditDialog";
import CreatureAddDialog from "./CreatureAddDialog";


const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'coordinates', headerName: 'Coordinates', flex: 1,
      valueGetter: (coordinates: {x:number, y:number}) => `(${coordinates.x}, ${coordinates.y})`
    },
    { field: 'age', headerName: 'Age', flex: 1},
    { field: 'type', headerName: 'Type', flex: 1},
    { field: 'cityId', headerName: 'City', flex: 1},
    { field: 'ringId', headerName: 'Ring', flex: 1},
    { field: 'attackLevel', headerName: 'Attack level', flex: 1},
    { field: 'createdAt', headerName: 'Created At', flex: 1 },
    { field: 'updatedAt', headerName: 'Updated At', flex: 1 },
  ];


const CreatureManageableTable = () => {
  return (
    <GenericManageableTable<Creature, CreatureCreateDto>
      entityName="creature"
      columns={columns}
      AddDialogComponent={CreatureAddDialog}
      DeleteDialogComponent={CreatureDeleteDialog}
      EditDialogComponent={CreatureEditDialog}
    />
  );
};

export default CreatureManageableTable;
