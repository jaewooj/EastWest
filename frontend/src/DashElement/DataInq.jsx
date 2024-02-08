import React from 'react';
import './DataInq.css';
import CheckData from '../DataElement/CheckData';
import DataInqSearch from '../DataElement/dataInqSearch';
import SearchResult from '../DataElement/SearchResult';

const DataInq = () => {

    return (
        <div className="dataInq">
            <div className="dataInqTop">
                <CheckData/>
                <DataInqSearch/>
            </div>
            <div className="dataInqBm">
                <SearchResult/>
            </div>
        </div>

    )}
    
export default DataInq;