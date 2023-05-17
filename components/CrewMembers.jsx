import { Avatar } from "flowbite-react";
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
      <h4 className="font-bold mb-4">Crew Members:</h4>
      <ul className="flex flex-col gap-4">
        {crew.map((member) => (
          <li key={member?.id}>
            <div className="flex flex-row gap-4">
              <img
                src={member?.image}
                alt={member?.name}
                className=" w-12 rounded-lg"
              />
              <span className="my-auto">{member?.name}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CrewMembers;
