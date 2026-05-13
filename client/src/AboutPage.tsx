import React from 'react';
import './Pages.css';

export const AboutPage: React.FC = () => {
  return (
    <div className="page-container">
      <h1>About Our Campaign</h1>
      
      <div className="about-content">
        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            We are committed to making a meaningful impact in our community through organized fundraising efforts.
            Our campaign brings together groups, solicitors, and donors to support causes that matter.
          </p>
        </section>

        <section className="about-section">
          <h2>How It Works</h2>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Groups</h3>
              <p>Organized teams with specific fundraising goals</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Solicitors</h3>
              <p>Individual fundraisers working within groups</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Donors</h3>
              <p>Supporters contributing to the cause</p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>Our Values</h2>
          <ul className="values-list">
            <li>✓ Transparency - Open tracking of all donations</li>
            <li>✓ Community - Collaborative fundraising approach</li>
            <li>✓ Impact - Every donation makes a difference</li>
            <li>✓ Integrity - Secure and trustworthy handling of contributions</li>
          </ul>
        </section>

        <section className="about-section">
          <h2>Get Started</h2>
          <p>
            Whether you're passionate about fundraising or want to contribute, there's a place for you.
            Visit our <a href="/home">Home page</a> to make your first donation or learn more about
            becoming a solicitor.
          </p>
        </section>
      </div>
    </div>
  );
};
