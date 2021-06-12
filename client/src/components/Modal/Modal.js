import React , {useState} from 'react';
import {Modal , Button} from '@material-ui/core';
import Form from "../Form/Form"
import useStyles from './styles';
import { useDispatch, useSelector } from 'react-redux';


function rand() {
  return Math.round(Math.random() * 20) - 10;
}




const  SimpleModal = ({currentId , setCurrentId }) => {
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const classes = useStyles();
  const post = useSelector((state) => (currentId ? state.posts.posts.find((message) => message._id === currentId) : null));



  return (
      <div >
      <Button style={{width:"100%"}} color="primary"  variant="contained"  type="button" onClick={handleOpen}>
      {currentId ? `Click for Editing "${post?.title}"` : 'Create a Post'}
        </Button>
       <Modal
        style={{alignItems:"center" , display:"flex" , width:"50%"}}
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
          <div className={classes.paper}  >
        <Form  currentId={currentId} setCurrentId={setCurrentId}/>
        </div>
      </Modal>
    
      
      </div>

  );
}
export default SimpleModal