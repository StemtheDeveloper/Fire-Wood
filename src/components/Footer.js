import React from 'react';
import { Link } from 'react-router-dom';
import FooterDecoration from '../assets/other/Footer decoration.svg';
import FacebookIcon from '../assets/logos/Facebook Black.svg';
import InstagramIcon from '../assets/logos/Instagram Black.svg';
import XIcon from '../assets/logos/X black.svg';
import YoutubeIcon from '../assets/logos/Youtube Black.svg';
import RedBoxSoftware from '../assets/logos/Red Box Software final.svg';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Center decoration */}
        <img 
            src={FooterDecoration} 
            alt="" 
            className="footer-decoration"
            aria-hidden="true"
          />
        {/* Top section with links */}
        <div className="footer-top">
            
          {/* Left links */}
          <div className="footer-links-left">
            <Link to="/feedback">Feedback</Link>
            <Link to="/submit-cards">Submit Cards</Link>
            <Link to="/support">Support</Link>
            <Link to="/admin">Admin</Link>
          </div>

          

          {/* Right links */}
          <div className="footer-links-right">
            <Link to="/cookies">Cookies</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/jobs">Jobs</Link>
            <Link to="/terms">Terms and conditions</Link>
            <Link to="/privacy">Privacy policy</Link>
          </div>
        </div>

        {/* Bottom section */}
        <div className="footer-bottom">
          {/* Social icons */}
          <div className="social-section">
            <span>Follow us</span>
            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <img src={FacebookIcon} alt="Facebook" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <img src={InstagramIcon} alt="Instagram" />
              </a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer">
                <img src={XIcon} alt="X" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                <img src={YoutubeIcon} alt="YouTube" />
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className="copyright">© 2024 firewood</div>

          {/* Powered by */}
          <div className="powered-by">
            <span>Powered By</span>
            <img 
            id='red-box-software'
              src={RedBoxSoftware} 
              alt="Red Box Software" 
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;