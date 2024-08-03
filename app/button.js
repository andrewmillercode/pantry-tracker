

export function customButton(){
    return(
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#4db6ac',
            width: 'max(6vw, 75px)',
            height: 'max(2vw, 30px)',
            alignSelf: 'start',
            justifySelf: 'center',
            fontSize: 'max(.6vw,10px)'
          }}
          >
          Add Item
        </Button>
    );
}