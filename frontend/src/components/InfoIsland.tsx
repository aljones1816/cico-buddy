// component should take in a prop that contains a number and a string and displays them, e.g.: Calories: 1800

interface InfoIslandProps {
  number: number;
  string: string;
}

const InfoIsland = ({ number, string }: InfoIslandProps) => {
  return (
    <div className="info-island">
      <p>
        {string}: {number}
      </p>
    </div>
  );
};

export default InfoIsland;
