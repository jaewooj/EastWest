import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    selectedOption: 'option1',
    arrayData : [0],
    integratedData : [0],
    // 엑셀
    xData:[0],
    yDataExcel:[],
    // 
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
        changeIntegratedItem(state,action){
            state.integratedData=action.payload
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
export const {changeItem,changeArrayItem,changeIntegratedItem,setXData,setYDataExcel,changeDashTimeItem} = itemSlice.actions
export default itemSlice.reducer