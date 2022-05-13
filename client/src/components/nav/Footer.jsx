import React from "react";
import { Row, Col } from "antd";
import styled from "styled-components";
import LogoAndText from "./LogoAndText";

const MyFooter = styled.div``;

const br = {
  "borderLeft": "5px solid black",
  height: "100%",
};

const separation = {
  'padding': "0rem 3rem",
  "marginBottom": "1rem",
};

const topic = {
  "fontWeight": "500",
  "fontSize": "larger",
  "marginBottom": "1rem",
};
const Footer = () => {
  return (
    <MyFooter>
      <Row>
        <Col span={7}>
          <div style={separation}>
            <LogoAndText logoSize={36} fontSize={24} fontWeight={500} />
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Earum
              eligendi aut consectetur et commodi! Iure libero cum quibusdam
              quas, nesciunt optio accusamus consectetur odio vitae omnis, est,
              officia pariatur voluptatem.
            </p>
          </div>
        </Col>
        <Col span={10}>
          <div style={{ ...br, ...separation }}>
            <Row>
              <Col span={12}>
                <div style={topic}>NAVIGATION</div>
                <div>HOME</div>
                <div>HOME</div>
                <div>HOME</div>
                <div>HOME</div>
              </Col>
              <Col span={12}>
                <div style={{ ...br, ...separation }}>
                  <div style={topic}>INFO</div>
                  <div>HOME</div>
                  <div>HOME</div>
                  <div>HOME</div>
                  <div>HOME</div>
                </div>
              </Col>
            </Row>
            <Row>
              <div style={{ "marginTop": "1rem" }}>
                WE ACCEPT &emsp;&emsp;
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/1200px-Visa_Inc._logo.svg.png"
                  height={"32px"}
                  width={"64px"}
                ></img>{" "}
                &emsp;&emsp;
                <img
                  src="https://alodaohan.com/wp-content/uploads/2020/11/the-mastercard-la-gi-4.jpg"
                  height={"32px"}
                  width={"64px"}
                ></img>{" "}
                &emsp;&emsp;
                <img
                  src="https://subiz.com.vn/blog/wp-content/uploads/2014/05/paypal.jpg"
                  height={"32px"}
                  width={"64px"}
                ></img>{" "}
                &emsp;&emsp;
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3K_6sNwtzDWzZoYWjKfxQ0_kAIDSMGbxFPm2ZgQ9Jt_fwNWgi-eC-2Ft4XwIdQ21u3dI"
                  height={"32px"}
                  width={"64px"}
                ></img>{" "}
                &emsp;&emsp;
              </div>
            </Row>
          </div>
        </Col>
        <Col span={7}>
          <div style={{ ...br, ...separation }}>
            <div style={topic}>CONTACT US</div>
            <div>HOME</div>
            <div>HOME</div>
            <div>HOME</div>
            <div>HOME</div>
          </div>
        </Col>
      </Row>
    </MyFooter>
  );
};

export default Footer;
