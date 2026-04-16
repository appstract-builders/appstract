"use client";

import type { MotionValue } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import * as THREE from "three";

type HomeGalaxyBubbleProps = {
  className?: string;
  scrollProgress?: MotionValue<number>;
};

type StarBitEntry = {
  pivot: THREE.Group;
  mesh: THREE.Mesh<THREE.OctahedronGeometry, THREE.MeshPhongMaterial>;
  glow: THREE.Mesh<THREE.SphereGeometry, THREE.MeshBasicMaterial>;
  baseRotation: THREE.Vector3;
  selfSpin: THREE.Vector3;
  orbitSpeed: number;
  orbitDrift: number;
  twinkleOffset: number;
  floatOffset: number;
  baseOpacity: number;
  baseGlowOpacity: number;
  glowScale: number;
};

const DEEP_STAR_COUNT = 120;
const OUTER_STAR_COUNT = 220;
const INNER_DUST_COUNT = 72;
const HALO_GLINT_COUNT = 52;
const STAR_BIT_COUNT = 30;

const STAR_PALETTE = ["#9fadb8", "#aab8c3", "#b5c1ca", "#c0ced8", "#d8c8b8"];
const DEEP_STAR_PALETTE = ["#85919b", "#93a1ab", "#a5b3bc"];
const LIGHT_SPARKLE_PALETTE = [
  "#f4f8fb",
  "#eef5fa",
  "#e8f1f8",
  "#fbf4ed",
  "#f2f7fa",
];
const STAR_BIT_PALETTE = [
  "#fff1b8",
  "#ffdcca",
  "#e3f6ff",
  "#eee5ff",
  "#fbe7f4",
  "#e7ffe9",
];

function getRandomColor(palette: string[]) {
  return new THREE.Color(
    palette[Math.min(palette.length - 1, Math.floor(Math.random() * palette.length))],
  );
}

function getViewportProgress(shortSide: number) {
  return THREE.MathUtils.smoothstep(shortSide, 360, 960);
}

function shouldUseCompactRendering(
  shortSide: number,
  compactViewportMatch: boolean,
  coarsePointerMatch: boolean,
) {
  return compactViewportMatch || shortSide < 430 || (coarsePointerMatch && shortSide < 390);
}

function createStarfield(
  count: number,
  radiusRange: [number, number],
  palette: string[],
  stretch: [number, number, number],
) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  for (let index = 0; index < count; index += 1) {
    const stride = index * 3;
    const radius = THREE.MathUtils.lerp(
      radiusRange[0],
      radiusRange[1],
      Math.pow(Math.random(), 0.72),
    );
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(THREE.MathUtils.randFloatSpread(2));
    const drift = THREE.MathUtils.randFloatSpread(0.9);
    const color = getRandomColor(palette);

    positions[stride] = radius * Math.sin(phi) * Math.cos(theta) * stretch[0];
    positions[stride + 1] = (radius * Math.cos(phi) * 0.82 + drift) * stretch[1];
    positions[stride + 2] = radius * Math.sin(phi) * Math.sin(theta) * stretch[2];

    colors[stride] = color.r;
    colors[stride + 1] = color.g;
    colors[stride + 2] = color.b;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  return geometry;
}

function createOrbitGeometry(radius: number) {
  const points: THREE.Vector3[] = [];

  for (let step = 0; step <= 240; step += 1) {
    const angle = (step / 240) * Math.PI * 2;
    points.push(
      new THREE.Vector3(
        Math.cos(angle) * radius,
        0,
        Math.sin(angle) * radius,
      ),
    );
  }

  return new THREE.BufferGeometry().setFromPoints(points);
}

function createSolarFacetColors(vertexCount: number) {
  const colors = new Float32Array(vertexCount * 3);
  const crystalPalette = ["#edf7ff", "#dff9ff", "#f7fcff", "#efeaff", "#fff8e8", "#def7f5"];
  const neutralColor = new THREE.Color("#33424d");

  for (let index = 0; index < vertexCount; index += 3) {
    const useAccentFacet = Math.random() > 0.9;
    const facetColor = useAccentFacet
      ? getRandomColor(crystalPalette)
      : neutralColor.clone().lerp(new THREE.Color("#465863"), Math.random() * 0.24);
    const facetBoost = useAccentFacet
      ? THREE.MathUtils.randFloat(0.5, 0.74)
      : THREE.MathUtils.randFloat(0.12, 0.22);

    for (let faceVertex = 0; faceVertex < 3; faceVertex += 1) {
      const stride = (index + faceVertex) * 3;
      colors[stride] = facetColor.r * facetBoost;
      colors[stride + 1] = facetColor.g * facetBoost;
      colors[stride + 2] = facetColor.b * facetBoost;
    }
  }

  return new THREE.BufferAttribute(colors, 3);
}

