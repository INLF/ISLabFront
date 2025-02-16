
export  interface GenericAddDialogProps<T> {
  open: boolean;
  onClose: () => void;
  onSave: (data: T) => void;
}

export interface GenericDeleteDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export interface GenericEditDialogProps<T> {
  open: boolean;
  onClose: () => void;
  onSave: (data: T) => void;
  selectedEntity: T | null;
}


