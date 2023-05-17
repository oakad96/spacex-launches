import { React, useState, useEffect } from "react";
import { Card } from "flowbite-react";
import CrewMembers from "./CrewMembers";

const LaunchCard = () => {
  const [latestLaunch, setLatestLaunch] = useState(null);
  const [date, setDate] = useState(null);
  const [crewIds, setCrewIds] = useState([]);
  const [crew, setCrew] = useState([]);

  useEffect(() => {
    fetch("https://api.spacexdata.com/v4/launches/latest").then((res) =>
      res.json().then((data) => {
        setLatestLaunch(data);
        setDate(new Date(data.date_utc));
        setCrewIds(data.crew);
      })
    );
  }, []);

  return (
    <Card className="mx-auto max-w-screen-xl">
      <div className="flex flex-row justify-evenly  ">
        <div className="flex flex-col gap-8">
          <img
            className=" max-w-xs"
            src={latestLaunch?.links?.patch?.small}
            alt="Launch Patch Image"
          />
          <div id="launch-info" className="flex flex-col gap-2">
            <h2>
              <span className="font-bold">Name: </span> {latestLaunch?.name}
            </h2>
            <h2>
              <span className="font-bold">Flight Number: </span>
              {latestLaunch?.flight_number}
            </h2>
            <h2>
              <span className="font-bold">Date: </span> {date?.toUTCString()}
            </h2>
            <div id="details">
              <h3 className="font-bold">Details:</h3>
              <p>
                {latestLaunch?.details
                  ? latestLaunch?.details
                  : "No details on this launch."}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center gap-5">
          <CrewMembers crewIds={crewIds} />
        </div>
      </div>
    </Card>
  );
};

export default LaunchCard;
