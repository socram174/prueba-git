import * as React from "react";
import { useContext } from "react";
import { DataContext } from "./App";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import TextField from "@mui/material/TextField";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

export default function TransitionsModal({ type,updateTable }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const {setData,setFilteredData} = useContext(DataContext);

  const handleDelete = async (e) => {
    e.preventDefault();
    const formId = e.target.id.value;
    //aqui va el fetch para borrar
    setData(data);
    setFilteredData(data);
  };

  return (
    <div>
      {type === "edit" ? (
        <Button
          variant="outlined"
          endIcon={<EditIcon />}
          color="success"
          onClick={handleOpen}
        >
          Edit
        </Button>
      ) : (
        <Button
          variant="outlined"
          endIcon={<DeleteIcon />}
          onClick={handleOpen}
          color="error"
        >
          Delete
        </Button>
      )}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          {type === "edit" ? (
            <Box sx={style} border={"2px solid green"}>
              <h1>Edit form</h1>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                Text in a modal
              </Typography>
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
              </Typography>
            </Box>
          ) : (
            <Box sx={style} border={"2px solid red"}>
              <h1 align="center">Delete form</h1>
              <Box >
                <form style={{display: "flex", flexDirection: "column",alignItems:"center",justifyContent:"center", gap: 20}} onSubmit={handleDelete}>
                  <TextField
                    id="id"
                    label="id"
                    variant="outlined"
                    type="number"
                  />
                  <Button variant="contained" color="error" type="submit">
                    Confirm
                  </Button>
                </form>
              </Box>
            </Box>
          )}
        </Fade>
      </Modal>
    </div>
  );
}
