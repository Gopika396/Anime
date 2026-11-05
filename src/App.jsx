import { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Brand from "./components/Brand";
import LeftPanel from "./components/LeftPanel";
import CenterCards from "./components/CenterCards";
import RightPanel from "./components/RightPanel";
import { characters } from "./data/characters";

export default function App() {
  const [selected, setSelected] = useState(characters[1]);

  // Raw mouse position (-1 to 1), then smoothed with springs
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 70, damping: 18, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 70, damping: 18, mass: 0.6 });

  // LAYER 1: background light (moves the least)
  const bgX = useTransform(sx, [-1, 1], [-14, 14]);
  const bgY = useTransform(sy, [-1, 1], [-10, 10]);

  const handleMove = (e) => {
    if (e.pointerType && e.pointerType !== "mouse") return; // disable on touch
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
    my.set(((e.clientY - rect.top) / rect.height) * 2 - 1);
  };

  const handleLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <div className="app" onPointerMove={handleMove} onPointerLeave={handleLeave}>
      <motion.div className="bg-light" style={{ x: bgX, y: bgY }} />
      <Brand />
      <main className="stage">
        <LeftPanel selected={selected} />
        <CenterCards sx={sx} sy={sy} selected={selected} onSelect={setSelected} />
        <RightPanel selected={selected} />
      </main>
    </div>
  );
}