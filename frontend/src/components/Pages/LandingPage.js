import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import bear from '../../assets/images/bear.png';
import bearBalance from '../../assets/images/bear_balance.png';
import Header from './Header';

export default function LandingPage() {
    return (
        <Container fluid className="p-0">
            <Header />
            {/* Hero Section */}
            <div className="py-5">
                <Container>
                    <Row className="justify-content-center align-items-center">
                        <Col lg={7}>
                            <h1 className="display-3 mb-3">Welcome to Scrummy Bears Driving!</h1>
                            <p className="lead mb-5">We're dedicated to promoting safer driving practices through our point-based system. By driving safely, you'll not only earn rewards but also help make the roads a safer place for everyone.</p>
                            <h2 className="display-6">How It Works</h2>
                            <p className="lead mb-5">Earn points for safe driving! Every time you complete a safe driving trip, you'll accumulate points that can be redeemed for a variety of rewards, including gift cards and fuel discounts. As you accumulate more points, you'll also achieve higher status within our program, unlocking even more rewards and benefits.</p>
                        </Col>
                        <Col lg={4} className="d-flex justify-content-center">
                            <img src={bearBalance} alt="Hero" className='img-fluid' style={{ borderRadius: "10px" }} />
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* Features Section */}
            <div className="py-5">
                <Container>
                    <Row className="justify-content-center">
                        <Col lg={4} className="mb-5 mb-lg-0">
                            <h2 className="text-center mb-4 display-6">Feature 1</h2>
                            <Col className="d-flex justify-content-center">
                                <img src={bear} alt="Hero" className='img-fluid' style={{ maxWidth: '50%', borderRadius: "10px" }} />
                            </Col>
                            <p className="lead text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tempor lorem ut fringilla feugiat. Praesent suscipit tincidunt risus ac ultrices.</p>
                        </Col>
                        <Col lg={4} className="mb-5 mb-lg-0">
                            <h2 className="text-center mb-4 display-6">Feature 2</h2>
                            <Col className="d-flex justify-content-center">
                                <img src={bear} alt="Hero" className='img-fluid' style={{ maxWidth: '50%', borderRadius: "10px" }} />
                            </Col>
                            <p className="lead text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tempor lorem ut fringilla feugiat. Praesent suscipit tincidunt risus ac ultrices.</p>
                        </Col>
                        <Col lg={4} className="mb-5 mb-lg-0">
                            <h2 className="text-center mb-4 display-6">Feature 3</h2>
                            <Col className="d-flex justify-content-center">
                                <img src={bear} alt="Hero" className='img-fluid' style={{ maxWidth: '50%', borderRadius: "10px" }} />
                            </Col>
                            <p className="lead text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tempor lorem ut fringilla feugiat. Praesent suscipit tincidunt risus ac ultrices.</p>
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* CTA Section */}
            <div className="py-5">
                <Container>
                    <Row className="justify-content-center">
                        <Col lg={4} className="mb-5 mb-lg-0">
                            <h2 className="text-center mb-4 display-6">Sponsor 1</h2>
                            <Col className="d-flex justify-content-center">
                                <img src={bear} alt="Hero" className='img-fluid' style={{ maxWidth: '50%', borderRadius: "10px" }} />
                            </Col>
                            <p className="lead text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tempor lorem ut fringilla feugiat. Praesent suscipit tincidunt risus ac ultrices.</p>
                        </Col>
                        <Col lg={4} className="mb-5 mb-lg-0">
                            <h2 className="text-center mb-4 display-6">Sponsor 2</h2>
                            <Col className="d-flex justify-content-center">
                                <img src={bear} alt="Hero" className='img-fluid' style={{ maxWidth: '50%', borderRadius: "10px" }} />
                            </Col>
                            <p className="lead text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tempor lorem ut fringilla feugiat. Praesent suscipit tincidunt risus ac ultrices.</p>
                        </Col>
                        <Col lg={4} className="mb-5 mb-lg-0">
                            <h2 className="text-center mb-4 display-6">Sponsor 3</h2>
                            <Col className="d-flex justify-content-center">
                                <img src={bear} alt="Hero" className='img-fluid' style={{ maxWidth: '50%', borderRadius: "10px" }} />
                            </Col>
                            <p className="lead text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tempor lorem ut fringilla feugiat. Praesent suscipit tincidunt risus ac ultrices.</p>
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* Footer Section */}
            <div className="text-white py-4">
                <Row className="justify-content-center">
                    <Col md={6} className="text-center mb-3 mb-md-0">
                        <p>&copy; 2023 Scrummy Bears Driving. All rights reserved.</p>
                    </Col>
                </Row>
            </div>
        </Container>
    );
}
