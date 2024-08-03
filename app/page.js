'use client';
import { useEffect,useRef,useState } from 'react'; import DeleteIcon from '@mui/icons-material/Delete'; import IconButton from '@mui/material/IconButton';
import * as React from 'react'; import Cookies from 'universal-cookie'; import EditIcon from '@mui/icons-material/Edit';
import { TextField, Modal, Box, Stack, Paper, Button } from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import { PantryItem} from './pantryItem';
import { AddPopup} from './addPopup';
import { EditPopup} from './editPopup';
import { database } from "./firebase";
import {ref,set,remove,get, child,push,update} from 'firebase/database';
const cookies = new Cookies();


export default function Home() {
  //DB
  const [data, setData] = useState([]);
 
  
  //State of pantry items 
  const [pantryItems, setPantryItems] = React.useState([]);
  //State of add item popup
  const [openAddPopup, setOpenAddPopup] = React.useState(false);
  const handleOpenAddPopup = () => {
    setOpenAddPopup(true);}

  const handleCloseAddPopup = () => setOpenAddPopup(false);

  //state of edit item popup
  
  const [lastPantryItemName, setlastPantryItemName] = React.useState('');
  const [lastPantryItemKey, setlastPantryItemKey] = React.useState('');
  
   const [openEditPopup, setOpenEditPopup] = React.useState(false);
   const handleOpenEditPopup = (itemkey,name) => {
    
    setlastPantryItemKey(itemkey);
    setlastPantryItemName(name);
    setOpenEditPopup(true);
  }
   
   const handleCloseEditPopup = () => setOpenEditPopup(false);

  //update cookies any time pantryItems change and on load
  useEffect(() => {
    const checkAndSetCookies = () => {
      if (cookies.get('clientID') == null) {
       
        cookies.set('clientID', window.crypto.randomUUID());
       
      } else {
        console.log('cookie saved:', cookies.get('clientID'));

        
        get(ref(database, cookies.get('clientID'))).then((snapshot) => {
          if (snapshot.exists()) {
            let addedPantryItems = []
            
            for(const key in snapshot.val()){
              addedPantryItems.push({"key":key,"name":snapshot.val()[key]});
              
            }
            console.log(addedPantryItems);
            setPantryItems(addedPantryItems);
          } else {
            console.log(null);
          }
        }).catch((error) => {
          console.error('Error fetching data:', error);
        });
        //setPantryItems(cookies.get('items'))
      }
    };
    checkAndSetCookies();
  }, []);

  const handleAddItem = (name,textBoxState) => {
    handleCloseAddPopup();
    const key = pantryItems.length;
    const newItem = {
      key: key, 
      name: name
    };
    const updatedPantryItems = [...pantryItems, newItem];
    setPantryItems(updatedPantryItems);
    textBoxState('');
    
    get(ref(database, cookies.get('clientID')))
    .then((snapshot) => {
      const currentData = snapshot.val() || {};
      
      const newData = {
        ...currentData,
        [key]: name, 
      };
      update(ref(database, cookies.get('clientID')), newData)
        .then(() => {
          console.log('Value added successfully.');
          
        })
        .catch((error) => {
          console.error('Error adding value:', error);
        });
    }).catch((error) => {
      console.error('Error fetching data:', error);
    });
  

    
  };

  const handleDeleteItem = (itemKey) => {
    remove(ref(database, cookies.get('clientID')+"/"+itemKey));
    const updatedItems = pantryItems.filter((item) => item.key !== itemKey);
    console.log(itemKey);
    for(let i = 0; i < updatedItems.length;i++){
      
      if(updatedItems[i].key>itemKey){
        set(ref(database, cookies.get('clientID')+"/"+
        (updatedItems[i].key-1)),updatedItems[i].name);
        remove(ref(database, cookies.get('clientID')+"/"+updatedItems[i].key));
        updatedItems[i].key -=1;
        console.log('w');
      }
    }

    setPantryItems(updatedItems);

  };

  const handleEditItem = (key, updatedName) => {
    
    handleCloseEditPopup();
    const updatedItems = pantryItems.map((item) =>
      item.key === key ? { ...item, name: updatedName } : item
    );
    
    setPantryItems(updatedItems);
   
 const dataToSet = {};
    dataToSet[key] = updatedName;
    set(ref(database, cookies.get('clientID')), dataToSet)
    .then(() => {
      console.log('Data saved successfully!');
    })
    .catch((error) => {
      console.error('Error saving data: ', error);
    });
   
  };
  const handleInputChange = (e) => {
    setData(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Reference to the database path where you want to save the data
    

    // Set the data at the referenced path
    
  };
 
  return (
    
    <Box width="100vw" height="100vh">
       <AddPopup open={openAddPopup} close={handleCloseAddPopup} handleAdd={handleAddItem}></AddPopup>
       <EditPopup open={openEditPopup} close={handleCloseEditPopup} handleEdit={handleEditItem} pantryItemKey={lastPantryItemKey} pantryItemName={lastPantryItemName} ></EditPopup>
      <Box width='100vw' p={1}height="10%" sx={{display:'flex',alignItems:'center',justifyContent:'space-between'} }>
          <Typography textAlign={'center'} sx={{fontWeight:'bold',width:'fit-content',fontSize:'max(20px,3vw)',marginLeft:'5px'}}>
            Pantry Tracker
          </Typography>
          <Box display='flex'>
          
          </Box>
      </Box>
      
      
     

      {//Pantry item holder
      }
      <Box display={'grid'} width='100vw' height='90%' p={2}sx={{
        gridTemplateColumns: 'repeat(auto-fill,300px)',
        gridAutoRows: '300px',
        gap: "20px",
        
        flexWrap :'wrap'
      }}>
        
          
          {pantryItems.map((item) => (
          <PantryItem
            key={item.key}
            id={item.key}
            name={item.name}
            onDelete={()=>handleDeleteItem(item.key)}
            onEdit={handleOpenEditPopup}
            
          />
        ))}
        <IconButton sx={{alignSelf:'start',justifySelf:'start'}} aria-label="add" onClick={handleOpenAddPopup}>
            <AddIcon />
          </IconButton>
        
      </Box>
    </Box>
  );
}
