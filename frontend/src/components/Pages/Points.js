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
        const firstName = Cookies.get('firstName');
        const lastName = Cookies.get('lastName');
        const id = Cookies.get('uniqueId');
        setId(id);
        setFullName(firstName + ' ' + lastName);
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
            <div class="card p-3">
              <p class="text-dark">{fullName}</p>
              <div class="card-bottom pt-3 px-3 mb-2">
                <div class="d-flex flex-row justify-content-between text-align-center">
                  <div class="d-flex flex-column"><span>My Points:</span><p><span class="text-white">{totalPoints}</span></p></div>
                  <div class="d-flex flex-column"><span>Earn more points from good driving!</span></div>
                </div>
              </div>
              <span>I have become unkillable</span>
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