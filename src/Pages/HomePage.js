import $ from "jquery";
import DataBox from "./Components/DataBox";
import axios from "axios";
import Footer from "../Partials/Footer";

let python_functions = [];
let listOfProgs = [];
let allKeys = [],
  allvalues = [];

let progIds = [
  "pygrams",
  "pygenerators",
  "pygetters",
  "pyhaselemets",
  "pyissers",
  "searchandsort",
  "otherfuncs",
  "reqFunctions",
];

const loadProgramsCollecteddata = async () => {
  try {
    const res = await fetch("https://pygrams-api.vercel.app/pygrams.json");
    python_functions = await res.json();
    displayData(python_functions);
  } catch (err) {
    console.error(err);
  }
};
const displayData = (programsCollectedData) => {
  allKeys = Object.keys(programsCollectedData[0]);
  allvalues = Object.values(programsCollectedData[0]);

  for (let i = 0; i < progIds.length; i++) {
    programsCollectedData.map((character) => {
      listOfProgs.push(character[allKeys[i]]);
    });

    for (let j = 0; j < listOfProgs[i].length; j++) {
      $("#" + progIds[i]).append(
        $(
          "<a href=" +
            listOfProgs[i][j] +
            '><li class="pop">' +
            listOfProgs[i][j] +
            "()</li></a>"
        )
      );
    }

    $(function () {
      $("#searchBar").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $("#" + progIds[i] + " li").filter(function () {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
      });
    });
  }
};
loadProgramsCollecteddata();

// github contribution list
let ulvalue = "";
let htmlURL = "";
const getUsers = () => {
  const owner = "yaseen549",
    repo = "pygrams";
  axios
    .get(`https://api.github.com/repos/${owner}/${repo}/contributors`)
    .then((response) => {
      const users = response.data;
      ulvalue = users.map((u) => u.avatar_url);
      htmlURL = users.map((u) => u.html_url);
      for (let i = 0; i <= ulvalue.length - 1; i++) {
        $("#ourbackersNames").append(
          $(
            '<a href="' +
              htmlURL[i] +
              '"><img class="ourbackersNames" src="' +
              ulvalue[i] +
              '"><a>'
          )
        );
      }
    })
    .catch((error) => console.error(error));
};
getUsers();

// Homepage
function HomePage() {
  return (
    <div>
      <section id="header" className="header center">
        <h1 className="title center">
          <span className="py">Py</span>
          <span className="grams">Grams(</span>
          <span className="py">)</span>
        </h1>
        <p className="">
          The Python Package to get all your hustling Programs in one{" "}
          <a href="https://github.com/Yaseen549/pygrams" className="_FD4">
            CodeBase{" "}
            <sup>
              <i className="fas fa-external-link-alt" aria-hidden="true"></i>
            </sup>
          </a>
        </p>
        <span className="bold">
          Watch Tutorials on{" "}
          <a className="link _F00" href="https://youtu.be/VGSCx4Ih2Qg">
            YouTube{" "}
            <sup>
              <i className="fas fa-external-link-alt" aria-hidden="true"></i>
            </sup>
          </a>{" "}
        </span>
      </section>

      <div className="center">
        <p className="installation dol">pip install pygrams</p>
      </div>

      <div className="center">
        <div className="container">
          <div id="searchWrapper">
            <input
              type="text"
              name="searchBar"
              id="searchBar"
              placeholder="search for a function"
            />
            {/* <p className="">Last day downloads: <span className="lastDownloads"></span></p> */}
          </div>
          {/* <ul id="charactersList"></ul> */}
          <br />
          <p className="_15px bold">
            If Program not found please{" "}
            <a
              className="boldLinks"
              href="https://github.com/Yaseen549/pygrams/issues/new"
              target="_blank"
            >
              {" "}
              Raise an Issue{" "}
              <sup>
                <i className="fas fa-external-link-alt"></i>
              </sup>
            </a>
          </p>
        </div>
      </div>

      <section className="functions flex justify-content-center" id="functions">
        <DataBox programID="pygrams" programTitle="pygrams" />
        <DataBox programID="pygenerators" programTitle="Generators" />
        <DataBox programID="pygetters" programTitle="Getters" />
        <DataBox programID="pyhaselemets" programTitle="Has Functions" />
        <DataBox programID="pyissers" programTitle="Is Functions" />
        <DataBox
          programID="searchandsort"
          programTitle="Searching and Sorting"
        />
        <DataBox programID="otherfuncs" programTitle="Other Functions" />
        <div className="reqFunctions">
          <h6 className="center">Backer's Functions</h6>
          <div className="">
            <ul id="reqFunctions">
              <li className="">
                Waiting for your response
                <span className="bold">
                  .<span className="flash">..</span>
                </span>
              </li>
              <li className="bold">
                <a
                  className="boldLinks"
                  href="https://github.com/Yaseen549/pygrams#contribution-guide"
                >
                  Become a Backer{" "}
                  <sup>
                    <i className="fas fa-external-link-alt"></i>
                  </sup>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="backers flex justify-content-center" id="backers">
        <h4>Our Backers</h4>
      </section>
      <div className="center pop">
        <ul id="ourbackersNames"></ul>
      </div>

      <section className="center">
        <p>
          Tip:{" "}
          <span className="grey">
            Use getSourceCode() to get the source code of a function of a python
            program
          </span>
          <br />
          Eg: getSourceCode(isEven)
        </p>
      </section>
      <Footer />
    </div>
  );
}

export default HomePage;