export default function HomeGalaxyBubble({
  className = "",
  scrollProgress,
}: HomeGalaxyBubbleProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const shouldReduceMotion = useReducedMotion() ?? false;

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;

    if (!canvas || !host) {
      return;
    }

    const coarsePointerQuery = window.matchMedia("(pointer: coarse)");
    const compactViewportQuery = window.matchMedia("(max-width: 640px), (max-height: 760px)");
    const initialShortSide = Math.min(window.innerWidth, window.innerHeight);
    const initialViewportProgress = getViewportProgress(initialShortSide);
    const useCompactRendering = shouldUseCompactRendering(
      initialShortSide,
      compactViewportQuery.matches,
      coarsePointerQuery.matches,
    );

    const deepStarCount = Math.round(
      THREE.MathUtils.lerp(84, DEEP_STAR_COUNT, initialViewportProgress),
    );
    const outerStarCount = Math.round(
      THREE.MathUtils.lerp(156, OUTER_STAR_COUNT, initialViewportProgress),
    );
    const innerDustCount = Math.round(
      THREE.MathUtils.lerp(44, INNER_DUST_COUNT, initialViewportProgress),
    );
    const haloGlintCount = Math.round(
      THREE.MathUtils.lerp(30, HALO_GLINT_COUNT, initialViewportProgress),
    );
    const starBitCount = Math.round(
      THREE.MathUtils.lerp(16, STAR_BIT_COUNT, initialViewportProgress),
    );

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: !useCompactRendering,
      powerPreference: "high-performance",
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearAlpha(0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, useCompactRendering ? 1 : 1.35));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.set(
      0,
      0,
      THREE.MathUtils.lerp(10.9, 8.9, initialViewportProgress),
    );

    const bubbleGroup = new THREE.Group();
    const galaxyGroup = new THREE.Group();
    const sparkleGroup = new THREE.Group();
    scene.add(galaxyGroup);
    scene.add(sparkleGroup);
    scene.add(bubbleGroup);

    scene.add(new THREE.AmbientLight("#909aa4", 0.56));

    const orangeLight = new THREE.PointLight("#ffd6a8", 2.9, 20, 1.18);
    orangeLight.position.set(-3.7, 1.4, 5.2);
    scene.add(orangeLight);

    const steelLight = new THREE.PointLight("#b8cad7", 4.4, 18, 1.24);
    steelLight.position.set(3.4, -1.6, 4.8);
    scene.add(steelLight);

    const coolAccentLight = new THREE.PointLight("#c9e7fb", 1.5, 10, 1.3);
    coolAccentLight.position.set(2.3, 2.7, 3.5);
    scene.add(coolAccentLight);

    const blobRadius = THREE.MathUtils.lerp(1.58, 1.82, initialViewportProgress);
    const haloRadius = THREE.MathUtils.lerp(1.76, 1.98, initialViewportProgress);
    const coreRadius = THREE.MathUtils.lerp(0.9, 1.02, initialViewportProgress);
    const blobGeometry = new THREE.IcosahedronGeometry(blobRadius, useCompactRendering ? 3 : 4);
    const positionAttribute = blobGeometry.attributes.position as THREE.BufferAttribute;
    const basePositions = Float32Array.from(positionAttribute.array as ArrayLike<number>);
    blobGeometry.setAttribute(
      "color",
      createSolarFacetColors(positionAttribute.count),
    );

    const blobMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#80919f"),
      emissive: new THREE.Color("#243943"),
      emissiveIntensity: 0.08,
      roughness: 0.18,
      metalness: 0.08,
      transmission: 0.24,
      thickness: 1.22,
      transparent: true,
      opacity: 0.6,
      ior: 1.08,
      reflectivity: 0.4,
      sheen: 1,
      sheenColor: new THREE.Color("#dcebf3"),
      sheenRoughness: 0.24,
      side: THREE.DoubleSide,
    });
    const blobMesh = new THREE.Mesh(blobGeometry, blobMaterial);
    bubbleGroup.add(blobMesh);

    const facetAccentMaterial = new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: 0.055,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    const facetAccentMesh = new THREE.Mesh(blobGeometry, facetAccentMaterial);
    facetAccentMesh.scale.setScalar(1.0015);
    bubbleGroup.add(facetAccentMesh);

    const haloMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#a9c6d7"),
      transparent: true,
      opacity: 0.026,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
    });
    const haloMesh = new THREE.Mesh(
      new THREE.IcosahedronGeometry(haloRadius, useCompactRendering ? 2 : 3),
      haloMaterial,
    );
    bubbleGroup.add(haloMesh);

    const coreMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#c5d9e6"),
      transparent: true,
      opacity: 0.036,
      blending: THREE.AdditiveBlending,
    });
    const coreMesh = new THREE.Mesh(
      new THREE.SphereGeometry(
        coreRadius,
        useCompactRendering ? 32 : 42,
        useCompactRendering ? 32 : 42,
      ),
      coreMaterial,
    );
    bubbleGroup.add(coreMesh);

    const deepStarsMaterial = new THREE.PointsMaterial({
      size: 0.03,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.14,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const deepStars = new THREE.Points(
      createStarfield(deepStarCount, [8.2, 14.8], DEEP_STAR_PALETTE, [1.65, 0.72, 1.34]),
      deepStarsMaterial,
    );
    deepStars.position.z = -3.2;
    galaxyGroup.add(deepStars);

    const outerStarsMaterial = new THREE.PointsMaterial({
      size: 0.038,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.16,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const outerStars = new THREE.Points(
      createStarfield(outerStarCount, [4.8, 10.8], STAR_PALETTE, [1.42, 0.82, 1.18]),
      outerStarsMaterial,
    );
    outerStars.position.z = -1.35;
    galaxyGroup.add(outerStars);

    const innerDustMaterial = new THREE.PointsMaterial({
      size: 0.055,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.08,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const innerDust = new THREE.Points(
      createStarfield(innerDustCount, [2.6, 5.4], STAR_PALETTE, [1.08, 0.84, 0.98]),
      innerDustMaterial,
    );
    innerDust.position.z = 1.1;
    galaxyGroup.add(innerDust);

    const haloGlintsMaterial = new THREE.PointsMaterial({
      size: useCompactRendering ? 0.045 : 0.06,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.11,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const haloGlints = new THREE.Points(
      createStarfield(haloGlintCount, [2.15, 3.75], LIGHT_SPARKLE_PALETTE, [1.08, 0.92, 1.04]),
      haloGlintsMaterial,
    );
    haloGlints.position.z = 0.48;
    sparkleGroup.add(haloGlints);

    const orbitAMaterial = new THREE.LineBasicMaterial({
      color: new THREE.Color("#c1d0d9"),
      transparent: true,
      opacity: 0.05,
      blending: THREE.AdditiveBlending,
    });
    const orbitA = new THREE.LineLoop(createOrbitGeometry(3.12), orbitAMaterial);
    orbitA.rotation.x = Math.PI * 0.34;
    orbitA.rotation.y = -0.46;
    orbitA.position.z = 0.8;
    galaxyGroup.add(orbitA);

    const orbitBMaterial = new THREE.LineBasicMaterial({
      color: new THREE.Color("#f4deca"),
      transparent: true,
      opacity: 0.024,
      blending: THREE.AdditiveBlending,
    });
    const orbitB = new THREE.LineLoop(createOrbitGeometry(3.72), orbitBMaterial);
    orbitB.rotation.x = Math.PI * 0.63;
    orbitB.rotation.z = 0.84;
    orbitB.position.z = -0.6;
    galaxyGroup.add(orbitB);

    const starBitGeometry = new THREE.OctahedronGeometry(
      THREE.MathUtils.lerp(0.08, 0.102, initialViewportProgress),
      0,
    );
    const glowGeometry = new THREE.SphereGeometry(0.078, 10, 10);
    const starBits: StarBitEntry[] = [];

    for (let index = 0; index < starBitCount; index += 1) {
      const baseColor = getRandomColor(STAR_BIT_PALETTE);
      const glowColor = baseColor.clone().lerp(new THREE.Color("#ffffff"), 0.35);
      const pivot = new THREE.Group();
      const radius = THREE.MathUtils.randFloat(
        THREE.MathUtils.lerp(2.1, 2.28, initialViewportProgress),
        THREE.MathUtils.lerp(3.15, 3.6, initialViewportProgress),
      );
      const scaleFactor = THREE.MathUtils.randFloat(
        THREE.MathUtils.lerp(0.66, 0.76, initialViewportProgress),
        THREE.MathUtils.lerp(0.94, 1.08, initialViewportProgress),
      );
      const material = new THREE.MeshPhongMaterial({
        color: baseColor,
        emissive: baseColor.clone().multiplyScalar(0.1),
        emissiveIntensity: 0.52,
        specular: new THREE.Color("#fffdf7"),
        shininess: 78,
        transparent: true,
        opacity: THREE.MathUtils.randFloat(0.72, 0.84),
        depthWrite: false,
      });
      const mesh = new THREE.Mesh(starBitGeometry, material);
      mesh.position.set(
        radius,
        THREE.MathUtils.randFloatSpread(0.42),
        THREE.MathUtils.randFloatSpread(0.26),
      );
      mesh.scale.set(0.56 * scaleFactor, 0.76 * scaleFactor, 0.56 * scaleFactor);

      const glowMaterial = new THREE.MeshBasicMaterial({
        color: glowColor,
        transparent: true,
        opacity: THREE.MathUtils.randFloat(0.014, 0.03),
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const glow = new THREE.Mesh(glowGeometry, glowMaterial);
      glow.position.copy(mesh.position);
      glow.scale.setScalar(0.9 * scaleFactor);

      pivot.rotation.set(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
      );
      pivot.add(mesh);
      pivot.add(glow);
      sparkleGroup.add(pivot);

      starBits.push({
        pivot,
        mesh,
        glow,
        baseRotation: new THREE.Vector3(
          pivot.rotation.x,
          pivot.rotation.y,
          pivot.rotation.z,
        ),
        selfSpin: new THREE.Vector3(
          THREE.MathUtils.randFloat(0.24, 0.42),
          THREE.MathUtils.randFloat(0.18, 0.34),
          THREE.MathUtils.randFloat(0.12, 0.24),
        ),
        orbitSpeed: THREE.MathUtils.randFloat(0.08, 0.16),
        orbitDrift: THREE.MathUtils.randFloat(0.12, 0.22),
        twinkleOffset: Math.random() * Math.PI * 2,
        floatOffset: Math.random() * Math.PI * 2,
        baseOpacity: material.opacity,
        baseGlowOpacity: glowMaterial.opacity,
        glowScale: glow.scale.x,
      });
    }

    const pointerTarget = new THREE.Vector2(0, 0);
    const pointerCurrent = new THREE.Vector2(0, 0);
    let scrollTarget = 0;
    let scrollCurrent = 0;
    let bubbleBaseScale = THREE.MathUtils.lerp(0.82, 1.01, initialViewportProgress);
    let bubbleFloatAmplitude = THREE.MathUtils.lerp(0.05, 0.08, initialViewportProgress);
    let bubbleScrollLift = THREE.MathUtils.lerp(0.12, 0.18, initialViewportProgress);
    let bubbleBaseZ = THREE.MathUtils.lerp(-0.08, 0.2, initialViewportProgress);
    let bubbleScrollZ = THREE.MathUtils.lerp(0.18, 0.34, initialViewportProgress);
    let bubbleScrollTurn = THREE.MathUtils.lerp(0.34, 0.5, initialViewportProgress);
    let bubbleScrollRoll = THREE.MathUtils.lerp(0.14, 0.22, initialViewportProgress);
    let cameraBaseZ = THREE.MathUtils.lerp(10.9, 8.45, initialViewportProgress);
    let cameraScrollZ = THREE.MathUtils.lerp(0.34, 0.58, initialViewportProgress);
    let pointerBubbleDrift = THREE.MathUtils.lerp(0.05, 0.08, initialViewportProgress);
    let pointerCameraDrift = THREE.MathUtils.lerp(0.08, 0.12, initialViewportProgress);
    let cameraScrollY = THREE.MathUtils.lerp(0.08, 0.12, initialViewportProgress);
    let lookAtZ = THREE.MathUtils.lerp(0.05, 0.14, initialViewportProgress);
    let lookAtYFactor = THREE.MathUtils.lerp(0.04, 0.06, initialViewportProgress);
    let lookAtScroll = THREE.MathUtils.lerp(0.16, 0.22, initialViewportProgress);

    const updateSize = () => {
      const nextWidth = host.clientWidth;
      const nextHeight = host.clientHeight;

      if (nextWidth === 0 || nextHeight === 0) {
        return;
      }

      const shortSide = Math.min(nextWidth, nextHeight);
      const viewportProgress = getViewportProgress(shortSide);
      const compactRendering = shouldUseCompactRendering(
        shortSide,
        compactViewportQuery.matches,
        coarsePointerQuery.matches,
      );

      renderer.setPixelRatio(Math.min(window.devicePixelRatio, compactRendering ? 1 : 1.35));
      renderer.setSize(nextWidth, nextHeight, false);
      camera.fov = THREE.MathUtils.lerp(40, 34, viewportProgress);
      camera.aspect = nextWidth / nextHeight;
      camera.updateProjectionMatrix();

      bubbleBaseScale = THREE.MathUtils.lerp(0.82, 1.01, viewportProgress);
      bubbleFloatAmplitude = THREE.MathUtils.lerp(0.05, 0.08, viewportProgress);
      bubbleScrollLift = THREE.MathUtils.lerp(0.12, 0.18, viewportProgress);
      bubbleBaseZ = THREE.MathUtils.lerp(-0.08, 0.2, viewportProgress);
      bubbleScrollZ = THREE.MathUtils.lerp(0.18, 0.34, viewportProgress);
      bubbleScrollTurn = THREE.MathUtils.lerp(0.34, 0.5, viewportProgress);
      bubbleScrollRoll = THREE.MathUtils.lerp(0.14, 0.22, viewportProgress);
      cameraBaseZ = THREE.MathUtils.lerp(10.9, 8.45, viewportProgress);
      cameraScrollZ = THREE.MathUtils.lerp(0.34, 0.58, viewportProgress);
      pointerBubbleDrift = THREE.MathUtils.lerp(0.05, 0.08, viewportProgress);
      pointerCameraDrift = THREE.MathUtils.lerp(0.08, 0.12, viewportProgress);
      cameraScrollY = THREE.MathUtils.lerp(0.08, 0.12, viewportProgress);
      lookAtZ = THREE.MathUtils.lerp(0.05, 0.14, viewportProgress);
      lookAtYFactor = THREE.MathUtils.lerp(0.04, 0.06, viewportProgress);
      lookAtScroll = THREE.MathUtils.lerp(0.16, 0.22, viewportProgress);

      deepStarsMaterial.size = THREE.MathUtils.lerp(0.025, 0.03, viewportProgress);
      outerStarsMaterial.size = THREE.MathUtils.lerp(0.032, 0.038, viewportProgress);
      innerDustMaterial.size = THREE.MathUtils.lerp(0.044, 0.055, viewportProgress);
      haloGlintsMaterial.size = THREE.MathUtils.lerp(0.045, 0.06, viewportProgress);
    };

    const updatePointer = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      const nextX = THREE.MathUtils.clamp(((event.clientX - rect.left) / rect.width) * 2 - 1, -1, 1);
      const nextY = THREE.MathUtils.clamp(((event.clientY - rect.top) / rect.height) * 2 - 1, -1, 1);
      pointerTarget.set(nextX, nextY);
    };

    const resetPointer = () => {
      pointerTarget.set(0, 0);
    };

    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(host);

    host.addEventListener("pointermove", updatePointer, { passive: true });
    host.addEventListener("pointerleave", resetPointer, { passive: true });
    host.addEventListener("pointercancel", resetPointer, { passive: true });
    window.addEventListener("resize", updateSize);
    window.addEventListener("orientationchange", updateSize);
    window.visualViewport?.addEventListener("resize", updateSize);

    updateSize();

    const timer = new THREE.Timer();
    timer.connect(document);
    timer.setTimescale(0.64);

    const animate = (timestamp?: number) => {
      timer.update(timestamp);
      const elapsed = timer.getElapsed();
      const motionFactor = shouldReduceMotion ? 0.35 : 1;
      scrollTarget = THREE.MathUtils.clamp(scrollProgress?.get() ?? 0, 0, 1);
      scrollCurrent = THREE.MathUtils.lerp(scrollCurrent, scrollTarget, shouldReduceMotion ? 0.12 : 0.065);
      pointerCurrent.lerp(pointerTarget, shouldReduceMotion ? 0.1 : 0.06);

      const fluidIntensity = shouldReduceMotion ? 0.016 : 0.062 + scrollCurrent * 0.04;
      const rippleIntensity = shouldReduceMotion ? 0.004 : 0.01 + scrollCurrent * 0.012;
      const pulse = 1 + Math.sin(elapsed * 0.64) * 0.01;
      const clearProgress = shouldReduceMotion
        ? THREE.MathUtils.clamp((scrollCurrent - 0.14) / 0.58, 0, 1)
        : THREE.MathUtils.smoothstep(scrollCurrent, 0.12, 0.72);
      const particleScatter = clearProgress * clearProgress;

      for (let index = 0; index < basePositions.length; index += 3) {
        const x = basePositions[index];
        const y = basePositions[index + 1];
        const z = basePositions[index + 2];
        const length = Math.hypot(x, y, z) || 1;
        const nx = x / length;
        const ny = y / length;
        const nz = z / length;

        const waveA = Math.sin(nx * 3.8 + elapsed * 0.34 + scrollCurrent * 1.6);
        const waveB = Math.cos(ny * 4.1 - elapsed * 0.26 - scrollCurrent * 1.4);
        const waveC = Math.sin((nx + nz * 0.8) * 2.7 + elapsed * 0.19 + scrollCurrent * 1.8);
        const waveD = Math.cos((ny - nz + nx * 0.45) * 2.9 + elapsed * 0.15) * 0.02;
        const lift = Math.cos((ny - nz) * 2.9 + elapsed * 0.34) * rippleIntensity;
        const radiusScale =
          1 +
          waveA * (fluidIntensity * 1.08) +
          waveB * 0.022 +
          waveC * 0.018 +
          waveD +
          lift;
        const swirl = Math.sin(elapsed * 0.32 + length * 1.6) * rippleIntensity * 0.8;

        positionAttribute.setXYZ(
          index / 3,
          x * radiusScale * pulse + ny * swirl,
          y * radiusScale * (1 + scrollCurrent * 0.035) - nz * swirl * 0.7,
          z * radiusScale * pulse + nx * swirl,
        );
      }

      positionAttribute.needsUpdate = true;
      blobGeometry.computeVertexNormals();

      bubbleGroup.rotation.y = THREE.MathUtils.lerp(
        bubbleGroup.rotation.y,
        elapsed * 0.05 * motionFactor + scrollCurrent * bubbleScrollTurn + pointerCurrent.x * 0.08,
        0.045,
      );
      bubbleGroup.rotation.x = THREE.MathUtils.lerp(
        bubbleGroup.rotation.x,
        -0.05 + scrollCurrent * 0.08 - pointerCurrent.y * 0.05,
        0.04,
      );
      bubbleGroup.rotation.z = THREE.MathUtils.lerp(
        bubbleGroup.rotation.z,
        Math.sin(elapsed * 0.22 * motionFactor) * 0.03 + scrollCurrent * bubbleScrollRoll,
        0.035,
      );
      bubbleGroup.position.y = Math.sin(elapsed * 0.28 * motionFactor) * bubbleFloatAmplitude - scrollCurrent * bubbleScrollLift;
      bubbleGroup.position.x = THREE.MathUtils.lerp(
        bubbleGroup.position.x,
        pointerCurrent.x * pointerBubbleDrift,
        0.05,
      );
      bubbleGroup.position.z = THREE.MathUtils.lerp(
        bubbleGroup.position.z,
        bubbleBaseZ + scrollCurrent * bubbleScrollZ,
        0.05,
      );
      bubbleGroup.scale.setScalar(bubbleBaseScale);
      facetAccentMaterial.opacity =
        0.048 +
        Math.sin(elapsed * 0.28 * motionFactor + scrollCurrent * 1.4) * 0.008;

      haloMesh.rotation.y = -elapsed * 0.06 * motionFactor - scrollCurrent * 0.18;
      haloMesh.rotation.x = elapsed * 0.035 * motionFactor;
      haloMesh.scale.setScalar(1.002 + Math.sin(elapsed * 0.52 * motionFactor) * 0.007);

      coreMesh.scale.setScalar(1 + Math.sin(elapsed * 0.82 * motionFactor) * 0.016);
      coreMesh.position.y = Math.sin(elapsed * 0.56 * motionFactor) * 0.04;

      camera.position.x = THREE.MathUtils.lerp(
        camera.position.x,
        pointerCurrent.x * pointerCameraDrift,
        0.04,
      );
      camera.position.y = THREE.MathUtils.lerp(
        camera.position.y,
        -scrollCurrent * cameraScrollY - pointerCurrent.y * pointerBubbleDrift,
        0.04,
      );
      camera.position.z = THREE.MathUtils.lerp(
        camera.position.z,
        cameraBaseZ - scrollCurrent * cameraScrollZ,
        0.04,
      );
      camera.lookAt(
        pointerCurrent.x * pointerBubbleDrift,
        -pointerCurrent.y * lookAtYFactor,
        lookAtZ + scrollCurrent * lookAtScroll,
      );

      galaxyGroup.rotation.y = THREE.MathUtils.lerp(
        galaxyGroup.rotation.y,
        scrollCurrent * 0.14 + pointerCurrent.x * 0.05,
        0.03,
      );
      galaxyGroup.rotation.x = THREE.MathUtils.lerp(
        galaxyGroup.rotation.x,
        -scrollCurrent * 0.04 - pointerCurrent.y * 0.03,
        0.03,
      );
      galaxyGroup.position.y = THREE.MathUtils.lerp(galaxyGroup.position.y, -scrollCurrent * 0.28, 0.04);
      galaxyGroup.position.z = THREE.MathUtils.lerp(galaxyGroup.position.z, -scrollCurrent * 0.9, 0.04);
      galaxyGroup.scale.setScalar(1 + particleScatter * 0.1);

      deepStars.rotation.y = elapsed * 0.005 * motionFactor + scrollCurrent * 0.028;
      deepStars.rotation.x = -elapsed * 0.003 * motionFactor;
      outerStars.rotation.y = elapsed * 0.01 * motionFactor + scrollCurrent * 0.06;
      outerStars.rotation.x = -elapsed * 0.005 * motionFactor - scrollCurrent * 0.02;
      innerDust.rotation.z = elapsed * 0.024 * motionFactor + scrollCurrent * 0.14;
      innerDust.rotation.x = -elapsed * 0.016 * motionFactor;

      outerStars.position.y = THREE.MathUtils.lerp(outerStars.position.y, -particleScatter * 0.28, 0.04);
      outerStars.position.z = THREE.MathUtils.lerp(outerStars.position.z, -1.35 - particleScatter * 1.8, 0.04);
      innerDust.position.y = THREE.MathUtils.lerp(innerDust.position.y, particleScatter * 0.22, 0.04);
      innerDust.position.z = THREE.MathUtils.lerp(innerDust.position.z, 1.1 + particleScatter * 1.4, 0.04);
      deepStarsMaterial.opacity = 0.14 - clearProgress * 0.03;
      outerStarsMaterial.opacity = 0.16 - clearProgress * 0.1;
      innerDustMaterial.opacity = 0.08 - clearProgress * 0.04;

      orbitA.rotation.z = elapsed * 0.03 * motionFactor + scrollCurrent * 0.14;
      orbitB.rotation.y = -elapsed * 0.026 * motionFactor - scrollCurrent * 0.12;

      sparkleGroup.position.copy(bubbleGroup.position);
      sparkleGroup.scale.setScalar(bubbleBaseScale);
      sparkleGroup.rotation.y = THREE.MathUtils.lerp(
        sparkleGroup.rotation.y,
        elapsed * 0.02 * motionFactor + scrollCurrent * 0.18 + pointerCurrent.x * 0.03,
        0.03,
      );
      sparkleGroup.rotation.x = THREE.MathUtils.lerp(
        sparkleGroup.rotation.x,
        -scrollCurrent * 0.04 - pointerCurrent.y * 0.02,
        0.03,
      );
      sparkleGroup.rotation.z = THREE.MathUtils.lerp(
        sparkleGroup.rotation.z,
        Math.sin(elapsed * 0.18 * motionFactor) * 0.04,
        0.02,
      );

      haloGlints.rotation.y = elapsed * 0.045 * motionFactor + scrollCurrent * 0.14;
      haloGlints.rotation.x = -elapsed * 0.016 * motionFactor;
      haloGlints.rotation.z = elapsed * 0.012 * motionFactor;
      haloGlintsMaterial.opacity = 0.1 + Math.sin(elapsed * 0.4 * motionFactor + 0.4) * 0.012;

      for (const starBit of starBits) {
        const shimmer = shouldReduceMotion
          ? 0.45
          : 0.5 + Math.sin(elapsed * 1.1 + starBit.twinkleOffset) * 0.5;

        starBit.pivot.rotation.x =
          starBit.baseRotation.x +
          Math.sin(elapsed * 0.26 * motionFactor + starBit.floatOffset) * 0.12;
        starBit.pivot.rotation.y =
          starBit.baseRotation.y +
          elapsed * starBit.orbitSpeed * motionFactor +
          scrollCurrent * starBit.orbitDrift;
        starBit.pivot.rotation.z =
          starBit.baseRotation.z +
          scrollCurrent * starBit.orbitDrift * 0.45;

        starBit.mesh.rotation.x =
          elapsed * starBit.selfSpin.x * motionFactor +
          scrollCurrent * 0.14;
        starBit.mesh.rotation.y =
          elapsed * starBit.selfSpin.y * motionFactor +
          scrollCurrent * 0.1;
        starBit.mesh.rotation.z =
          elapsed * starBit.selfSpin.z * motionFactor +
          Math.sin(elapsed * 0.7 * motionFactor + starBit.floatOffset) * 0.08;

        starBit.mesh.material.opacity = starBit.baseOpacity + shimmer * 0.05;
        starBit.glow.material.opacity = starBit.baseGlowOpacity + shimmer * 0.012;
        starBit.glow.scale.setScalar(starBit.glowScale * (1 + shimmer * 0.07));
      }

      renderer.render(scene, camera);
    };

    renderer.setAnimationLoop(animate);

    return () => {
      renderer.setAnimationLoop(null);
      resizeObserver.disconnect();
      host.removeEventListener("pointermove", updatePointer);
      host.removeEventListener("pointerleave", resetPointer);
      host.removeEventListener("pointercancel", resetPointer);
      window.removeEventListener("resize", updateSize);
      window.removeEventListener("orientationchange", updateSize);
      window.visualViewport?.removeEventListener("resize", updateSize);

      blobGeometry.dispose();
      blobMaterial.dispose();
      facetAccentMaterial.dispose();
      haloMesh.geometry.dispose();
      haloMaterial.dispose();
      coreMesh.geometry.dispose();
      coreMaterial.dispose();
      deepStars.geometry.dispose();
      deepStarsMaterial.dispose();
      outerStars.geometry.dispose();
      outerStarsMaterial.dispose();
      innerDust.geometry.dispose();
      innerDustMaterial.dispose();
      haloGlints.geometry.dispose();
      haloGlintsMaterial.dispose();
      orbitA.geometry.dispose();
      orbitAMaterial.dispose();
      orbitB.geometry.dispose();
      orbitBMaterial.dispose();
      starBitGeometry.dispose();
      glowGeometry.dispose();

      for (const starBit of starBits) {
        starBit.mesh.material.dispose();
        starBit.glow.material.dispose();
      }

      timer.dispose();
      renderer.dispose();
    };
  }, [scrollProgress, shouldReduceMotion]);

  return (
    <div className={`absolute inset-0 z-10 touch-pan-y ${className}`.trim()}>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="h-full w-full opacity-90 [filter:drop-shadow(0_0_28px_rgba(90,132,158,0.12))]"
      />
    </div>
  );
}
