import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid, AppBar, TextField, Button, Paper } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import ChipInput from 'material-ui-chip-input';
import { useHistory, useLocation } from 'react-router-dom';

import { getPosts , getPostsBySearch } from '../../actions/posts';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import Pagination from "../Paginate"
import Modal from "../Modal/Modal"

import useStyles from './styles';



function useQuery() {
  // aşağıda kullanabilmek için
  return new URLSearchParams(useLocation().search); 
}
//QUERY ==> Sayfa bilgisini getirdğimiz yerdir
const Home = () => {
  const classes = useStyles();
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  const query = useQuery();
  const history = useHistory();
  const page = query.get("page") || 1; //sayfa yoksa 1 de olsun
  const searchQuery = query.get("searchQuery")
  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);



  const searchPost = () => {
    if (search.trim() || tags) {
      dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
      history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
    } else {
      history.push('/');
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };
  //önceki ve yeni tag
  const handleAdd = (tag) => setTags([...tags, tag]);

 //sadece silmek istediğimizi siler
  const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete));

  return (
    <Grow in>
      
      <Container maxWidth="xl">
        <Grid className={classes.gridContainer}container justify="space-between" alignItems="stretch" spacing={3}>
          <Grid item xs={12} sm={6} md={9} className={classes.gridContainer}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar className={classes.appBarSearch} position="static" color="inherit">
            <TextField onKeyPress={handleKeyPress}  name="search" variant="outlined" label="Search Memories" value={search} fullWidth  onChange={(e) => setSearch(e.target.value)} />
            <ChipInput
                style={{ margin: '10px 0' }}
                value={tags}
                onAdd={handleAdd}
                onDelete={handleDelete}
                label="Search Tags"
                variant="outlined"
              />
            <Button onClick={searchPost} color="primary" variant="contained" style={{width:"100%"}}className={classes.searchButton}>Search</Button>

            </AppBar>
            <Modal currentId={currentId} setCurrentId={setCurrentId}   />
            {(!searchQuery && !tags.length) && (
              <Paper className={classes.pagination} elevation={6}>
                <Pagination page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
        
      </Container>
     
    </Grow>
  );
};

export default Home;