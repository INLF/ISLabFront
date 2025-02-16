import React, { useState } from "react";
import { CreatureCreateDto, CreatureType } from "../../types/creatureTypes";
import { GenericAddDialogProps } from "../generic/GenericsDialog";
import { GridColDef } from "@mui/x-data-grid";
import GenericTable from "../generic/GenericTable";
import { Ring } from "../../types/ringTypes";
import { City } from "../../types/cityTypes";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from "@mui/material";

const ringColumns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "name", headerName: "Name", flex: 1 },
  { field: "power", headerName: "Power", flex: 1 },
  { field: "weight", headerName: "Weight", flex: 1 },
  { field: "createdAt", headerName: "Created At", flex: 1 },
  { field: "updatedAt", headerName: "Updated At", flex: 1 },
];

const cityColumns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "name", headerName: "Name", flex: 1 },
  { field: "area", headerName: "Area", flex: 1 },
  { field: "population", headerName: "Population", flex: 1 },
  { field: "populationDensity", headerName: "Population Density", flex: 1 },
  { field: "establishmentAt", headerName: "Establishment at", flex: 1 },
  { field: "governorType", headerName: "Governor type", flex: 1 },
  { field: "isCapital", headerName: "Is Capital", flex: 1 },
  { field: "createdAt", headerName: "Created At", flex: 1 },
  { field: "updatedAt", headerName: "Updated At", flex: 1 },
];

const CreatureAddDialog: React.FC<GenericAddDialogProps<CreatureCreateDto>> = ({
  open,
  onClose,
  onSave,
}) => {
  const [name, setName] = useState<string>("");
  const [coordinateX, setCoordinateX] = useState<string>("");
  const [coordinateY, setCoordinateY] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [type, setType] = useState<CreatureType>(CreatureType.HUMAN);
  const [attackLevel, setAttackLevel] = useState<string>("");

  const [errors, setErrors] = useState<{
    name?: string;
    coordinateX?: string;
    coordinateY?: string;
    age?: string;
    attackLevel?: string;
  }>({});

  const [ringTableOpen, setRingTableOpen] = useState<boolean>(false);
  const [cityTableOpen, setCityTableOpen] = useState<boolean>(false);
  const [chosenRing, setChosenRing] = useState<Ring | null>(null);
  const [chosenCity, setChosenCity] = useState<City | null>(null);

  const handleRingSelection = (ring: Ring) => {
    setChosenRing(ring);
  };

  const handleCitySelection = (city: City) => {
    setChosenCity(city);
  };

  const validateFields = (): boolean => {
    const newErrors: {
      name?: string;
      coordinateX?: string;
      coordinateY?: string;
      age?: string;
      attackLevel?: string;
    } = {};

    if (!name.trim()) {
      newErrors.name = "Name cannot be empty";
    }

    if (coordinateX.trim() === "") {
      newErrors.coordinateX = "X coordinate cannot be empty";
    } else if (isNaN(Number(coordinateX))) {
      newErrors.coordinateX = "X must be a valid number";
    }

    if (coordinateY.trim() === "") {
      newErrors.coordinateY = "Y coordinate cannot be empty";
    } else if (isNaN(Number(coordinateY))) {
      newErrors.coordinateY = "Y must be a valid number";
    }

    if (age.trim() === "") {
      newErrors.age = "Age cannot be empty";
    } else if (Number(age) < 0 || isNaN(Number(age))) {
      newErrors.age = "Age must be a valid non-negative number";
    }

    if (attackLevel.trim() === "") {
      newErrors.attackLevel = "Attack level cannot be empty";
    } else if (Number(attackLevel) < 0 || isNaN(Number(attackLevel))) {
      newErrors.attackLevel = "Attack level must be a valid non-negative number";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    const isValid = validateFields();
    if (!isValid) return;

    if (!chosenRing || !chosenCity) {
      return;
    }

    const parsedCoordinateX = Number(coordinateX);
    const parsedCoordinateY = Number(coordinateY);
    const parsedAge = Number(age);
    const parsedAttackLevel = Number(attackLevel);

    const newCreature: CreatureCreateDto = {
      name,
      coordinates: { x: parsedCoordinateX, y: parsedCoordinateY },
      age: parsedAge,
      type,
      attackLevel: parsedAttackLevel,
      cityId: chosenCity.id,
      ringId: chosenRing.id,
    };

    onSave(newCreature);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add Creature</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          fullWidth
          margin="dense"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={Boolean(errors.name)}
          helperText={errors.name}
        />

        <TextField
          label="X Coordinate"
          fullWidth
          margin="dense"
          value={coordinateX}
          onChange={(e) => setCoordinateX(e.target.value)}
          error={Boolean(errors.coordinateX)}
          helperText={errors.coordinateX}
        />
        <TextField
          label="Y Coordinate"
          fullWidth
          margin="dense"
          value={coordinateY}
          onChange={(e) => setCoordinateY(e.target.value)}
          error={Boolean(errors.coordinateY)}
          helperText={errors.coordinateY}
        />

        <TextField
          label="Age"
          fullWidth
          margin="dense"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          error={Boolean(errors.age)}
          helperText={errors.age}
        />

        <TextField
          label="Attack Level"
          fullWidth
          margin="dense"
          value={attackLevel}
          onChange={(e) => setAttackLevel(e.target.value)}
          error={Boolean(errors.attackLevel)}
          helperText={errors.attackLevel}
        />

        <TextField
          select
          label="Creature Type"
          fullWidth
          margin="dense"
          value={type}
          onChange={(e) => setType(e.target.value as CreatureType)}
        >
          {Object.values(CreatureType).map((creatureType) => (
            <MenuItem key={creatureType} value={creatureType}>
              {creatureType}
            </MenuItem>
          ))}
        </TextField>

        <Button
          variant="contained"
          onClick={() => setRingTableOpen(true)}
          fullWidth
          sx={{ marginTop: 2 }}
        >
          {chosenRing ? `Selected Ring: ${chosenRing.name}` : "Choose a Ring"}
        </Button>

        <Button
          variant="contained"
          onClick={() => setCityTableOpen(true)}
          fullWidth
          sx={{ marginTop: 2 }}
        >
          {chosenCity ? `Selected City: ${chosenCity.name}` : "Choose a City"}
        </Button>

        <Dialog
          open={ringTableOpen}
          onClose={() => setRingTableOpen(false)}
          fullWidth
          maxWidth="lg"
        >
          <DialogTitle>Choose a Ring</DialogTitle>
          <DialogContent>
            <GenericTable
              entityName="ring"
              columns={ringColumns}
              onRowSelect={handleRingSelection}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setRingTableOpen(false)} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>

        {/* City Selection Dialog */}
        <Dialog
          open={cityTableOpen}
          onClose={() => setCityTableOpen(false)}
          fullWidth
          maxWidth="lg"
        >
          <DialogTitle>Choose a City</DialogTitle>
          <DialogContent>
            <GenericTable
              entityName="city"
              columns={cityColumns}
              onRowSelect={handleCitySelection}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setCityTableOpen(false)} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button disabled={!chosenRing || !chosenCity} onClick={handleSave} color="primary" variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreatureAddDialog;
