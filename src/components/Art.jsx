// Shows a real image if provided, otherwise generated SVG artwork.
export default function Art({ item, className = "" }) {
  if (item.image) {
    return <img className={className} src={item.image} alt={item.name || item.title} />;
  }

  const [c1, c2] = item.colors;
  const gid = `g-${(item.id || "featured")}`;

  return (
    <svg
      className={className}
      viewBox="0 0 200 260"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={item.name || item.title}
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={c1} />
          <stop offset="100%" stopColor={c2} />
        </linearGradient>
        <radialGradient id={`${gid}-glow`} cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="200" height="260" fill={`url(#${gid})`} />
      <rect width="200" height="260" fill={`url(#${gid}-glow)`} />
      <circle cx="100" cy="110" r="62" fill="none" stroke="#fff" strokeOpacity="0.35" strokeWidth="1.5" />
      <circle cx="100" cy="110" r="82" fill="none" stroke="#fff" strokeOpacity="0.15" strokeWidth="1" />
      <path d="M-10 230 Q100 170 210 230 L210 270 L-10 270 Z" fill="#000" fillOpacity="0.28" />
      <text
        x="100"
        y="140"
        textAnchor="middle"
        fontSize="86"
        fontWeight="600"
        fill="#fff"
        fillOpacity="0.92"
      >
        {item.symbol}
      </text>
    </svg>
  );
}