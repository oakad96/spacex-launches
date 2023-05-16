import { React, useEffect, useState } from "react";

const CrewMembers = (props) => {
  const { crewIds } = props;
  const [crew, setCrew] = useState([]);

  useEffect(() => {
    const fetchCrew = async () => {
      const crew = await Promise.all(
        crewIds.map((id) =>
          fetch(`https://api.spacexdata.com/v4/crew/${id}`).then((res) =>
            res.json()
          )
        )
      );
      setCrew(crew);
    };

    fetchCrew();
  }, [crewIds]);

  return (
    <div>
      <h4>Crew Members:</h4>
      <ul>
        {crew.map((member) => (
          <li key={member?.id}>{member?.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default CrewMembers;
