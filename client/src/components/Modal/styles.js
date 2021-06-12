import { makeStyles } from '@material-ui/core/styles';

 
 export default  makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        position: "absolute",
        top: "20%",
        left: "70%",
        [theme.breakpoints.down('md')]: {
            left: "50% !important",
            width: 400,
          },
      [theme.breakpoints.down('sm')]: {
        left: "20% !important",
        width: 300,
      },
 
    },
    
  }));