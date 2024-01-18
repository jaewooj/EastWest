import React from 'react';
import './EpEffect.css'
import { useState } from 'react';

const EpEffect = () => {


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
                            <td>10 <span>그루</span></td>
                        </tr>
                        <tr>
                            <td>누적 나무심기효과</td>
                            <td>2000 <span>그루</span></td>
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
                            <td>20.7 <span>L</span></td>
                        </tr>
                        <tr>
                            <td>누적 나무심기효과</td>
                            <td>7210.2 <span>L</span></td>
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
                            <td>3.2 <span>ton</span></td>
                        </tr>
                        <tr>
                            <td>누적 CO2감축효과</td>
                            <td>2340.1 <span>ton</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EpEffect;