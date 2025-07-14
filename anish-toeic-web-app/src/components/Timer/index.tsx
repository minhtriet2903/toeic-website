import { useEffect, useState } from "react";

const Timer = ({
  duration,
  onFinish,
}: {
  duration: number;
  onFinish: () => void;
}) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft <= 0) {
      onFinish();
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft, onFinish]);

  return (
    <div>
      <p>
        Time Left: {Math.floor(timeLeft / 3600)} hours,{" "}
        {Math.floor((timeLeft % 3600) / 60)} minutes, {timeLeft % 60} seconds
      </p>
    </div>
  );
};

export default Timer;
