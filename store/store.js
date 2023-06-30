import { configureStore } from '@reduxjs/toolkit'
const initialState = {
  data: {items:[]},
};

function dataReducer(state = initialState.data, action) {
  switch (action.type) {
    case 'SET_DATA':
      return action.payload;
    default:
      return state;
  }
}

const store = configureStore({
  reducer: {
    data: dataReducer,
  },
});

export default store;
