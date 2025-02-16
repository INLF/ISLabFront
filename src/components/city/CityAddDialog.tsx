import React, { useState } from "react";
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
  Select,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { CityCreateDto, City } from "../../types/cityTypes";
import { CreatureType } from "../../types/creatureTypes";
import {GenericAddDialogProps} from "../generic/GenericsDialog";


const getDefaultCity = (): CityCreateDto => ({
    name: "",
    population: 0,
    area: 0,
    populationDensity: 0,
    establishmentAt: new Date().toISOString().split("T")[0], 
    isCapital: false,
    governorType: Object.keys(CreatureType)[0] as CreatureType, 
  });


const CityAddDialog: React.FC<GenericAddDialogProps<CityCreateDto>> = ({ open, onClose, onSave }) => {
  const [city, setCity] = useState<CityCreateDto>(getDefaultCity());
  
  const handleOnSave = () => {
    if (city) {
      onSave(city);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Magic City</DialogTitle>
      <DialogContent>
        {Object.entries(city).map(([key, value]) => {
        const typedKey = key as keyof CityCreateDto;
          switch (typedKey) {
            case "establishmentAt":
              return (
                <LocalizationProvider key={typedKey} dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label={typedKey}
                    value={city?.[typedKey] ? new Date(city[typedKey] as string) : null}
                    onChange={(date) =>
                      setCity((prev) =>
                        prev ? { ...prev, [typedKey]: date?.toISOString().split("T")[0] as string} : prev
                      )
                    }
                    slotProps={{ textField: { fullWidth: true, margin: "dense" } }}
                  />
                </LocalizationProvider>
              );
            case "isCapital":
              return (
                <FormControl fullWidth key={typedKey}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={Boolean(city?.[typedKey])}
                        onChange={(e) =>
                          setCity((prev) =>
                            prev ? { ...prev, [typedKey]: e.target.checked } : prev
                          )
                        }
                      />
                    }
                    label={key}
                  />
                </FormControl>
              );
            case "governorType":
              return (
                <FormControl fullWidth key={typedKey}>
                  <InputLabel>Governor Type</InputLabel>
                  <Select
                    value={city?.[typedKey] ?? ""}
                    label={typedKey}
                    onChange={(e) =>
                      setCity((prev) =>
                        prev ? { ...prev, [typedKey]: e.target.value as CreatureType} : prev
                      )
                    }
                  >
                    {Object.entries(CreatureType).map(([type]) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              );
            default:
              return (
                <TextField
                  key={typedKey}
                  label={typedKey}
                  fullWidth
                  margin="dense"
                  type={typeof city?.[typedKey] === "number" ? "number" : "text"}
                  value={city?.[typedKey] ?? ""}
                  onChange={(e) =>
                    setCity((prev) =>
                      prev ? { ...prev, [typedKey]: e.target.value } : prev
                    )
                  }
                />
              );
          }
        })}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleOnSave} color="primary" variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CityAddDialog;
