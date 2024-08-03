

import { TextField, Modal, Box, Stack, Paper, Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useState,useEffect } from 'react';

export function AddPopup({open,close,handleAdd}){
    const [valueState,setValueState] = useState('');
    
    
    return (
        <Modal
        open={open}
        onClose={close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
          display: 'flex',
          flexDirection: 'column'
        }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add item to pantry
          </Typography>
          <TextField
            id="standard-basic"
            label="Enter item name"
            variant="standard"
            sx={{ marginTop: '15px' }}
            value={valueState}
            onChange={(e) => setValueState(e.target.value)}
          />
          
          <Button
            variant="contained"
            sx={{ width: '40%', marginTop: '15px' }}
            onClick={()=>{
              
              handleAdd(valueState,setValueState)
             }}>
            Submit
          </Button>
          
          
        </Box>
      </Modal>

    );

}