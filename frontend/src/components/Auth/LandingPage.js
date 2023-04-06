import React, { useState } from "react";
import nikeLogo from "../../assets/images/nike.png";
import appleLogo from "../../assets/images/apple-logo.png";
import goodwillLogo from "../../assets/images/goodwill.png";
import lowesLogo from "../../assets/images/lowes.png";
import bassProLogo from "../../assets/images/bass.png";
import doofLogo from "../../assets/images/doof.png";

export default function LandingPage() {
    const changePage = () => {
        window.location = '/signin';
    };

    const changePage2 = () => {
        window.location = '/signup';
    };

    return (
        <div className='wrapper'>
            <h1 className="banner">Scrummy Bears Driving</h1>
            <div className="container" style={{ padding: "100px" }}>
                <p className="landing">Get rewarded for driving safely and join our community of smart drivers today!</p>
                <button className="button" onClick={changePage}>Sign In</button>
                <button className="button" onClick={changePage2}>Sign Up</button>
                <p className="landing">Meet some of our sponsors!</p>
                <ul className="image-gallery">
                    <li>
                        <img src={nikeLogo} alt="Nike logo" />
                        <p>Nike</p>
                    </li>
                    <li>
                        <img src={appleLogo} alt="Apple logo" />
                        <p>Apple</p>
                    </li>
                    <li>
                        <img src={goodwillLogo} alt="Goodwill logo" />
                        <p>Goodwill</p>
                    </li>
                    <li>
                        <img src={lowesLogo} alt="Lowe's logo" />
                        <p>Lowe's</p>
                    </li>
                    <li>
                        <img src={bassProLogo} alt="Bass Pro Shops logo" />
                        <p>Bass Pro Shops</p>
                    </li>
                    <li>
                        <img src={doofLogo} alt="Doofenshmirtz Evil Inc. logo" />
                        <p>Doofenshmirtz Evil Inc.</p>
                    </li>
                </ul>
            </div>
        </div>
    );
}