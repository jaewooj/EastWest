import React from 'react';
import './RealTm.css'
import { useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const RealTm = ({realTimeGrTime,prevRealTimeGrTime}) => {

    const maxValue = 24;
    const realTimeGrTimeCt = Number(realTimeGrTime).toFixed(2);

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
        <div className="realTm">
            <div className="realGrTt gradientText">
                <p className="mark"></p>
                <p>금일 발전시간</p>
            </div>
            <div className="radialGp">
                <CustomTextProgressbar 
                    value={realTimeGrTimeCt} 
                    maxValue={maxValue} 
                    styles={buildStyles({
                        // Colors
                        pathColor: `#F0884E`,
                        trailColor: '#d0d0d0',
                    })}
                    >
                    <div >
                        <strong>{realTimeGrTimeCt}</strong>
                    </div>
                    <div style={{ fontSize: '0.8em' }}>h</div>
                </CustomTextProgressbar>
            </div>
            <div className="grEff">
                <ul>
                    <li>전일 발전시간</li>
                    <li>{prevRealTimeGrTime}<span>h</span>
                    </li>
                </ul>
            </div>
        </div>

                
    );
};

export default RealTm;