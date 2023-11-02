function DataBox({ programID, programTitle }) {
  return (
    <div className={programID}>
      <h6 className="center">{programTitle}</h6>
      <div className="">
        <ul className="bold" id={programID}></ul>
      </div>
    </div>
  );
}

export default DataBox;
