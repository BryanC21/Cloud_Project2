import React, { Component } from "react";
import Gift from "../../assets/img/gift.png";
import GiftPromo from "../../assets/img/gift_promo.png";
import { Modal, Button } from "react-bootstrap";
import { FacebookColor ,Twitter1Color ,LinkedinColor , GmailColor , WhatsappColor} from "sketch-icons";

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  render() {
    const { show } = this.state;

    return (
      <>
        <Modal
          show={show}
          onHide={() => this.setState({ show: false })}
          backdrop="static"
          keyboard={false}
          size="lg"
          centered
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <div className="container">
              <div className="row">
                <div className="col-xxl-8 col-md-8 col-8 offset-md-2 offset-2 offset-xxl-2 promotion-box">
                  <img src={GiftPromo} alt="gift" />
                  <h3>
                    You and your friend get 30% off upto 500 on your next months
                    rent
                  </h3>
                  <p>Your promo code</p>
                  <h1>ANDNYD2S</h1>
                  <hr />
                  <p>Share on</p>
                  <div className="social-icons">
                    <a href="#">
                    <GmailColor />
                    </a>
                    <a href="#">
                    <WhatsappColor />
                    </a>
                    <a href="#">
                      <FacebookColor />
                    </a>
                    <a href="#">
                    <Twitter1Color />
                    </a>
                    <a href="#">
                    <LinkedinColor />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>

        <aside className="col-sm-4 col-md-4 col-lg-4 col-xl-4">
          <div className="items-body container" style={{ padding: "10%" }}>
            <div className="promo-box">
              <span>
                <img src={Gift} alt="gift" />
              </span>
              <span>&nbsp; Have a promo code ?</span>
            </div>
            <br />
            <div className="row payment">
              <div className="col-7 col-xxl-7">
                <h4 className="text-style-2">Monthly Rent</h4>
              </div>
              <div className="col">
                <h4 className="text-style-3 text-end">Rs 3050</h4>
              </div>
            </div>
            <div className="row payment">
              <div className="col-7 col-xxl-7">
                <h4 className="text-style-2">Security Deposit</h4>
              </div>
              <div className="col">
                <h4 className="text-style-3 text-end">Rs 6799</h4>
              </div>
            </div>
            <div className="row payment">
              <div className="col-7 col-xxl-7">
                <h4 className="text-style-2">GST</h4>
              </div>
              <div className="col">
                <h4 className="text-style-3 text-end">Rs 300</h4>
              </div>
            </div>
            <div className="row payment">
              <div className="col-7 col-xxl-7">
                <h4 className="text-style-2">Coupoun Discount</h4>
              </div>
              <div className="col">
                <h4 className="text-style-3 text-end" style={{ color: "#ef4423" }}>
                  - Rs 2,789
                </h4>
              </div>
            </div>
            <div className="row payment">
              <div className="col-7 col-xxl-7">
                <h4 className="text-style-2">Delivery</h4>
              </div>
              <div className="col">
                <h4
                  className="text-style-3 text-end"
                  style={{ color: "limegreen" }}
                >
                  FREE
                </h4>
              </div>
            </div>
            <hr />
            <div className="row payment">
              <div className="col-7 col-xxl-7">
                <h4 className="text-style-1">Delivery</h4>
              </div>
              <div className="col">
                <h4 className="text-style-1 text-end">Rs 30,000</h4>
              </div>
            </div>
            <br />
            <div className="row container">
              <button
                className="btn btn-primary custom-btn-fill"
                onClick={() => this.setState({ show: true })}
                type="button"
              >
                Place Order
              </button>
            </div>
          </div>
        </aside>
      </>
    );
  }
}

export default Checkout;
