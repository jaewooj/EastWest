import React from 'react';
import './MonGr.css'
import { useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const MonGr = ({monthGr,prevMonthGr}) => {

    const maxValue = 35.2;

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
        <div className="monGr">
            <div className="realGrTt gradientText">
                <p className="mark"></p>
                <p>금월 발전량</p>
            </div>
            <div className="radialGp">
                <CustomTextProgressbar 
                    value={monthGr} 
                    maxValue={maxValue} 
                    styles={buildStyles({
                        // Colors
                        pathColor: `#5C9FE7`,
                        trailColor: '#d0d0d0',
                    })}
                    >
                    <div >
                        <strong>{monthGr}</strong>
                    </div>
                    <div style={{ fontSize: '0.8em' }}>KWh</div>
                </CustomTextProgressbar>
            </div>
            <div className="grEff">
                <ul>
                    <li>전월 발전량</li>
                    <li>{prevMonthGr}<span>kWh</span>
                    </li>
                </ul>
            </div>
        </div>

                
    );
};

export default MonGr;