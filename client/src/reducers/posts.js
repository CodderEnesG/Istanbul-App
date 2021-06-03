import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';


export default (posts = [] , action) => { // state ==> posts

    switch(action.type) {
        case FETCH_ALL:
            return action.payload; //actionsdan payload edilen objeyi döndürür
        case CREATE:
            return [...posts , action.payload];
        case UPDATE:
            return posts.map((post) =>post._id === action.payload._id ? action.payload : post);
        case DELETE:
            return posts.filter((post) => post._id !== action.payload);//silmek istediğimizi filteler
        case LIKE:
        return posts.map((post) =>post._id === action.payload._id ? action.payload : post);
        default:
            return posts;    
    }
}