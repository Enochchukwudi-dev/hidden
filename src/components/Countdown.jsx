import React, { useEffect, useMemo, useState } from "react";
import "./Countdown.css";

// Shows a DD:HH:MM:SS countdown to the next occurrence of target hour:minute
export default function Countdown({ hour = 19, minute = 30, onFinish = () => {} }) {
  const target = useMemo(() => nextTarget(hour, minute), [hour, minute]);
  const [remaining, setRemaining] = useState(calcRemaining(target));
  const [finished, setFinished] = useState(remaining.total <= 0);

  useEffect(() => {
    if (finished) return;
    const t = setInterval(() => {
      const r = calcRemaining(target);
      setRemaining(r);
      if (r.total <= 0) {
        clearInterval(t);
        setFinished(true);
        onFinish();
      }
    }, 250);
    return () => clearInterval(t);
  }, [target, finished, onFinish]);

  if (finished) return null; // hide once countdown completes

  const parts = formatParts(remaining);

  return (
    <div className="countdown-overlay" role="status" aria-live="polite">
      <div className="countdown-box">
        <div className="countdown-title">FOLLOW GOD drops at 7:30 PM</div>
        <div className="countdown-digits">{parts.join(":")}</div>
        <div className="countdown-sub">Set your alarm. Limited pieces available.</div>
      </div>
    </div>
  );
}

function nextTarget(hour, minute) {
  const now = new Date();
  const t = new Date(now);
  t.setHours(hour, minute, 0, 0);
  if (t <= now) {
    // already past today — pick tomorrow
    t.setDate(t.getDate() + 1);
  }
  return t;
}

function calcRemaining(target) {
  const now = new Date();
  const total = target - now;
  const absTotal = Math.max(0, total);
  const seconds = Math.floor((absTotal / 1000) % 60);
  const minutes = Math.floor((absTotal / (1000 * 60)) % 60);
  const hours = Math.floor((absTotal / (1000 * 60 * 60)) % 24);
  const days = Math.floor(absTotal / (1000 * 60 * 60 * 24));
  return { total, days, hours, minutes, seconds };
}

function two(n) {
  return String(n).padStart(2, "0");
}

function formatParts(rem) {
  // DD:HH:MM:SS
  return [two(rem.days), two(rem.hours), two(rem.minutes), two(rem.seconds)];
}
