import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    selectedOption: 'option1',
    arrayData : [0],
}

const itemSlice = createSlice({
    name:'item',
    initialState,
    reducers: {
        changeItem(state,action){
            state.selectedOption=action.payload
        },
        changeArrayItem(state,action){
            state.arrayData=action.payload
        },
    }
})
export const {changeItem,changeArrayItem} = itemSlice.actions
export default itemSlice.reducer