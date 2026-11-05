import { motion } from "framer-motion";
import { useState } from "react";

export default function RightPanel({ selected }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.aside
      className={`flip-panel flip-right ${flipped ? "flipped" : ""}`}
      onPointerEnter={(e) => e.pointerType === "mouse" && setFlipped(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setFlipped(false)}
      onPointerUp={(e) => e.pointerType !== "mouse" && setFlipped((f) => !f)}
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="flip-inner">
        {/* FRONT */}
        <div className="glass-panel flip-face flip-front">
          <i className="bi bi-stars profile-icon" />
          <h3 className="panel-title">CHARACTER PROFILE</h3>
          <p className="panel-hint">HOVER TO REVEAL SPECS</p>
        </div>

        {/* BACK */}
        <div className="glass-panel flip-face flip-back">
          <p className="back-label">CHARACTER SPECS</p>
          <ul className="specs">
            <li>
              <span>Name</span>
              <b>{selected.name}</b>
            </li>
            <li>
              <span>Series</span>
              <b>{selected.series}</b>
            </li>
            <li>
              <span>Power</span>
              <b>{selected.power}</b>
            </li>
            <li>
              <span>Ability</span>
              <b>{selected.ability}</b>
            </li>
            <li>
              <span>Category</span>
              <b>{selected.category}</b>
            </li>
          </ul>
        </div>
      </div>
    </motion.aside>
  );
}