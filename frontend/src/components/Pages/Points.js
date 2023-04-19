import '../../App.css';

import React, { useState, useEffect } from 'react';
import Header from './Header';
import { points } from './PagesHelper';
import Cookies from "js-cookie";

export default function PointsPage() {
    const [totalPoints, setTotalPoints] = useState("");
    const [fullName, setFullName] = useState("");
    const [id, setId] = useState("");

    useEffect(() => {
        const name = Cookies.get('name');
        const id = Cookies.get('uniqueId');
        setId(id);
        setFullName(name);
    }, []);
    useEffect(() => {
        const getPoints = async () => {
            const pointData = await points(id);
            setTotalPoints(pointData[0].total_points);
        }

        if (id) {
            getPoints();
        }
    }, [id]);


    function PointDisplay() {
        return (
            <div className="card p-3">
                <p className="text-dark">{fullName}</p>
                <div className="card-bottom pt-3 px-3 mb-2">
                    <div className="d-flex flex-row justify-content-between text-align-center">
                        <div className="d-flex flex-column"><span>My Points:</span><p><span className="text-white">{totalPoints}</span></p></div>
                    </div>
                </div>
                <span>Earn more points from good driving!</span>
            </div>
        );
    }

    return (
        <div className='wrapper'>
            <Header />
            <div className="container">
                <header className="section-header"></header>
                <span> <PointDisplay /></span>
            </div>
        </div>
    )
}