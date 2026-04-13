import "../styles/footer.css";

function Footer() {
  return (
    <footer className="footer">
      
      <div className="top">
        <div className="useandcat">
          <h4 className="use">Useful Links</h4>
          <div className="links">
            <div>
              <p>Blog</p>
              <p>Privacy</p>
              <p>Terms</p>
              <p>FAQs</p>
              <p>Security</p>
              <p>Contact</p>
            </div>
            <div>
              <p>Partner</p>
              <p>Franchise</p>
              <p>Seller</p>
              <p>Warehouse</p>
              <p>Deliver</p>
              <p>Resources</p>
            </div>
            <div>
              <p>Recipes</p>
              <p>Bistro</p>
              <p>District</p>
              <p>Blinkit Ambulance</p>
            </div>
          </div>
        </div>

        <div className="catall">
          <h4 className="cate">
            Categories <span className="see-all">see all</span>
          </h4>
          <div className="footer-links">
            
            
              <p className="pri">Print Store</p>
              
            
          </div>
        </div>

        <div className="cat">
          
          <p>E-Gift Cards</p>
        </div>

        <div className="cat">
        
          <p>Rakhi Gifts</p>
        </div>
      </div>

    
      <div className="full-bottom">
        <p className="copyright">
          © Blink Commerce Private Limited, 2016–2026
        </p>

        <div className="download">
          <p className="do">Download App</p>
          <img
            src="https://blinkit.com/d61019073b700ca49d22.png"
            alt="App Store"
          />
          <img
            src="https://blinkit.com/8ed033800ea38f24c4f0.png"
            alt="Google Play"
          />
        </div>

        <div className="social-media">
          <i className="fa-brands fa-facebook"></i>
          <i className="fa-brands fa-x-twitter"></i>
          <i className="fa-brands fa-instagram"></i>
          <i className="fa-brands fa-linkedin-in"></i>
          <i className="fa-brands fa-threads"></i>
        </div>
      </div>

      
      <p className="note">
        “Blinkit” is owned & managed by "Blink Commerce Private Limited" and is not related, linked or interconnected in whatsoever manner or nature, to “GROFFR.COM” which is a real estate services business operated by “Redstone Consultancy Services Private Limited”.
      </p>
    </footer>
  );
}

export default Footer;