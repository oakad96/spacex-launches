import { React, useState, useEffect } from "react";
import CrewMembers from "./CrewMembers";
import SlideShow from "./SlideShow";

const LaunchCard = () => {
  const [latestLaunch, setLatestLaunch] = useState(null);
  const [date, setDate] = useState(null);
  const [crewIds, setCrewIds] = useState([]);

  useEffect(() => {
    fetch(
      "https://api.spacexdata.com/v4/launches/5eb87d42ffd86e000604b384"
    ).then((res) =>
      res.json().then((data) => {
        setLatestLaunch(data);
        setDate(new Date(data.date_utc));
        setCrewIds(data.crew);
      })
    );
  }, []);

  return (
    <div className="mx-auto max-w-screen-xl rounded-sm shadow-lg px-2 py-8 lg:flex lg:flex-col lg:justify-between lg:items-center lg:align-center">
      <div className="flex flex-col gap-4 lg:gap-24 lg:justify-center lg:items-center lg:flex-row lg:mx-auto">
        <div className="p-4 flex flex-col items-center lg:mb-0">
          <img
            className="max-w-xs"
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
        <div className="p-4 mb-8 lg:m-4 w-full">
          <CrewMembers crewIds={crewIds} />
        </div>
      </div>
      <SlideShow images={latestLaunch?.links?.flickr?.original} />
    </div>
  );
};

export default LaunchCard;
