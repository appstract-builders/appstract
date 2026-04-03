"use client";

import { useAnimationFrame, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const TAU = Math.PI * 2;
const MOBILE_WAVE_MEDIA_QUERY = "(max-width: 640px)";

type WaveConfig = {
  baseY: number;
  amplitude: number;
  stroke: string;
  glow: string;
  width: number;
  duration: number;
  opacity: number;
  seed: number;
};

type WaveNode = {
  x: number;
  amplitudeBase: number;
  amplitudeRange: number;
  phase: number;
  phaseSecondary: number;
  speed: number;
  secondarySpeed: number;
  frequency: number;
};

type WaveModel = {
  baseY: number;
  opacity: number;
  glow: string;
  stroke: string;
  width: number;
  duration: number;
  defaultPath: string;
  nodes: WaveNode[];
};

type Point = {
  x: number;
  y: number;
};

const waves: WaveConfig[] = [
  {
    baseY: 156,
    amplitude: 56,
    stroke: "rgba(160,244,255,0.54)",
    glow: "rgba(160,244,255,0.18)",
    width: 1.25,
    duration: 16.5,
    opacity: 0.42,
    seed: 11,
  },
  {
    baseY: 252,
    amplitude: 60,
    stroke: "rgba(193,169,255,0.5)",
    glow: "rgba(193,169,255,0.16)",
    width: 1.2,
    duration: 18.4,
    opacity: 0.38,
    seed: 27,
  },
  {
    baseY: 350,
    amplitude: 62,
    stroke: "rgba(180,228,255,0.46)",
    glow: "rgba(180,228,255,0.15)",
    width: 1.05,
    duration: 20.2,
    opacity: 0.31,
    seed: 43,
  },
  {
    baseY: 456,
    amplitude: 64,
    stroke: "rgba(211,184,255,0.44)",
    glow: "rgba(211,184,255,0.14)",
    width: 1,
    duration: 22.1,
    opacity: 0.28,
    seed: 59,
  },
  {
    baseY: 574,
    amplitude: 58,
    stroke: "rgba(168,246,255,0.4)",
    glow: "rgba(168,246,255,0.12)",
    width: 0.95,
    duration: 23.8,
    opacity: 0.24,
    seed: 71,
  },
  {
    baseY: 694,
    amplitude: 52,
    stroke: "rgba(186,167,255,0.36)",
    glow: "rgba(186,167,255,0.1)",
    width: 0.9,
    duration: 25.2,
    opacity: 0.2,
    seed: 83,
  },
  {
    baseY: 812,
    amplitude: 46,
    stroke: "rgba(178,232,255,0.32)",
    glow: "rgba(178,232,255,0.08)",
    width: 0.85,
    duration: 27.4,
    opacity: 0.17,
    seed: 97,
  },
];

const planeWaveGradients = [
  [
    { offset: "0%", color: "rgba(112,245,255,0.92)" },
    { offset: "24%", color: "rgba(100,214,255,0.96)" },
    { offset: "52%", color: "rgba(101,137,255,0.94)" },
    { offset: "78%", color: "rgba(177,126,255,0.96)" },
    { offset: "100%", color: "rgba(236,150,255,0.92)" },
  ],
  [
    { offset: "0%", color: "rgba(132,248,255,0.84)" },
    { offset: "26%", color: "rgba(97,221,255,0.88)" },
    { offset: "54%", color: "rgba(87,152,255,0.9)" },
    { offset: "80%", color: "rgba(163,130,255,0.9)" },
    { offset: "100%", color: "rgba(216,164,255,0.84)" },
  ],
  [
    { offset: "0%", color: "rgba(126,239,255,0.8)" },
    { offset: "22%", color: "rgba(114,198,255,0.84)" },
    { offset: "50%", color: "rgba(104,129,255,0.88)" },
    { offset: "76%", color: "rgba(194,138,255,0.88)" },
    { offset: "100%", color: "rgba(234,162,255,0.82)" },
  ],
];

function createSeededRandom(seed: number) {
  let value = seed >>> 0;

  return () => {
    value = (value * 1664525 + 1013904223) >>> 0;
    return value / 4294967296;
  };
}

function round(value: number) {
  return Math.round(value * 100) / 100;
}

function catmullRomPath(points: Point[], tension = 0.78) {
  if (points.length === 0) {
    return "";
  }

  if (points.length === 1) {
    return `M${round(points[0].x)} ${round(points[0].y)}`;
  }

  const path = [`M${round(points[0].x)} ${round(points[0].y)}`];

  for (let index = 0; index < points.length - 1; index += 1) {
    const p0 = points[index - 1] ?? points[index];
    const p1 = points[index];
    const p2 = points[index + 1];
    const p3 = points[index + 2] ?? p2;

    const cp1x = p1.x + ((p2.x - p0.x) / 6) * tension;
    const cp1y = p1.y + ((p2.y - p0.y) / 6) * tension;
    const cp2x = p2.x - ((p3.x - p1.x) / 6) * tension;
    const cp2y = p2.y - ((p3.y - p1.y) / 6) * tension;

    path.push(
      `C${round(cp1x)} ${round(cp1y)} ${round(cp2x)} ${round(cp2y)} ${round(p2.x)} ${round(p2.y)}`,
    );
  }

  return path.join("");
}

function createWaveModel(wave: WaveConfig, isMobile: boolean): WaveModel {
  const random = createSeededRandom(wave.seed);
  const xPoints = isMobile
    ? [-120, 600, 1260, 1680]
    : [-120, 180, 480, 780, 1080, 1380, 1680];
  const nodes = xPoints.map((x, index) => ({
    x,
    amplitudeBase: wave.amplitude * (0.52 + random() * 0.28),
    amplitudeRange: wave.amplitude * (0.3 + random() * 0.18),
    phase: random() * TAU,
    phaseSecondary: random() * TAU,
    speed: 0.92 + random() * 0.52,
    secondarySpeed: 0.8 + random() * 0.32,
    frequency: isMobile
      ? 0.12 + index * 0.012 + random() * 0.014
      : 0.34 + index * 0.03 + random() * 0.035,
  }));

  return {
    baseY: wave.baseY,
    opacity: wave.opacity,
    glow: wave.glow,
    stroke: wave.stroke,
    width: wave.width,
    duration: wave.duration,
    defaultPath: buildWavePath(0, nodes, wave.baseY),
    nodes,
  };
}

function buildWavePath(time: number, nodes: WaveNode[], baseY: number) {
  const points = nodes.map((node) => {
    const amplitude =
      node.amplitudeBase +
      Math.sin(time * node.secondarySpeed + node.phaseSecondary) * node.amplitudeRange;
    const y = baseY + Math.sin(time * node.speed + node.phase + node.x * 0.0026 * node.frequency) * amplitude;

    return { x: node.x, y };
  });

  return catmullRomPath(points);
}

export default function HomeBackground() {
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const glowRefs = useRef<Array<SVGPathElement | null>>([]);
  const strokeRefs = useRef<Array<SVGPathElement | null>>([]);
  const waveModels = waves.map((wave) => createWaveModel(wave, isMobile));

  useEffect(() => {
    const mediaQuery = window.matchMedia(MOBILE_WAVE_MEDIA_QUERY);
    const updateViewportState = () => {
      setIsMobile(mediaQuery.matches);
    };

    updateViewportState();
    mediaQuery.addEventListener("change", updateViewportState);

    return () => {
      mediaQuery.removeEventListener("change", updateViewportState);
    };
  }, []);

  useAnimationFrame((time) => {
    if (shouldReduceMotion) {
      return;
    }

    const seconds = time / 1000;

    waveModels.forEach((wave, index) => {
      const cycleTime = (seconds / wave.duration) * TAU;
      const path = buildWavePath(cycleTime, wave.nodes, wave.baseY);
      const glowPath = glowRefs.current[index];
      const strokePath = strokeRefs.current[index];

      if (glowPath) {
        glowPath.setAttribute("d", path);
      }

      if (strokePath) {
        strokePath.setAttribute("d", path);
      }
    });
  });

  return (
    <>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(2,6,17,0.98)_0%,_rgba(4,9,22,0.95)_42%,_rgba(2,6,17,1)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,_rgba(112,245,255,0.1),_transparent_24%),radial-gradient(circle_at_82%_14%,_rgba(236,150,255,0.12),_transparent_26%),radial-gradient(circle_at_52%_24%,_rgba(101,137,255,0.09),_transparent_22%),radial-gradient(circle_at_50%_82%,_rgba(112,245,255,0.05),_transparent_34%)]" />
      <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:120px_120px] [mask-image:radial-gradient(circle_at_center,black,transparent_78%)]" />

      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 980"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <filter id="wave-soft-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="7" />
          </filter>
          {waves.map((_, index) => {
            const gradient = planeWaveGradients[index % planeWaveGradients.length];

            return (
              <linearGradient
                key={`plane-wave-gradient-${index}`}
                id={`plane-wave-gradient-${index}`}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                {gradient.map((stop) => (
                  <stop
                    key={`plane-wave-gradient-${index}-${stop.offset}`}
                    offset={stop.offset}
                    stopColor={stop.color}
                  />
                ))}
              </linearGradient>
            );
          })}
        </defs>

        {waveModels.map((wave, index) => (
          <g key={`${wave.baseY}-${index}`}>
            <path
              d={wave.defaultPath}
              fill="none"
              stroke="rgba(11,18,66,0.44)"
              strokeWidth={wave.width + 1.5}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              opacity={0.32}
            />

            <path
              ref={(node) => {
                glowRefs.current[index] = node;
              }}
              d={wave.defaultPath}
              fill="none"
              stroke={`url(#plane-wave-gradient-${index})`}
              strokeWidth={wave.width * 4.2}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              opacity={shouldReduceMotion ? wave.opacity * 0.09 : wave.opacity * 0.15}
              style={{ filter: "url(#wave-soft-glow)" }}
            />

            <path
              ref={(node) => {
                strokeRefs.current[index] = node;
              }}
              d={wave.defaultPath}
              fill="none"
              stroke={`url(#plane-wave-gradient-${index})`}
              strokeWidth={wave.width}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              opacity={wave.opacity * 0.7}
            />
          </g>
        ))}
      </svg>
    </>
  );
}
