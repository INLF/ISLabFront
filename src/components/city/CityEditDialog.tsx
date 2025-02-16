import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Switch,
  FormControlLabel,
  FormControl,
  MenuItem,
  InputLabel,
  Select
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { City } from "../../types/cityTypes";
import { CreatureType } from '../../types/creatureTypes';
import { GenericEditDialogProps } from "../generic/GenericsDialog";

const CityEditDialog: React.FC<GenericEditDialogProps<City>> = ({
  open,
  onClose,
  onSave,
  selectedEntity,
}) => {
  const [name, setName] = useState("");
  const [area, setArea] = useState("");
  const [population, setPopulation] = useState("");
  const [populationDensity, setPopulationDensity] = useState("");
  const [establishmentAt, setEstablishmentAt] = useState<string | null>(null);
  const [governorType, setGovernorType] = useState<CreatureType>(CreatureType.HUMAN);
  const [isCapital, setIsCapital] = useState<boolean>(false);

  useEffect(() => {
    if (selectedEntity) {
      setName(selectedEntity.name || "");
      setArea(selectedEntity.area?.toString() || "");
      setPopulation(selectedEntity.population?.toString() || "");
      setPopulationDensity(selectedEntity.populationDensity?.toString() || "");
      setEstablishmentAt(selectedEntity.establishmentAt || null);
      setGovernorType(selectedEntity.governorType || "");
      setIsCapital(selectedEntity.isCapital || false);
    }
  }, [selectedEntity]);

  const handleSave = () => {
    if (!selectedEntity) return;
    
    const updatedCity: City = {
      ...selectedEntity,
      name,
      area: Number(area),
      population: Number(population),
      populationDensity: Number(populationDensity),
      establishmentAt,
      governorType,
      isCapital,
    };

    onSave(updatedCity);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit City</DialogTitle>
      <DialogContent>
        <TextField label="Name" fullWidth margin="dense" value={name} onChange={(e) => setName(e.target.value)} />
        <TextField label="Area" fullWidth margin="dense" value={area} onChange={(e) => setArea(e.target.value)} />
        <TextField label="Population" fullWidth margin="dense" value={population} onChange={(e) => setPopulation(e.target.value)} />
        <TextField label="Population Density" fullWidth margin="dense" value={populationDensity} onChange={(e) => setPopulationDensity(e.target.value)} />
        
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker label="Establishment Date" 
                      value={establishmentAt ? new Date(establishmentAt) : null} 
                      onChange={(date) => setEstablishmentAt(date ? date.toISOString().split("T")[0] : null)} 
                      />
        </LocalizationProvider>
        
        <FormControl fullWidth margin="dense">
          <InputLabel>Governor Type</InputLabel>
          <Select value={governorType} onChange={(e) => setGovernorType(e.target.value as CreatureType)}>
            {Object.values(CreatureType).map((type) => (
              <MenuItem key={type} value={type}>{type}</MenuItem>
            ))}
          </Select>
        </FormControl>
        
        <FormControlLabel
          control={<Switch checked={isCapital} onChange={(e) => setIsCapital(e.target.checked)} />}
          label="Is Capital"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Cancel</Button>
        <Button onClick={handleSave} color="primary" variant="contained">Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CityEditDialog;