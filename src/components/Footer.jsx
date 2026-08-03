import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div>
          <h4 className="footer__brand">Your RealState</h4>
          <p>Find your next home through a trusted, reliable brokerage.</p>
        </div>

        <div className="footer__col">
          <span className="footer__heading">Explore</span>
          <a href="/">Home</a>
          <a href="/list-property">List My Property</a>
          <a href="/book-viewing">Book Viewing</a>
        </div>

        <div className="footer__col">
          <span className="footer__heading">Company</span>
          <a href="/contact">Contact Us</a>
          <a href="/login">Login</a>
          <a href="/signup">Create Account</a>
        </div>

        <div className="footer__col">
          <span className="footer__heading">Get in touch</span>
          <p>hello@yourrealstate.com</p>
          <p>+63 900 000 0000</p>
        </div>
      </div>

      <div className="footer__bottom">
        <span>© {new Date().getFullYear()} Your RealState. All rights reserved.</span>
      </div>
    </footer>
  )
}

export default Footer
