import React from 'react';
import './SearchResult.css';
import { useState, useEffect } from 'react';
import IntegratedGr from '../SearchElement/IntegratedGr';
import ArrayGr from '../SearchElement/ArrayGr';
import InverterGr from '../SearchElement/InverterGr';
import Insolation from '../SearchElement/Insolation';
import CheckData from './CheckData';
import { useSelector, useDispatch } from 'react-redux';


const SearchResult = () => {
    const selectedOption = useSelector(state => state.item.selectedOption); // Redux 스토어의 selectedOption 값을 가져옵니다.


    return (
        <div className="searchResult">
            {
                selectedOption==='option1'?<IntegratedGr/>:
                selectedOption==='option2'?<ArrayGr/>:
                selectedOption==='option3'?<InverterGr/>:
                <Insolation/>
            }
        </div>
    );
};

export default SearchResult;