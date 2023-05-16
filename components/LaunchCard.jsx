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
      <img
        className="max-w-sm mx-auto"
        src={latestLaunch?.links?.patch?.large}
        alt="Launch Patch Image"
      />
      <h2>Launch Name: {latestLaunch?.name}</h2>
      <h1>Launch Flight Number: {latestLaunch?.flight_number}</h1>
      <h3>Launch Date: {date?.toUTCString()}</h3>
      <p>
        {latestLaunch?.details
          ? latestLaunch?.details
          : "No details on this launch."}
      </p>
      <h4>Rocket Name: {latestLaunch?.rocket}</h4>
      <CrewMembers crewIds={crewIds} />
    </Card>
  );
};

export default LaunchCard;
