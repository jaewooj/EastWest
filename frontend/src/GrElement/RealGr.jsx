import React from 'react';
import './RealGr.css'
import { useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const RealGr = ({realTimeGr}) => {

    const maxValue = 50;

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
        <div className="realGr">
            <div className="realGrTt gradientText">
                <p className="mark"></p>
                <p>현재 출력</p>
            </div>
            <div className="radialGp">
                <CustomTextProgressbar 
                    value={realTimeGr} 
                    maxValue={maxValue} 
                    styles={buildStyles({
                        // Colors
                        pathColor: `#5D8BF6`,
                        trailColor: '#d0d0d0',
                    })}
                    >
                    <div >
                        <strong>{realTimeGr}</strong>
                    </div>
                    <div style={{ fontSize: '0.8em' }}>KWh</div>
                </CustomTextProgressbar>
            </div>
            <div className="grEff">
                <ul>
                    <li>발전효율</li>
                    <li>{`${realTimeGr/maxValue*100}`}<span>%</span>
                    </li>
                </ul>
            </div>
        </div>

                
    );
};

export default RealGr;