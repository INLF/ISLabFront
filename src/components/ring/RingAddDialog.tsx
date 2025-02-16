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
import { RingCreateDto, Ring } from "../../types/ringTypes";
import { CreatureType } from "../../types/creatureTypes";
import {GenericAddDialogProps} from "../generic/GenericsDialog";


const getDefaultRing = (): RingCreateDto => ({
    name: "",
    power: 0,
    weight: 0,
  });


const RingAddDialog: React.FC<GenericAddDialogProps<RingCreateDto>> = ({ open, onClose, onSave }) => {
  const [ring, setRing] = useState<RingCreateDto>(getDefaultRing());
  
  const handleOnSave = () => {
    if (ring) {
      onSave(ring);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Ring</DialogTitle>
      <DialogContent>
        <TextField
                    key={"name"}
                    label={"Name"}
                    fullWidth
                    margin="dense"
                    type={"text"}
                    value={ring?.name}
                    onChange={(e) =>
                        setRing((prev) =>
                        prev ? { ...prev, name: e.target.value } : prev
                        )
                    }
        />
                <TextField
                    key={"power"}
                    label={"Power"}
                    fullWidth
                    margin="dense"
                    type={"number"}
                    value={ring?.power}
                    onChange={(e) =>
                        setRing((prev) =>
                        prev ? { ...prev, power: Number(e.target.value) } : prev
                        )
                    }  
        />
        <TextField
                    key={"weight"}
                    label={"Weight"}
                    fullWidth
                    margin="dense"
                    type={"number"}
                    value={ring?.weight}
                    onChange={(e) =>
                        setRing((prev) =>
                        prev ? { ...prev, weight: Number(e.target.value) } : prev
                        )
                    }  
        />
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

export default RingAddDialog;
