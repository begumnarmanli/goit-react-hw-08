import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material";

const DeleteContactModal = ({ open, handleClose, handleConfirm }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Bu kişiyi silmek istediğinize emin misiniz?</DialogTitle>
      <DialogActions>
        <Button onClick={handleClose}>İptal</Button>
        <Button color="error" onClick={handleConfirm}>
          Sil
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteContactModal;
