import React from 'react';
import './DataInqSearch.css';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ExcelDown from './ExcelDown';
import DateSearch from './DateSearch';

const DataInqSearch = () => {

    return (
        <div className="dataInqSearch"> 
            <ExcelDown/>
            <DateSearch/>
        </div>
    );
};

export default DataInqSearch;