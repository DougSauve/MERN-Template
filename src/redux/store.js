import { createStore } from 'redux';

//Actions
const setPosts = ({ posts = [] } = {}) => ({ type: 'SET_POSTS', posts });
//Default state
const postsDefaultState = {
  posts: []
}

// Reducer
const postsReducer = (state = postsDefaultState, action) => {
  switch (action.type) {
    case 'SET_POSTS':
    return { posts: action.posts };
    default:
    return state;
  };
};

// Store Creation
const storeCreator = () => {
  const storeMaker = createStore(postsReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
  return storeMaker;
};

export {
  storeCreator as default,
  setPosts
}
