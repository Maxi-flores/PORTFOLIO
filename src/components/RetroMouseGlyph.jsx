export default function RetroMouseGlyph({ className = '' }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      aria-hidden="true"
      focusable="false"
      shapeRendering="crispEdges"
    >
      <rect width="32" height="32" fill="none" />
      <rect x="10" y="5" width="12" height="20" fill="currentColor" opacity="0.9" />
      <rect x="11" y="6" width="10" height="18" fill="#020804" opacity="0.9" />
      <rect x="14" y="6" width="4" height="7" fill="currentColor" opacity="0.9" />
      <rect x="15" y="7" width="2" height="5" fill="#020804" opacity="0.9" />
      <rect x="13" y="25" width="6" height="2" fill="currentColor" opacity="0.9" />
      <rect x="12" y="24" width="8" height="1" fill="currentColor" opacity="0.9" />
    </svg>
  );
}

