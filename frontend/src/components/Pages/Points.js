import '../../App.css';

import React from 'react';
import Header from './Header';
import { Container, Row, Col } from 'react-bootstrap';

export default function PointsPage() {

    return (
        <Container fluid className="p-0">
            <Header />
            <div className="py-5">
                <Container>
                    <Row className="justify-content-center align-items-center">
                        <Col lg={7}>
                            <h1 className="display-3 mb-5">FAQ</h1>
                            <p className="lead"><strong>Q: How can I earn points in the app?</strong></p>
                            <p className="lead mb-5">A: You can earn points by completing deliveries, driving safely, and referring other drivers to the app. Each completed delivery and safe driving behavior will earn you a certain number of points, and you'll receive a bonus for each new driver you refer.</p>
                            <p className="lead"><strong>Q: How do I know how many points I have?</strong></p>
                            <p className="lead mb-5">A: Your current point balance will be displayed on the app's home screen. You can also view your transaction history to see how you earned and used points over time.</p>
                            <p className="lead"><strong>Q: What can I use my points for?</strong></p>
                            <p className="lead mb-5">A: You can redeem your points for various rewards, such as gift cards, fuel discounts, and access to exclusive promotions. The available rewards and redemption options may vary over time, so be sure to check the app frequently for updates.</p>
                            <p className="lead"><strong>Q: Can I transfer my points to another driver?</strong></p>
                            <p className="lead mb-5">A: No, points are non-transferable and can only be used by the driver who earned them. However, you can refer other drivers to the app and earn bonus points when they sign up and start using the app.</p>
                            <p className="lead"><strong>Q: Can I use my points to pay for tolls or parking fees?</strong></p>
                            <p className="lead mb-5">A: Not currently, but we're working on adding more redemption options in the future. For now, you can use your points to save on fuel costs or other rewards offered in the app.</p>
                            <p className="lead"><strong>Q: What happens if I don't use my points for a long time?</strong></p>
                            <p className="lead mb-5">A: Your points will not expire as long as you continue to use the app and earn points through deliveries and safe driving. However, we reserve the right to modify the point expiration policy at any time, so be sure to check the app's terms and conditions for the latest information.</p>
                        </Col>
                    </Row>
                </Container>
            </div>
        </Container>
    )
}
