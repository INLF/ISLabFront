import GenericManageableTable from "../generic/GenericManageableTable";
import { City, CityCreateDto } from "../../types/cityTypes";
import CityAddDialog from "./CityAddDialog"
import CityDeleteDialog from "./CityDeleteDialog"
import { GridColDef } from '@mui/x-data-grid';
import CityEditDialog from "./CityEditDialog";

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'area', headerName: 'Area', flex: 1 },
    { field: 'population', headerName: 'Population', flex: 1},
    { field: 'populationDensity', headerName: 'Population Density', flex: 1},
    { field: 'establishmentAt', headerName: 'Establishment at', flex: 1 },
    { field: 'governorType', headerName: 'Governor type', flex: 1},
    { field: 'isCapital', headerName: 'Is Capital', flex: 1 },
    { field: 'createdAt', headerName: 'Created At', flex: 1 },
    { field: 'updatedAt', headerName: 'Updated At', flex: 1 },
  ];


const CityManageableTable = () => {
  return (
    <GenericManageableTable<City, CityCreateDto>
      entityName="city"
      columns={columns}
      AddDialogComponent={CityAddDialog}
      DeleteDialogComponent={CityDeleteDialog}
      EditDialogComponent={CityEditDialog}
    />
  );
};

export default CityManageableTable;
