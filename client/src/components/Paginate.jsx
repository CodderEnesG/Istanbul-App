import { Pagination, PaginationItem } from "@material-ui/lab"
import { Link } from "react-router-dom"
import useStyles from "./styles";
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from "../actions/posts"

import React, { useEffect } from 'react'

function Paginate( {page}) {
    // sayfaların sayısına erişmek için kullanırız
    const {numberOfPages} = useSelector((state) => state.posts);
    const classes = useStyles();
    const dispatch = useDispatch()

    useEffect(() => {
        if (page) {
          dispatch(getPosts(page)); 
          //sadece page'deki postları getirir ==> actions
        }
      }, [dispatch, page]);
    return (
        <Pagination classes={{ ul: classes.ul }}
            count={numberOfPages}
            page={Number(page) || 1} //yoksa 1 göster
            variant="outlined"
            color="primary"
            renderItem={(item) => (
                <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
                )} />
    )
}

export default Paginate
