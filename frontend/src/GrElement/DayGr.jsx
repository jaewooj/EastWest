import React from 'react';
import './DayGr.css'
import { useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const DayGr = ({dayGr,prevDayGr}) => {

    const maxValue = 200;

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
        <div className="dayGr">
            <div className="realGrTt gradientText">
                <p className="mark"></p>
                <p>금일 발전량</p>
            </div>
            <div className="radialGp">
                
            <CustomTextProgressbar 
                    value={dayGr} 
                    maxValue={maxValue} 
                    styles={buildStyles({
                        // Colors
                        pathColor: `#71DAA9`,
                        trailColor: '#d0d0d0',
                    })}
                    >
                    <div >
                        <strong>{dayGr}</strong>
                    </div>
                    <div style={{ fontSize: '0.8em' }}>KWh</div>
                </CustomTextProgressbar>
            </div>
            <div className="grEff">
                <ul>
                    <li>전일 발전량</li>
                    <li>{prevDayGr}<span>kWh</span>
                    </li>
                </ul>
            </div>
        </div>

                
    );
};

export default DayGr;