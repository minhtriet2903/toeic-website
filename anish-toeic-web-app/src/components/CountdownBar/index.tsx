import React, { useEffect, useState } from "react";

interface CountdownBarProps {
  duration: number; // in seconds
  onComplete?: () => void;
  className?: string; // Optional Tailwind classes
}

const CountdownBar: React.FC<CountdownBarProps> = ({
  duration,
  onComplete,
  className = "",
}) => {
  const [percent, setPercent] = useState(100);

  useEffect(() => {
    const startTime = Date.now();

    const interval = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;
      const remaining = Math.max(0, duration - elapsed);
      const newPercent = (remaining / duration) * 100;
      setPercent(newPercent);

      if (remaining <= 0) {
        clearInterval(interval);
        onComplete?.();
      }
    }, 50);

    return () => clearInterval(interval);
  }, [duration, onComplete]);

  return (
    <div className={`w-full ${className}`}>
      <div className="w-full bg-gray-200 rounded-full overflow-hidden h-2">
        <div
          className="bg-blue-500 h-full transition-all duration-50 ease-linear"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};

export default CountdownBar;
