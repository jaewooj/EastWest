import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    selectedOption: 'option1',
    arrayData : [0],
    xData:[0],
    yDataExcel:[],
    dashTimeGenData:[0],
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
        setXData(state,action){
            state.xData = action.payload;
        },
        setYDataExcel(state,action){
            state.yDataExcel = action.payload;
        },
        changeDashTimeItem(state,action){
            state.dashTimeGenData=action.payload
        },
    }
})
export const {changeItem,changeArrayItem,setXData,setYDataExcel,changeDashTimeItem} = itemSlice.actions
export default itemSlice.reducer