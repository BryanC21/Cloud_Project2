import React, { Component } from "react";

class Timeline extends Component {
  state = {};
  render() {
    return (
      <>
        <section className="container">
          <div className="timeline-box">
            <span className="cart-text">CART</span>
            <span>&nbsp;- - - - -</span>
            <span>&nbsp;delivery&nbsp;</span>
            <span>&nbsp;- - - - -</span>
            <span>&nbsp;Payment&nbsp;</span>
          </div>
        </section>
        <br />
      </>
    );
  }
}

export default Timeline;
