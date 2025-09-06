import { useState, useEffect, useRef } from "react";

export default function BreathExercise({ type = "login" }) {
  const [showExercise, setShowExercise] = useState(false);
  const [stepText, setStepText] = useState("Inhale");
  const [timeLeft, setTimeLeft] = useState(0);
  const [circleColor, setCircleColor] = useState("#34D399");

  const circleRef = useRef(null);

  const RADIUS = 100;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

  useEffect(() => {
    const key =
      type === "signup"
        ? "breathExerciseSignupDone"
        : "breathExerciseLoginDone";

    if (!sessionStorage.getItem(key)) {
      setShowExercise(true);

      const cycles = type === "signup" ? 2 : 1;
      let currentCycle = 0;

      const steps = [
        { name: "Inhale", duration: 4, color: "#34D399" },
        { name: "Hold", duration: 6, color: "#10B981" },
        { name: "Release", duration: 4, color: "#6EE7B7" },
      ];

      let stepIndex = 0;

      const startStep = (step) => {
        setStepText(step.name);
        setTimeLeft(step.duration);
        setCircleColor(step.color);

        let elapsed = 0;

        if (circleRef.current) {
          circleRef.current.setAttribute("stroke", step.color);
          circleRef.current.style.strokeDasharray = CIRCUMFERENCE;
        }

        const timer = setInterval(() => {
          elapsed++;
          setTimeLeft(step.duration - elapsed);

          if (circleRef.current) {
            const progress = elapsed / step.duration;
            circleRef.current.style.strokeDashoffset =
              CIRCUMFERENCE * (1 - progress);
          }

          if (elapsed >= step.duration) clearInterval(timer);
        }, 1000);
      };

      const nextStep = () => {
        stepIndex++;
        if (stepIndex >= steps.length) {
          currentCycle++;
          if (currentCycle >= cycles) {
            sessionStorage.setItem(key, "true");
            setShowExercise(false);
            return;
          }
          stepIndex = 0;
        }
        startStep(steps[stepIndex]);
        setTimeout(() => nextStep(), steps[stepIndex].duration * 1000);
      };

      startStep(steps[0]);
      setTimeout(() => nextStep(), steps[0].duration * 1000);
    }
  }, [type]);

  if (!showExercise) return null;

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-green-100 via-white to-green-200 z-50">
      <div className="relative w-64 h-64 flex items-center justify-center">
        <svg width="240" height="240" className="absolute rotate-[-90deg]">
          <circle
            ref={circleRef}
            r={RADIUS}
            cx="120"
            cy="120"
            fill="transparent"
            stroke={circleColor}
            strokeWidth="12"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={CIRCUMFERENCE}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center">
          <span className="text-3xl font-bold" style={{ color: circleColor }}>
            {stepText}
          </span>
          <span className="text-2xl text-gray-600 mt-2">{timeLeft}s</span>
        </div>
      </div>
      <p className="mt-8 text-gray-700 text-lg font-medium animate-pulse">
        Focus on your breath 🌿
      </p>
    </div>
  );
}
