export function UscWordmark() {
  return (
    <svg viewBox="0 0 88 36" aria-hidden="true" className="h-9 w-auto">
      <rect x="2" y="1" width="84" height="2.5" fill="#FFCC00" />
      <rect x="8" y="5.5" width="72" height="1.25" fill="#FFCC00" />
      <text
        x="44"
        y="25"
        textAnchor="middle"
        fill="#FFCC00"
        fontFamily="Georgia, 'Times New Roman', Times, serif"
        fontSize="18"
        fontWeight="700"
        letterSpacing="1.5"
      >
        USC
      </text>
      <rect x="8" y="29" width="72" height="1.25" fill="#FFCC00" />
      <rect x="2" y="32.5" width="84" height="2.5" fill="#FFCC00" />
    </svg>
  );
}

export function PortraitPlaceholder() {
  return (
    <svg
      viewBox="0 0 300 380"
      role="img"
      aria-label="Portrait placeholder for Dr. Alexandra J. Martinez"
      className="mb-4 w-full border border-black"
    >
      <rect width="300" height="380" fill="#EEEEEE" />
      <rect x="1" y="1" width="298" height="378" fill="none" stroke="#000000" strokeWidth="2" />
      <rect x="18" y="18" width="264" height="344" fill="#CCCCCC" />
      <circle cx="150" cy="132" r="48" fill="#767676" />
      <path d="M78 300c8-62 34-92 72-92s64 30 72 92" fill="#767676" />
    </svg>
  );
}
