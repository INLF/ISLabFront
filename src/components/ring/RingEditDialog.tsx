import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { Ring } from "../../types/ringTypes";
import { GenericEditDialogProps } from "../generic/GenericsDialog";

const RingEditDialog: React.FC<GenericEditDialogProps<Ring>> = ({
  open,
  onClose,
  onSave,
  selectedEntity,
}) => {
  const [name, setName] = useState<string>("");
  const [power, setPower] = useState<string>("");
  const [weight, setWeight] = useState<string>("");
  const [errors, setErrors] = useState<{ name?: string; power?: string; weight?: string }>({});

  useEffect(() => {
    if (selectedEntity) {
      setName(selectedEntity.name || "");
      setPower(selectedEntity.power?.toString() || "");
      setWeight(selectedEntity.weight?.toString() || "");
    }
  }, [selectedEntity]);

  const validateFields = (): boolean => {
    const newErrors: { name?: string; power?: string; weight?: string } = {};

    if (!name.trim()) {
      newErrors.name = "Name cannot be empty";
    }

    if (power.trim() === "" || isNaN(Number(power)) || Number(power) < 0) {
      newErrors.power = "Power must be a valid non-negative number";
    }

    if (weight.trim() === "" || isNaN(Number(weight)) || Number(weight) < 0) {
      newErrors.weight = "Weight must be a valid non-negative number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateFields() || !selectedEntity) return;

    const updatedRing: Ring = {
      id: selectedEntity.id,
      name,
      power: Number(power),
      weight: Number(weight),
      createdAt: selectedEntity.createdAt,
      updatedAt: selectedEntity.updatedAt
    };

    onSave(updatedRing);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Ring</DialogTitle>
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
          label="Power"
          fullWidth
          margin="dense"
          value={power}
          onChange={(e) => setPower(e.target.value)}
          error={Boolean(errors.power)}
          helperText={errors.power}
        />
        <TextField
          label="Weight"
          fullWidth
          margin="dense"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          error={Boolean(errors.weight)}
          helperText={errors.weight}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary" variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RingEditDialog;