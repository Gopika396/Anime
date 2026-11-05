import { motion } from "framer-motion";
import { useState } from "react";
import Art from "./Art";
import { featured } from "../data/characters";

export default function LeftPanel({ selected }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.aside
      className={`flip-panel flip-left ${flipped ? "flipped" : ""}`}
      onPointerEnter={(e) => e.pointerType === "mouse" && setFlipped(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setFlipped(false)}
      onPointerUp={(e) => e.pointerType !== "mouse" && setFlipped((f) => !f)}
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="flip-inner">
        {/* FRONT */}
        <div className="glass-panel flip-face flip-front">
          <div className="poster-wrap">
            <Art item={featured} className="poster-img" />
          </div>
          <h3 className="panel-title">FEATURED ANIME</h3>
          <p className="panel-sub">{featured.title}</p>
          <p className="panel-hint">HOVER TO REVEAL INFO</p>
        </div>

        {/* BACK */}
        <div className="glass-panel flip-face flip-back">
          <div className="back-art">
            <Art item={selected} className="poster-img" />
          </div>
          <p className="back-label">NOW FEATURING</p>
          <h3 className="back-name">{selected.name}</h3>
          <p className="back-series">{selected.series}</p>
          <p className="back-cat">{selected.category}</p>
        </div>
      </div>
    </motion.aside>
  );
}