import generators from "../Programs/generators.py";
import getters from "../Programs/getters.py";
import haselements from "../Programs/haselements.py";
import issers from "../Programs/issers.py";
import pygrams from "../Programs/pygrams.py";
import searching from "../Programs/searching.py";
import sorting from "../Programs/sorting.py";

import $ from "jquery";

import React, { useEffect } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
// import "prismjs/themes/prism-okaidia.min.css";

function GetCode({ functionName }) {
  useEffect(() => {
    Prism.highlightAll();
  }, []);
  // let index_value_of_the_character = 0;
  let codesList = [];
  let language = "js";

  let lines_of_code = "";
  let the_program_code = "";
  let complete_code = "";

  const getTheProgram = async () => {
    try {
      const resGenerators = await fetch(generators).then((r) => r.text());
      const resGetters = await fetch(getters).then((r) => r.text());
      const resHaselements = await fetch(haselements).then((r) => r.text());
      const resIssers = await fetch(issers).then((r) => r.text());
      const resPygrams = await fetch(pygrams).then((r) => r.text());
      const resSearching = await fetch(searching).then((r) => r.text());
      const resSorting = await fetch(sorting).then((r) => r.text());

      let resList = [
        resGenerators,
        resGetters,
        resHaselements,
        resIssers,
        resPygrams,
        resSearching,
        resSorting,
      ];

      for (let i = 0; i < resList.length; i++) {
        codesList[i] = resList[i];
        complete_code += codesList[i];
      }

      the_program_code = breakTheCode(complete_code);

      $("#retrievedData").append(the_program_code);
    } catch (err) {
      console.error(err);
    }
  };
  getTheProgram();

  function breakTheCode(complete_code) {
    // console.log(complete_code);
    // index_value_of_the_character = codesGenerators.search(functionName);

    lines_of_code = complete_code.split(/\r\n|\r|\n/);

    console.log(lines_of_code);

    let the_program = "";
    let program_line_number = 0;

    for (let i = 0; i < lines_of_code.length; i++) {
      if (lines_of_code[i].includes(functionName)) {
        program_line_number = i;
        break;
      }
    }
    // console.log(program_line_number);

    for (let i = program_line_number; i <= lines_of_code.length; i++) {
      if (lines_of_code[i].includes("return ")) {
        the_program += lines_of_code[i] + "\n";
        break;
      } else {
        the_program += lines_of_code[i] + "\n";
      }
    }
    // console.log(the_program);
    return the_program;
  }

  return (
    <div>
      <div className="">
        <pre>
          {<code id="retrievedData" className={`language-${language}`}></code>}
        </pre>
      </div>
    </div>
  );
}

export default GetCode;
