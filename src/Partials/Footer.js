function Footer() {
  return (
    <div>
      <footer id="footer" className="footer">
        <div className="container">
          <div className="copyright myflex">
            <span className="_20p bold">
              &#169; <span>Formerly (SyberStar) </span>
            </span>
            {/* <span className="_20ps">
              <a href="/views/terms" style={{ color: "black" }}>
                Terms of Use
              </a>
              <br />
              <a href="/views/privacy" style={{ color: "black" }}>
                Privacy Policy
              </a>
              <br />
            </span> */}

            <span className="_20p right">
              <a
                style={{ color: "black" }}
                href="https://www.youtube.com/channel/UCsALeSluL0sDczILKeHvFJA"
              >
                <i className="fa fa-youtube white"></i>{" "}
                <sup className="_10px bold white">RaynCode</sup>
              </a>
              {/* <a
                style={{ color: "black" }}
                href="https://www.linkedin.com/company/syberstar/"
              >
                <i className="fa fa-linkedin"></i>
              </a> */}
            </span>
          </div>
        </div>

        <div className="credits"></div>
      </footer>
    </div>
  );
}

export default Footer;
