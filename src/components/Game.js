import { useEffect, useState } from "react";

export default function Game() {
  const [carSpeed, setCarSpeed] = useState(1);
  const [speedTimer, setSpeedTimer] = useState(null);
  const [distanceTraveled, setDistanceTraveled] = useState(0);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    let interval;

    if (isStarted) {
      interval = setInterval(() => {
        setDistanceTraveled((prev) => {
          const newDistance = prev + 0.01 * carSpeed;
          return Math.round(newDistance * 100) / 100;
        });
      }, 100);
    }

    return () => clearInterval(interval);
  }, [carSpeed, isStarted]);

  const handleClickOnCar = () => {
    resetTimer();
    speedUpTheCar();
    startTimer();
  };

  const startTimer = () => {
    const timer = setTimeout(() => {
      setCarSpeed(1);
      document.getElementById("road").style.animation =
        "roadanimation 1s linear infinite";
      document.getElementById("mycarimg").classList.remove("carInSpeedClass");
    }, 5000);
    setSpeedTimer(timer);
  };

  const resetTimer = () => {
    clearTimeout(speedTimer);
  };

  const speedUpTheCar = () => {
    setCarSpeed(4);
    document.getElementById("mycarimg").classList.add("carInSpeedClass");
    document.getElementById("road").style.animation =
      "roadanimation 0.4s linear infinite";
  };

  const startGame = () => {
    setIsStarted(true);
    document.getElementById("mycar").classList.remove("mouseBlocked");
    document.getElementById("start").style.display = "none";
    document.getElementById("road").style.animation =
      "roadanimation 1s linear infinite";

    let t = 67; // Adjusted top position to ensure the car is fully visible
    let l = 50; // Updated left position to keep the car at the center

    window.addEventListener("keydown", (x) => {
      if (x.keyCode === 87) t -= 3;
      if (x.keyCode === 65) l -= 1;
      if (x.keyCode === 83) t += 3;
      if (x.keyCode === 68) l += 1;
      document.getElementById("mycar").style.top = `${t}vh`;
      document.getElementById("mycar").style.left = `${l}vw`;
    });
  };

  return (
    <div>
      <div id="score">Distance: {distanceTraveled} KM</div>
      <button id="start" onClick={startGame}>
        Start
      </button>

      <div className="mouseBlocked" id="mycar">
        <img
          onDoubleClick={handleClickOnCar}
          id="mycarimg"
          className="mycarimg"
          src="car1.png"
          alt="my car"
        />
      </div>
      <div id="road"></div>

      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          scroll-behavior: smooth;
        }
        body {
          font-family: sans-serif;
          background: url(27471.jpg) no-repeat center;
          background-size: cover;
          height: 100vh;
          display: grid;
          place-items: center;
          overflow-y: hidden;
        }
        #road {
          z-index: -1;
          position: absolute;
          top: 0;
          left: 0;
          background: url(road6.png) repeat;
          background-position-x: center;
          width: 100vw;
          height: 100vh;
        }

        #start {
          position: absolute;
          z-index: 100;
          font-size: 2rem;
          background-color: green;
          color: white;
          cursor: pointer;
          border: none;
          border-radius: 8px;
          padding: 10px;
          font-weight: bold;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        #score {
          position: absolute;
          top: 20px;
          left: 20px;
          color: white;
          font-size: 2rem;
          font-weight: bold;
          border-radius: 8px;
          background: midnightblue;
          padding: 10px;
        }
        #mycar {
          width: 100p;
          height: 100px;
          position: absolute;
          top: 67vh;
          left: 50vw;
          -webkit-transform: translatex(-50%);
          -moz-transform: translatex(-50%);
          -ms-transform: translatex(-50%);
          -o-transform: translatex(-50%);
          transform: translatex(-50%);
          text-align: -webkit-center;
          text-align: center;
        }
        .mycarimg {
          width: 90px;
        }
        @keyframes roadanimation {
          0% {
            background-position-y: 0;
          }
          100% {
            background-position-y: 400px;
          }
        }

        @keyframes carInSpeed {
          0%,
          100% {
            transform: scale(0.96);
          }
          50% {
            transform: scale(1.04);
          }
        }
        .carInSpeedClass {
          animation: carInSpeed 1s ease infinite;
        }
        .mouseBlocked {
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}
