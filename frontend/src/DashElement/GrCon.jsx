import React from 'react';
import './GrCon.css'
import { useState } from 'react';
import ApexCharts from 'apexcharts'
import RealGr from '../GrElement/realGr';
import RealTm from '../GrElement/RealTm';
import DayGr from '../GrElement/DayGr';
import MonGr from '../GrElement/MonGr';
import YrGr from '../GrElement/YrGr';
import AccumGr from '../GrElement/AccumGr';

const GrCon = () => {

    var options = {
        chart: {
            height: 150,
            type: 'radialBar',
        },
        series: [50],
        labels: ['Progress'],
      }
      
      var chart = new ApexCharts(document.querySelector("#chart"), options);
      
      chart.render();

    return (
        <div className="grCon">
            <div className="grConCd realGrTime">
                <RealGr/>
                <RealTm/>
            </div>
            <div className="grConCd dayMonGr">
                <DayGr/>
                <MonGr/>
            </div>
            <div className="grConCd yrSmGr">
                <YrGr/>
                <AccumGr/>
            </div>
        </div>
    );
};

export default GrCon;