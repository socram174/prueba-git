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

export default function TransitionsModal({ type,form}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const {setData,setFilteredData} = useContext(DataContext);


  const updateTable = async()=>{
      handleClose();
      const response = await fetch("http://20.231.202.18:8000/api/form");
      const forms = await response.json();
      setData(forms);
      setFilteredData(forms);

  }

  
  const handleDelete = async (e) => { //Se elimina el form por el id
    e.preventDefault();
    await fetch(`http://20.231.202.18:8000/api/form/${form.id}`,{
      method:"DELETE",
      headers:{"Content-Type":"application/json"}
    }).then(()=>{
      updateTable();
    });

  };

  const handleEdit = async (e)=> { //El codigo es string de 5 caracteres
    e.preventDefault();
    const {code,name,description} = e.target;
      await fetch(`http://20.231.202.18:8000/api/form/${form.id}`,{
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({"code":code.value,
                "name": name.value,
                "description":description.value              
              })
      }).then(()=> {
        updateTable();
      });
    
    
  }

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
              <h1>Edit</h1>
              <form style={{display: "flex", flexDirection: "column",alignItems:"center",justifyContent:"center", gap: 20}} onSubmit={handleEdit}>
                    <TextField
                    id="code"
                    label="code"
                    variant="outlined"
                    type="text"
                    defaultValue={form.code}
                    inputProps={{ maxLength: 5 }}
                  />
                  <TextField
                    id="name"
                    label="name"
                    variant="outlined"
                    type="text"
                    defaultValue={form.name}

                  />
                  <TextField
                    id="description"
                    label="description"
                    variant="outlined"
                    type="text"
                    defaultValue={form.description}
                  />
                  <Button variant="contained" color="success" type="submit">
                    Confirm
                  </Button>
                </form>

            </Box>
          ) : (
            <Box sx={style} border={"2px solid red"}>
              <h1 align="center">Delete form</h1>
              <Box >
                <form style={{display: "flex", flexDirection: "column",alignItems:"center",justifyContent:"center", gap: 20}} onSubmit={handleDelete}>
                  <Typography>Form with Id: {form.id}</Typography>
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
