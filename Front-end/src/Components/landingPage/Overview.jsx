import { useState, useEffect } from "react";

const OverView = () => {
  const dynamicWords = [" grow", " play", " learn"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % dynamicWords.length);
    }, 2000);

    return () => clearInterval(intervalId);
  }, [currentWordIndex, dynamicWords.length]);
  const colors = ["brown", "green", "crimson"]; // Example colors

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <p className="slogan text-center">
            Empowering your family to <br /> safely
            <span
              key={currentWordIndex}
              style={{ color: colors[currentWordIndex] }}
              className={`changing-word-${currentWordIndex}`}
            >
              {dynamicWords[currentWordIndex]}
            </span>
            <br />
            online.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OverView;
