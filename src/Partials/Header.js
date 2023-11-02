import $ from "jquery";
import "bootstrap";
import pyLogo from "../imgs/icon.png"

// package details
let packageDetails = [];
let packageVersion = "";
// let downloadURL = "";
// let lastDownloads = "";
// let releasedVersionsList = [];

const loadPackageDetails = async () => {
  try {
    const res = await fetch("https://pypi.org/pypi/pygrams/json");
    packageDetails = await res.json();
    packageVersion = packageDetails.info.version;
    // downloadURL = packageDetails.info.download_url;
    // lastDownloads = packageDetails.info.downloads.last_day;
    // releasedVersionsList = packageDetails.releases;
    $(".packageVersion").text("v" + packageVersion);
  } catch (err) {
    console.error(err);
  }
};

loadPackageDetails();

function Header() {
  return (
    <div>
      <section id="nav-links" className="nav-links">
        <div className="">
          <ul className="right">
            <li className="nav-item _15px bold">
              <span className="packageVersion"></span>
            </li>
            <li className="nav-item _17px bold">
              <a
                className="nav-link"
                href="https://youtu.be/VGSCx4Ih2Qg"
                target="_black"
              >
                <i className="fa fa-youtube red "></i>{" "}
                <sup className="_10px bold">v0.0.12</sup>
              </a>
            </li>
            {/* <li className="nav-item _20px"><a className="nav-link downloadURL" href="" target="_black"><i className="fa fa-download"></i> </a></li>  */}
            <li className="nav-item _17px bold">
              <a
                className="nav-link"
                href="https://pypi.org/project/pygrams/"
                target="_black"
              >
                {/* <i className="fab fa-python _37A"></i>{" "} */}
                <img className="" style={{width:19}} src={pyLogo}/>{" "}
                <sup className="_10px bold">PyPi</sup>
              </a>
            </li>
            <li className="nav-item _17px bold">
              <a
                className="nav-link"
                href="https://github.com/Yaseen549/pygrams"
                target="_black"
              >
                <i className="fa fa-github"></i>{" "}
                <sup className="_10px bold">GitHub</sup>
              </a>
            </li>
            {/* <li className="nav-item _17px">
              <a
                className="nav-link"
                href="https://pages.razorpay.com/syberstar-donation-page"
                target="_black"
              >
                <i className="fa fa-donate _EB4"></i> Donate
              </a>
            </li> */}
          </ul>
        </div>
      </section>
      <br />
    </div>
  );
}

export default Header;
