const {createSlice} = require('@reduxjs/toolkit');

const note = createSlice({
  name: 'note',
  initialState: [],
  reducers: {
    addNote: (state, action) => {
      state.push(action.payload)
    },
    deleteNote: (state, action) => {
      var i = state.findIndex(title => title === action.payload.title);
      if(i !== null){
        state.splice(i,1);
      }
    },
    editNote: (state, action) => {
      var i = state.findIndex(title => title === action.payload.title);
      if(i !== null){
        state.splice(i,1);
        state.splice(i,0,action.payload);
      }
    }
  },
});

export const {addNote, deleteNote,editNote} =
  note.actions;

export default note.reducer;