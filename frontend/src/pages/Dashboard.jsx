import React from 'react';
import './Dashboard.css';
import { useState, useEffect } from 'react'
import OverView from '../DashElement/OverView';
import InvCon from '../DashElement/InvCon';
import GrCon from '../DashElement/GrCon';
import EpEffect from '../DashElement/EpEffect';
import DataInq from '../DashElement/DataInq';


const Dashboard = () => {

    return (
        <div className="dashboard">
            <div className="dashLeft">
                <div className="dashTop">
                    <OverView/>
                    <InvCon/>
                </div>
                <div className="dashBm">
                    <DataInq/>
                </div>
            </div>
            <div className="dashRight">
                <div className="dashTop">
                    <GrCon/>
                </div>
                <div className="dashBm">
                    <EpEffect/>
                </div>
            </div>
            

        </div>

    )}
    
export default Dashboard;