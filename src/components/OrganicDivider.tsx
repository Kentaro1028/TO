"use client";

type Props = {
  fromColor: string;
  toColor: string;
  variant?: 1 | 2 | 3;
  flipY?: boolean;
};

const wavePaths: Record<number, string> = {
  1: "M-2,28 C200,64 420,4  660,34 C900,62 1140,8  1380,38 L1442,38 L1442,72 L-2,72 Z",
  2: "M-2,44 C180,10 380,58 600,28 C820,0  1040,54 1260,22 C1360,8  1420,32 1442,28 L1442,72 L-2,72 Z",
  3: "M-2,18 C300,56 560,0  820,36 C1080,72 1260,16 1442,40 L1442,72 L-2,72 Z",
};

export default function OrganicDivider({
  fromColor,
  toColor,
  variant = 1,
  flipY = false,
}: Props) {
  const path = wavePaths[variant];
  const filterId = `rough-${variant}`;

  return (
    <div
      className="relative w-full overflow-hidden pointer-events-none"
      style={{
        height: 72,
        background: fromColor,
        transform: flipY ? "scaleY(-1)" : undefined,
        marginBottom: flipY ? -1 : 0,
        marginTop: flipY ? 0 : -1,
      }}
    >
      <svg
        viewBox="0 0 1440 72"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id={filterId} x="-5%" y="-20%" width="110%" height="140%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.04 0.02"
              numOctaves="3"
              seed="8"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="4"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
        <path d={path} fill={toColor} filter={`url(#${filterId})`} />
      </svg>
    </div>
  );
}
