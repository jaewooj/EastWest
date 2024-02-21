import React from 'react';
import './EpEffect.css'
import { useState, useEffect } from 'react';
import axios from 'axios'; 

const EpEffect = () => {

    const [yMonthData, setYMonthData] = useState(0);
    const [treeMonthEt, setTreeMonthEt]= useState(0);
    const [oilMonthEt,setOilMonthEt] = useState(0);
    const [co2MonthEt, setCo2MonthEt] = useState(0);

    const [treeYearEt, setTreeYearEt]= useState(0);
    const [oilYearEt,setOilYearEt] = useState(0);
    const [co2YearEt, setCo2YearEt] = useState(0);

    const [accumData,setAccumData] = useState(0);
    const treeFactor = 3.596212/1000;
    const oilFactor = 295.483871/1000;
    const co2Factor = 0.4747/1000;

    useEffect(()=>{
        const monthGrDataCt = async () => {
            try {
                const now = new Date();
                const year = now.getFullYear();
                const month = now.getMonth();
                const tableName = `DATA_${year}_year`;
                const response = await axios.get(`http://localhost:5033/gendata/${tableName}`);
                // setSearchResults(response.data);
                // console.log(response.data)
                const newYData = response.data.map(item=>{
                    return parseFloat(item.R060)
                })
                setYMonthData(newYData[month])
                // console.log(newYData[month]);

                // 누적
                const accumTableName = `DATA_accum`;
                const response1 = await axios.get(`http://localhost:5041/grOverview/${accumTableName}`)
                const accumResults = ((response1.data.accumResults[0].accum_R060));
                setAccumData(accumResults);
                // console.log(accumResults);
            } catch (error) {
                console.error('발전량 가져오기 오류 : ', error);
            }
        }
        monthGrDataCt();
    },[])
    useEffect(()=>{
        // console.log(yMonthData);
        setTreeMonthEt(parseFloat((yMonthData*treeFactor).toFixed(2)));
        setOilMonthEt(parseFloat((yMonthData*oilFactor).toFixed(2)));
        setCo2MonthEt(parseFloat((yMonthData*co2Factor).toFixed(2)));
        setTreeYearEt(parseFloat((accumData*treeFactor).toFixed(2)));
        setOilYearEt(parseFloat((accumData*oilFactor).toFixed(2)));
        setCo2YearEt(parseFloat((accumData*co2Factor).toFixed(2)));
    },[yMonthData,accumData]);

    return (
        <div className="epEffect">
            <div className="effectTt gradientText">
                <p className="mark"></p>
                <p>기대효과</p>
            </div>
            <div className="treeEft effectDt">
                <img src="/images/icon_balloon_tree.png"/>
                <table>
                    <tbody>
                        <tr>
                            <td>금월 나무심기효과</td>
                            <td>{treeMonthEt} <span>그루</span></td>
                        </tr>
                        <tr>
                            <td>누적 나무심기효과</td>
                            <td>{treeYearEt}  <span>그루</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="fuelEft effectDt">
                <img src="/images/icon_balloon_fuel.png"/>
                <table>
                    <tbody>
                        <tr>
                            <td>금월 석유절감효과</td>
                            <td>{oilMonthEt} <span>L</span></td>
                        </tr>
                        <tr>
                            <td>누적 석유절감효과</td>
                            <td>{oilYearEt} <span>L</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="co2Eft effectDt">
                <img src="/images/icon_balloon_co2.png"/>
                <table>
                    <tbody>
                        <tr>
                            <td>금월 CO2감축효과</td>
                            <td>{co2MonthEt} <span>ton</span></td>
                        </tr>
                        <tr>
                            <td>누적 CO2감축효과</td>
                            <td>{co2YearEt} <span>ton</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EpEffect;