import React, { Component } from 'react';
class Info extends Component {
    state = {}
    render() {
        return (
            <section className="container">
                <div className="row">
                    <div className="col p-3">
                        <div className="custom-card"><i className="icon ion-ios-pricetags-outline"></i>
                            <h4>Most Affordable</h4>
                            <p>Find the best exclusives range of products</p>
                        </div>
                    </div>
                    <div className="col p-3">
                        <div className="custom-card-gray"><i className="icon ion-settings"></i>
                            <h4>Free SERvice</h4>
                            <p>Find the best exclusives range of products</p>
                        </div>
                    </div>
                    <div className="col p-3">
                        <div className="custom-card-gray"><i className="icon ion-flash"></i>
                            <h4>Free Delivery</h4>
                            <p>Find the best exclusives range of products</p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Info;