import { useState, useEffect } from 'react';

const Timer = () => {
  const targetDate = new Date('2023-11-04T00:00:00').getTime();

  // Calculate the time remaining until the target date
  const calculateTimeRemaining = () => {
    const difference = +new Date(targetDate) - +new Date();
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return {
      days,
      hours,
      minutes,
      seconds
    };
  };

  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  return (
    <>
        <div className="countdown-timer" >
        <div className="box">
          <p className="time" key="days">{timeRemaining.days}</p>
          <p className="label">Days</p>
        </div>
        <div className="box">
        <p className="time" key="hours">{timeRemaining.hours}</p>
          <p className="label">Hours</p>
        </div>
        <div className="box">
          <p className="time" key="minutes">{timeRemaining.minutes}</p>
          <p className="label">Minutes</p>
        </div>
        <div className="box">
          <p className="time" key="seconds">{timeRemaining.seconds}</p>
          <p className="label">Seconds</p>
        </div>
      </div>
    </>
    )
}
export default Timer