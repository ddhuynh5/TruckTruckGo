import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import bear from '../../assets/images/bear.png';
import Nike from '../../assets/images/nike.png';
import Apple from '../../assets/images/apple-logo.png';
import Amazon from '../../assets/images/Amazon.png';
import ScaredyBear from '../../assets/images/screen-0.jpg';
import HappyBear from '../../assets/images/R.png';
import ShopBear from '../../assets/images/ShoppingBear.jpg';
import FiveStars from '../../assets/images/5Star.png';
import FourStars from '../../assets/images/4Star.png';
import FourFiveStars from '../../assets/images/45Star.png';
import Bill from '../../assets/images/bill.jpg';
import Driver2 from '../../assets/images/truckdriver2.jpg';
import Jeff from '../../assets/images/jeff.jpg';
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
                        <Col lg={4} className="d-flex ml-auto">
                            <img src={bear} alt="Hero" className='img-fluid' style={{ borderRadius: "50px", width: "100%" }} />
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* Features Section */}
            <div className="py-5">
                <Container>
                    <Row className="justify-content-center">
                        <Col lg={4} className="mb-5 mb-lg-0">
                            <h2 className="text-center mb-4 display-6">Find and Buy Your Next Favorite Item!</h2>
                            <Col className="d-flex justify-content-center">
                                <img src={ShopBear} alt="Hero" className='img-fluid' style={{ maxWidth: '80%', borderRadius: "10px" }} />
                            </Col>
                            <p className="lead text-center">Easily find everything you need with our item lookup and purchasing features. Our user-friendly interface and streamlined checkout process make shopping with us a breeze.</p>
                        </Col>
                        <Col lg={4} className="mb-5 mb-lg-0">
                            <h2 className="text-center mb-4 display-6">Drive Safer and Earn Points!</h2>
                            <Col className="d-flex justify-content-center">
                                <img src={HappyBear} alt="Hero" className='img-fluid' style={{ maxWidth: '75%', borderRadius: "10px" }} />
                            </Col>
                            <p className="lead text-center">Earn points for safe driving and redeem them for rewards from our extensive catalog. Join our community today and experience the benefits of our exciting points program!</p>
                        </Col>
                        <Col lg={4} className="mb-5 mb-lg-0">
                            <h2 className="text-center mb-4 display-6">Don't Like What You See?</h2>
                            <Col className="d-flex justify-content-center">
                                <img src={ScaredyBear} alt="Hero" className='img-fluid' style={{ maxWidth: '93%', borderRadius: "10px" }} />
                            </Col>
                            <p className="lead text-center">Get the help you need with our tech support feature that offers 24/7 availability for questions, feedback, and support. Reach out today to experience our top-notch support team that is always ready to listen and assist you.</p>
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* CTA Section */}
            <div className="py-5">
                <Container>
                    <Row className="justify-content-center">
                        <Col lg={4} className="mb-5 mb-lg-0">
                            <h2 className="text-center mb-4 display-6">Bill</h2>
                            <Col className="d-flex justify-content-center">
                                <img src={Bill} alt="Hero" className='img-fluid' style={{ maxWidth: '90%', borderRadius: "10px" }} />
                            </Col>
                            <p className="lead text-center mt-3">"I love using the Safe Driving app. It has made me a safer and more aware driver, and the rewards are amazing too! Thank you!"</p>
                        </Col>
                        <Col lg={4} className="mb-5 mb-lg-0">
                            <h2 className="text-center mb-4 display-6">Jeff</h2>
                            <Col className="d-flex justify-content-center">
                                <img src={Jeff} alt="Hero" className='img-fluid' style={{ maxWidth: '115%', borderRadius: "10px" }} />
                            </Col>
                            <p className="lead text-center mt-3">"We've been thrilled to partner with Scrummy Bears Driving and promote their innovative safe driving app. We're proud to support a product that makes our roads safer for everyone."</p>
                        </Col>
                        <Col lg={4} className="mb-5 mb-lg-0">
                            <h2 className="text-center mb-4 display-6">Paul</h2>
                            <Col className="d-flex justify-content-center">
                                <img src={Driver2} alt="Hero" className='img-fluid' style={{ maxWidth: '100%', borderRadius: "10px" }} />
                            </Col>
                            <p className="lead text-center mt-3">"The Safe Driving app is a game-changer for me. It's helped me become a more conscientious driver and I feel much safer on the road now. Plus, the rewards system is awesome and gives me extra motivation to drive carefully. Thank you, Scrummy Bears!"</p>
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* CTA Section */}
            <div className="py-5">
                <Container>
                    <Row className="justify-content-center">
                        <Col lg={4} className="mb-5 mb-lg-0">
                            <h2 className="text-center mb-4 display-6">Nike</h2>
                            <Col className="d-flex justify-content-center">
                                <img src={Nike} alt="Hero" className='img-fluid' style={{ maxWidth: '50%', borderRadius: "10px" }} />
                            </Col>
                            <Col className="d-flex justify-content-center">
                                <img src={FiveStars} alt="Hero" className='img-fluid' style={{ maxWidth: '93%', borderRadius: "10px" }} />
                            </Col>
                            <p className="lead text-center">"Partnering with Nike through the Scrummy Bears app has been amazing! Not only do I get to earn rewards for safe driving, but being able to buy Nike products from their catalog is great! Thank you, Nike, for your support and partnership!"</p>
                        </Col>
                        <Col lg={4} className="mb-5 mb-lg-0">
                            <h2 className="text-center mb-4 display-6">Amazon</h2>
                            <Col className="d-flex justify-content-center">
                                <img src={Amazon} alt="Hero" className='img-fluid' style={{ maxWidth: '87%', borderRadius: "10px" }} />
                            </Col>
                            <Col className="d-flex justify-content-center">
                                <img src={FourStars} alt="Hero" className='img-fluid' style={{ maxWidth: '85%', borderRadius: "10px" }} />
                            </Col>
                            <p className="lead text-center">"Working with Amazon as my sponsor through the Scrummy Bears Driving app has been a game-changer. It's inspiring to have a sponsor that values safe driving and supports me on my truck-driver journey! Thank you, Amazon, for your partnership and commitment to safety!"</p>
                        </Col>
                        <Col lg={4} className="mb-5 mb-lg-0">
                            <h2 className="text-center mb-4 display-6">Apple</h2>
                            <Col className="d-flex justify-content-center">
                                <img src={Apple} alt="Hero" className='img-fluid' style={{ maxWidth: '50%', borderRadius: "10px" }} />
                            </Col>
                            <Col className="d-flex justify-content-center">
                                <img src={FourFiveStars} alt="Hero" className='img-fluid' style={{ maxWidth: '93%', borderRadius: "10px" }} />
                            </Col>
                            <p className="lead text-center">"The Scrummy Bears Driving app has been a total game-changer for me, and partnering with Apple has taken it to a whole new level. With Apple's support and product line, I feel more motivated than ever to drive safely and earn rewards!”</p>
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
