import React from 'react';
import './AccumGr.css'
import { useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const AccumGr = ({accumGr}) => {

    const co2Factor = 0.4747/1000;
    const co2Results = (accumGr*co2Factor).toFixed(2);
    let maxValue;
    let unit;
    const accumYearGr = () => {
        if(accumGr>=10000){
            maxValue = 200.00;
            unit = 'MWh';
            return (accumGr/1000).toFixed(2);

        } else {
            maxValue = 20000;
            unit = 'kWh';
            return accumGr;
        }
    }
    

    function CustomTextProgressbar(props) {
        const { children, ...otherProps } = props;
      
        return (
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
            }}
          >
            <div style={{ position: 'absolute' }}>
              <CircularProgressbar {...otherProps} />
            </div>
            <div
              style={{
                position: 'absolute',
                height: '100%',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize:'16px',
                lineHeight:'1.3',
                color:'#4277FF',
                marginTop:'2px'
              }}
            >
              {props.children}
            </div>
          </div>
        );
      }

    return (
        <div className="accumGr">
            <div className="realGrTt gradientText">
                <p className="mark"></p>
                <p>누적 발전량</p>
            </div>
            <div className="radialGp">
                <CustomTextProgressbar 
                    value={accumYearGr()} 
                    maxValue={maxValue} 
                    styles={buildStyles({
                        // Colors
                        pathColor: `#9880FA`,
                        trailColor: '#d0d0d0',
                    })}
                    >
                    <div >
                        <strong>{accumYearGr()}</strong>
                    </div>
                    <div style={{ fontSize: '0.8em' }}>{unit}</div>
                </CustomTextProgressbar>
            </div>
            <div className="grEff">
                <ul>
                    <li>CO2 절감량</li>
                    <li>{co2Results}<span>ton</span>
                    </li>
                </ul>
            </div>
        </div>

                
    );
};

export default AccumGr;