import React from 'react';
import './YrGr.css'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const YrGr = ({yearGr,prevYearGr}) => {

    let maxValue;
    let unit;
    const currentYearGr = () => {
        if(yearGr>=10000){
            maxValue = 70.080;
            unit = 'MWh';
            return (yearGr/1000).toFixed(2);

        } else {
            maxValue = 70080;
            unit = 'kWh';
            return yearGr.toFixed(2);
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
        <div className="yrGr">
            <div className="realGrTt gradientText">
                <p className="mark"></p>
                <p>년간 발전량</p>
            </div>
            <div className="radialGp">
                <CustomTextProgressbar 
                    value={currentYearGr()} 
                    maxValue={maxValue} 
                    styles={buildStyles({
                        // Colors
                        pathColor: `#5486A0`,
                        trailColor: '#d0d0d0',
                    })}
                    >
                    <div >
                        <strong>{currentYearGr()}</strong>
                    </div>
                    <div style={{ fontSize: '0.8em' }}>{unit}</div>
                </CustomTextProgressbar>
            </div>
            <div className="grEff">
                <ul>
                    <li>전년 발전량</li>
                    <li>{prevYearGr}<span>{unit}</span>
                    </li>
                </ul>
            </div>
        </div>

                
    );
};

export default YrGr;