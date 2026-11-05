import { useState } from "react";
import { motion, useTransform } from "framer-motion";
import Art from "./Art";
import { characters } from "../data/characters";

// OPEN = cards popped up in a fan. CLOSED = cards tucked inside the glass card.
const openPose = {
  gojo: { x: -82, y: -32, rotateZ: -14, rotateY: 12, z: 10, scale: 1, opacity: 1 },
  luffy: { x: 0, y: -62, rotateZ: 0, rotateY: 0, z: 30, scale: 1, opacity: 1 },
  tanjiro: { x: 82, y: -32, rotateZ: 14, rotateY: -12, z: 10, scale: 1, opacity: 1 },
};

const closedPose = (id, active) => {
  const side = id === "gojo" ? -1 : id === "tanjiro" ? 1 : 0;
  return {
    x: active ? 0 : side * 10,
    y: active ? 66 : 62,
    rotateZ: active ? 0 : side * 4,
    rotateY: 0,
    z: active ? 40 : 10,
    scale: 0.72,
    opacity: active ? 1 : 0.55,
  };
};

export default function CenterCards({ sx, sy, selected, onSelect }) {
  const [open, setOpen] = useState(false);

  const cardsX = useTransform(sx, [-1, 1], [-10, 10]);
  const cardsY = useTransform(sy, [-1, 1], [-8, 8]);
  const glassX = useTransform(sx, [-1, 1], [-26, 26]);
  const glassY = useTransform(sy, [-1, 1], [-18, 18]);
  const glassRY = useTransform(sx, [-1, 1], [-8, 8]);
  const glassRX = useTransform(sy, [-1, 1], [8, -8]);
  const groupRY = useTransform(sx, [-1, 1], [-14, 14]);
  const groupRX = useTransform(sy, [-1, 1], [10, -10]);

  return (
    <div
      className="center-stage"
      onPointerEnter={(e) => e.pointerType === "mouse" && setOpen(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setOpen(false)}
      onClick={() => setOpen(true)}
    >
      <motion.div className="tilt-group" style={{ rotateX: groupRX, rotateY: groupRY }}>
        {/* LAYER 2: character cards */}
        <motion.div className="cards-layer" style={{ x: cardsX, y: cardsY }}>
          {characters.map((c, i) => {
            const active = selected.id === c.id;
            return (
              <motion.div
                key={c.id}
                className={`mini-card ${active ? "active" : ""}`}
                initial={closedPose(c.id, active)}
                animate={open ? openPose[c.id] : closedPose(c.id, active)}
                whileHover={
                  open ? { z: openPose[c.id].z + 50, scale: 1.06 } : undefined
                }
                transition={{
                  type: "spring",
                  stiffness: 120,
                  damping: 17,
                  delay: open ? i * 0.06 : 0,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setOpen(true);
                  onSelect(c);
                }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && onSelect(c)}
              >
                <div className="mini-float" style={{ animationDelay: `${i * 0.8}s` }}>
                  <div className="mini-art">
                    <Art item={c} className="mini-art-img" />
                    <span className="mini-dot" style={{ background: c.colors[0] }} />
                  </div>
                  <p className="mini-name">{c.name}</p>
                  <p className="mini-series">{c.series}</p>
                  <div className="mini-deco">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* LAYER 3: front glass card (mouse parallax wrapper) */}
        <motion.div
          className="glass-front"
          style={{ x: glassX, y: glassY, rotateX: glassRX, rotateY: glassRY, z: 110 }}
        >
          {/* open/close wrapper */}
          <motion.div
            className="glass-state"
            initial={{ y: -40, rotateX: 14, scale: 0.95 }}
            animate={
              open
                ? { y: 0, rotateX: 0, scale: 1 }
                : { y: -40, rotateX: 14, scale: 0.95 }
            }
            transition={{ type: "spring", stiffness: 110, damping: 16 }}
          >
            <div className="glass-float">
              <div className="glass-outline" />
              <div className="glass-tab" />
              <div className="glass-brand">
                <i className="bi bi-circle-fill" />
                <span>ANIMEVERSE</span>
              </div>
              <div className="glass-shine" />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}