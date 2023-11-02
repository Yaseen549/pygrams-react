import GetCode from "./Components/GetCode";
import React, { useState, useEffect } from "react";

function ProgramPage({ programPath }) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  // console.log(programPath); // gives output like" /generateOddNumbers

  let functionName = "";
  for (let i = 1; i < programPath.length; i++) {
    functionName += programPath[i];
  }
  let currentFunctionName = functionName.replace(/([a-z])([A-Z])/g, "$1 $2");
  let currentCapitalizedFunctionName =
    currentFunctionName.charAt(0).toUpperCase() + currentFunctionName.slice(1);
  // console.log(functionName);

  return (
    <div>
      <section id="headerProgramPage" className="headerProgramPage center">
        <h1 className="title">
          <span>{currentCapitalizedFunctionName}</span>
        </h1>
        {/* <p className="">
          using {functionName}() you can check if input{" "}
          {currentCapitalizedFunctionName}
        </p> */}

        <div className="copyIt">
          <span className="copybox">
            {functionName}(){" "}
            <span className="copybutton">
              <button
                className="copycssdsign bold"
                onClick={() =>
                  navigator.clipboard.writeText(`${functionName}()`)
                }
              >
                <span className="bold">Copy</span>  
              </button>
            </span>
          </span>
        </div>

        <br />

        <div className="code-preview">
          {loading ? (
            <div className="loader-container">
              <div className="spinner"></div>
            </div>
          ) : (
            <GetCode functionName={functionName} />
          )}
          ;
        </div>
      </section>
    </div>
  );
}

export default ProgramPage;
