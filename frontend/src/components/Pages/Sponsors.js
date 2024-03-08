import '../../App.css';

import React, { useState, useEffect } from 'react';
import Header from './Header';
import { all_sponsors } from '../settings/SettingsHelper';
import { Card } from 'react-bootstrap';
import { FaAmazon } from 'react-icons/fa';
import { SiNike } from 'react-icons/si';
import { AiFillApple, AiFillHome } from 'react-icons/ai'

export default function Sponsors() {
    const [sponsors, setSponsors] = useState([]);

    useEffect(() => {
        const fetchSponsors = async () => {
            const response = await all_sponsors();
            setSponsors(response.all_sponsors);
        };
        fetchSponsors();
    }, []);

    return (
        <div className='wrapper'>
            <Header />
            <div className="container">
                <header className="section-header">
                    <h1>Sponsors</h1>
                </header>
                <ul className="image-gallery">
                    {sponsors.map((sponsor, index) => (
                        <li key={sponsor.sponsor_id}>
                            <Card>
                                <Card.Body style={{ display: 'flex', alignItems: 'center' }}>
                                    {sponsor.sponsor_name === "Amazon" && (
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <FaAmazon style={{ marginRight: '50px' }} />
                                            <div>
                                                <Card.Title>{sponsor.sponsor_name}</Card.Title>
                                                <div>Retail - Online - Services</div>
                                            </div>
                                        </div>
                                    )}
                                    {sponsor.sponsor_name === "Nike" && (
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <SiNike style={{ marginRight: '50px' }} />
                                            <div>
                                                <Card.Title>{sponsor.sponsor_name}</Card.Title>
                                                <div>Athletic - Innovative - Partnership</div>
                                            </div>
                                        </div>
                                    )}
                                    {sponsor.sponsor_name === "Apple" && (
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <AiFillApple style={{ marginRight: '50px' }} />
                                            <div>
                                                <Card.Title>{sponsor.sponsor_name}</Card.Title>
                                                <div>Technology - Design - Services</div>
                                            </div>
                                        </div>
                                    )}
                                    {sponsor.sponsor_name === "Lowes" && (
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <AiFillHome style={{ marginRight: '50px' }} />
                                            <div>
                                                <Card.Title>{sponsor.sponsor_name}</Card.Title>
                                                <div>Home Improvement - Retail - DIY (Do It Yourself)</div>
                                            </div>
                                        </div>
                                    )}
                                    {sponsor.sponsor_name !== "Amazon" && sponsor.sponsor_name !== "Nike" && sponsor.sponsor_name !== "Apple" && sponsor.sponsor_name !== "Lowes" && (
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <div style={{ marginRight: '50px' }}><strong>{sponsor.sponsor_name.charAt(0)}</strong></div>
                                            <div>
                                                <Card.Title>{sponsor.sponsor_name}</Card.Title>
                                                <div style={{ height: '20px' }}></div>
                                            </div>
                                        </div>
                                    )}
                                </Card.Body>

                            </Card>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}