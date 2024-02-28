import React from 'react';
import { IoMdClose } from "react-icons/io";
import './PopupInv.css'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import ArrayDt01 from './ArrayDt01';
import ArrayDt02 from './ArrayDt02';
import ArrayDt03 from './ArrayDt03';

const PopupInv = ({popupOff, invTitle,rtData}) => {
    return (
        <div className="popupInv">
            <div class="popupHeader">
                <h2>{invTitle}</h2>
                <button onClick={()=>popupOff()}><IoMdClose /></button>
            </div>
            <div class="invSelect">
                <ArrayDt01 rtData={rtData} invTitle={invTitle}/>
                <ArrayDt02 rtData={rtData} invTitle={invTitle}/>
                {/* <ArrayDt03 rtData={rtData}/> */}
            </div>
            
        </div>
    );
};

export default PopupInv;