import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

/**
 * Datum Collective Binary Delta Emblem
 * Based directly on the official logo provided:
 * An upward chevron / arrow constructed out of amber/gold matrix binary bits (0, 1, ., *).
 */
export const DatumLogo: React.FC<LogoProps> = ({ className = '', size = 24 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width={size}
      height={size}
      fill="none"
      className={`shrink-0 select-none ${className}`}
    >
      <defs>
        <filter id="logo-amber-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g filter="url(#logo-amber-glow)">
        {/* Monospace ASCII text matrix mapped to binary chevron shape */}
        <g
          style={{
            fontFamily: "'IBM Plex Mono', 'JetBrains Mono', monospace",
            fontSize: '5.2px',
            fontWeight: 700,
            textAnchor: 'middle',
            dominantBaseline: 'central',
          }}
        >
          {/* Row 1 (Apex) */}
          <text x="50" y="22" fill="#fff5c0">1</text>

          {/* Row 2 */}
          <text x="47" y="27" fill="#e8d08d">1</text>
          <text x="50" y="27" fill="#fff5c0">0</text>
          <text x="53" y="27" fill="#e8d08d">1</text>

          {/* Row 3 */}
          <text x="44" y="32" fill="#e8d08d">1</text>
          <text x="47" y="32" fill="#fff5c0">0</text>
          <text x="50" y="32" fill="#e8d08d">0</text>
          <text x="53" y="32" fill="#fff5c0">0</text>
          <text x="56" y="32" fill="#b89f58">1</text>

          {/* Row 4 */}
          <text x="41" y="37" fill="#b89f58">.</text>
          <text x="44" y="37" fill="#fff5c0">0</text>
          <text x="47" y="37" fill="#e8d08d">1</text>
          <text x="50" y="37" fill="#fff5c0">1</text>
          <text x="53" y="37" fill="#e8d08d">0</text>
          <text x="56" y="37" fill="#fff5c0">0</text>
          <text x="59" y="37" fill="#b89f58">.</text>

          {/* Row 5 */}
          <text x="38" y="42" fill="#e8d08d">0</text>
          <text x="41" y="42" fill="#fff5c0">0</text>
          <text x="44" y="42" fill="#e8d08d">1</text>
          <text x="47" y="42" fill="#fff5c0">1</text>
          <text x="50" y="42" fill="#e8d08d">1</text>
          <text x="53" y="42" fill="#fff5c0">0</text>
          <text x="56" y="42" fill="#e8d08d">0</text>
          <text x="59" y="42" fill="#fff5c0">1</text>
          <text x="62" y="42" fill="#e8d08d">0</text>

          {/* Row 6 */}
          <text x="35" y="47" fill="#fff5c0">0</text>
          <text x="38" y="47" fill="#e8d08d">0</text>
          <text x="41" y="47" fill="#fff5c0">0</text>
          <text x="44" y="47" fill="#e8d08d">1</text>
          <text x="47" y="47" fill="#fff5c0">0</text>
          <text x="50" y="47" fill="#e8d08d">0</text>
          <text x="53" y="47" fill="#fff5c0">0</text>
          <text x="56" y="47" fill="#e8d08d">1</text>
          <text x="59" y="47" fill="#fff5c0">0</text>
          <text x="62" y="47" fill="#e8d08d">0</text>
          <text x="65" y="47" fill="#b89f58">1</text>

          {/* Row 7 */}
          <text x="33" y="52" fill="#e8d08d">1</text>
          <text x="36" y="52" fill="#fff5c0">0</text>
          <text x="39" y="52" fill="#e8d08d">0</text>
          <text x="42" y="52" fill="#fff5c0">0</text>
          <text x="45" y="52" fill="#e8d08d">0</text>
          <text x="48" y="52" fill="#fff5c0">1</text>
          <text x="51" y="52" fill="#e8d08d">0</text>
          <text x="54" y="52" fill="#fff5c0">1</text>
          <text x="57" y="52" fill="#e8d08d">1</text>
          <text x="60" y="52" fill="#fff5c0">0</text>
          <text x="63" y="52" fill="#e8d08d">1</text>
          <text x="66" y="52" fill="#fff5c0">0</text>

          {/* Row 8 */}
          <text x="30" y="57" fill="#fff5c0">1</text>
          <text x="33" y="57" fill="#e8d08d">0</text>
          <text x="36" y="57" fill="#fff5c0">0</text>
          <text x="39" y="57" fill="#e8d08d">0</text>
          <text x="42" y="57" fill="#fff5c0">0</text>
          <text x="45" y="57" fill="#e8d08d">0</text>
          <text x="55" y="57" fill="#fff5c0">1</text>
          <text x="58" y="57" fill="#e8d08d">0</text>
          <text x="61" y="57" fill="#fff5c0">0</text>
          <text x="64" y="57" fill="#e8d08d">1</text>
          <text x="67" y="57" fill="#fff5c0">0</text>
          <text x="70" y="57" fill="#b89f58">0</text>

          {/* Row 9 */}
          <text x="28" y="62" fill="#e8d08d">0</text>
          <text x="31" y="62" fill="#fff5c0">0</text>
          <text x="34" y="62" fill="#e8d08d">0</text>
          <text x="37" y="62" fill="#fff5c0">0</text>
          <text x="40" y="62" fill="#e8d08d">0</text>
          <text x="43" y="62" fill="#fff5c0">1</text>
          <text x="57" y="62" fill="#e8d08d">0</text>
          <text x="60" y="62" fill="#fff5c0">0</text>
          <text x="63" y="62" fill="#e8d08d">1</text>
          <text x="66" y="62" fill="#fff5c0">0</text>
          <text x="69" y="62" fill="#e8d08d">0</text>
          <text x="72" y="62" fill="#fff5c0">1</text>

          {/* Row 10 */}
          <text x="26" y="67" fill="#fff5c0">1</text>
          <text x="29" y="67" fill="#e8d08d">0</text>
          <text x="32" y="67" fill="#fff5c0">0</text>
          <text x="35" y="67" fill="#e8d08d">0</text>
          <text x="38" y="67" fill="#fff5c0">0</text>
          <text x="41" y="67" fill="#e8d08d">1</text>
          <text x="59" y="67" fill="#fff5c0">1</text>
          <text x="62" y="67" fill="#e8d08d">1</text>
          <text x="65" y="67" fill="#fff5c0">0</text>
          <text x="68" y="67" fill="#e8d08d">1</text>
          <text x="71" y="67" fill="#fff5c0">0</text>
          <text x="74" y="67" fill="#e8d08d">0</text>

          {/* Row 11 */}
          <text x="24" y="72" fill="#e8d08d">1</text>
          <text x="27" y="72" fill="#fff5c0">0</text>
          <text x="30" y="72" fill="#e8d08d">0</text>
          <text x="33" y="72" fill="#fff5c0">0</text>
          <text x="36" y="72" fill="#e8d08d">0</text>
          <text x="64" y="72" fill="#fff5c0">0</text>
          <text x="67" y="72" fill="#e8d08d">0</text>
          <text x="70" y="72" fill="#fff5c0">1</text>
          <text x="73" y="72" fill="#e8d08d">0</text>
          <text x="76" y="72" fill="#fff5c0">1</text>

          {/* Row 12 */}
          <text x="22" y="77" fill="#fff5c0">0</text>
          <text x="25" y="77" fill="#e8d08d">0</text>
          <text x="28" y="77" fill="#fff5c0">1</text>
          <text x="31" y="77" fill="#e8d08d">0</text>
          <text x="69" y="77" fill="#fff5c0">0</text>
          <text x="72" y="77" fill="#e8d08d">0</text>
          <text x="75" y="77" fill="#fff5c0">1</text>
          <text x="78" y="77" fill="#e8d08d">0</text>

          {/* Row 13 */}
          <text x="20" y="82" fill="#b89f58">1</text>
          <text x="23" y="82" fill="#fff5c0">0</text>
          <text x="26" y="82" fill="#e8d08d">0</text>
          <text x="74" y="82" fill="#fff5c0">0</text>
          <text x="77" y="82" fill="#e8d08d">0</text>
          <text x="80" y="82" fill="#b89f58">1</text>

          {/* Row 14 */}
          <text x="18" y="87" fill="#b89f58">1</text>
          <text x="21" y="87" fill="#e8d08d">0</text>
          <text x="79" y="87" fill="#e8d08d">0</text>
          <text x="82" y="87" fill="#b89f58">*</text>
        </g>
      </g>
    </svg>
  );
};
