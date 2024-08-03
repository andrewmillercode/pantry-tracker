import { TextField, Modal, Box, Stack, Paper, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
export function PantryItem ({id,name,onDelete,onEdit}){
    
    
    return (
      <Paper
        elevation={10}
        sx={{
          backgroundColor: '#f5f5f5',
          
          padding: '7px',
          paddingLeft : '15px',
          
        }}>
        <Box sx={{display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'start'}}>
          <h3 style={{marginTop:'7px',maxWidth:'70%',overflowWrap: 'break-word'}}>{name}</h3>
          
        <Box>
          <IconButton aria-label="edit" onClick={()=>{onEdit(id,name)}}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete" onClick={onDelete}>
            <DeleteIcon />
          </IconButton>
        </Box>
        </Box>
        
      </Paper>
    );
  };