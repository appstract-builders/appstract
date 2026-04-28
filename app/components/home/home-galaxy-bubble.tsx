"use client";

import type { MotionValue } from "framer-motion";
import { useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import * as THREE from "three";

type HomeGalaxyBubbleProps = {
  className?: string;
  scrollProgress?: MotionValue<number>;
};

type OrbitStarEntry = {
  pivot: THREE.Group;
  star: THREE.Sprite;
  glow: THREE.Sprite;
  baseRotation: THREE.Euler;
  orbitSpeed: number;
  orbitDrift: number;
  twinkleOffset: number;
  glowScale: number;
  starOpacity: number;
  glowOpacity: number;
};

const ORBIT_STAR_COUNT = 34;
const ORBIT_STAR_PALETTE = ["#d2c8be", "#d8e7ef", "#cfd6df", "#d8d5de", "#cadbd5"];

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

function getRandomColor(palette: string[]) {
  return new THREE.Color(
    palette[Math.min(palette.length - 1, Math.floor(Math.random() * palette.length))],
  );
}

function createStarTexture(size: number, innerRadius: number, outerRadius: number) {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;

  const context = canvas.getContext("2d");
  if (!context) {
    return new THREE.CanvasTexture(canvas);
  }

  const center = size / 2;
  const glow = context.createRadialGradient(center, center, 0, center, center, outerRadius);
  glow.addColorStop(0, "rgba(232, 240, 246, 0.95)");
  glow.addColorStop(0.42, "rgba(196, 210, 220, 0.28)");
  glow.addColorStop(1, "rgba(196, 210, 220, 0)");
  context.fillStyle = glow;
  context.fillRect(0, 0, size, size);

  context.beginPath();
  for (let point = 0; point < 8; point += 1) {
    const angle = -Math.PI / 2 + (point / 8) * Math.PI * 2;
    const radius = point % 2 === 0 ? outerRadius * 0.52 : innerRadius;
    const x = center + Math.cos(angle) * radius;
    const y = center + Math.sin(angle) * radius;
    if (point === 0) {
      context.moveTo(x, y);
    } else {
      context.lineTo(x, y);
    }
  }
  context.closePath();
  context.fillStyle = "rgba(238, 244, 248, 0.92)";
  context.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
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
    const orbitStarGroup = new THREE.Group();
    scene.add(bubbleGroup);
    scene.add(orbitStarGroup);

    scene.add(new THREE.AmbientLight("#8e9aa3", 0.58));

    const orangeLight = new THREE.PointLight("#d6b994", 1.65, 20, 1.18);
    orangeLight.position.set(-3.7, 1.4, 5.2);
    scene.add(orangeLight);

    const steelLight = new THREE.PointLight("#bdcbd4", 4.9, 18, 1.2);
    steelLight.position.set(3.4, -1.6, 4.8);
    scene.add(steelLight);

    const coolAccentLight = new THREE.PointLight("#e1e8ee", 1.7, 10, 1.25);
    coolAccentLight.position.set(2.3, 2.7, 3.5);
    scene.add(coolAccentLight);

    const blobRadius = THREE.MathUtils.lerp(1.58, 1.82, initialViewportProgress);
    const haloScale = THREE.MathUtils.lerp(1.018, 1.015, initialViewportProgress);
    const blobGeometry = new THREE.SphereGeometry(
      blobRadius,
      useCompactRendering ? 72 : 112,
      useCompactRendering ? 36 : 56,
    );
    const positionAttribute = blobGeometry.attributes.position as THREE.BufferAttribute;
    const basePositions = Float32Array.from(positionAttribute.array as ArrayLike<number>);

    const blobMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uAlpha: { value: 0.54 },
        uBaseColor: { value: new THREE.Color("#5f6f79") },
        uCyanColor: { value: new THREE.Color("#9bcbd7") },
        uLavenderColor: { value: new THREE.Color("#a7adc8") },
        uRimColor: { value: new THREE.Color("#d5e1e6") },
        uTime: { value: 0 },
        uWarmColor: { value: new THREE.Color("#d0b89e") },
      },
      vertexShader: `
        varying vec3 vWorldNormal;
        varying vec3 vWorldPosition;

        void main() {
          vec4 worldPosition = modelMatrix * vec4(position, 1.0);
          vWorldNormal = normalize(mat3(modelMatrix) * normal);
          vWorldPosition = worldPosition.xyz;
          gl_Position = projectionMatrix * viewMatrix * worldPosition;
        }
      `,
      fragmentShader: `
        uniform float uAlpha;
        uniform vec3 uBaseColor;
        uniform vec3 uCyanColor;
        uniform vec3 uLavenderColor;
        uniform vec3 uRimColor;
        uniform float uTime;
        uniform vec3 uWarmColor;
        varying vec3 vWorldNormal;
        varying vec3 vWorldPosition;

        void main() {
          vec3 normal = normalize(vWorldNormal);
          vec3 viewDirection = normalize(cameraPosition - vWorldPosition);
          float facing = abs(dot(normal, viewDirection));
          float edgeFade = smoothstep(0.025, 0.5, facing);
          float rim = pow(1.0 - facing, 2.45) * smoothstep(0.05, 0.24, facing);
          float edgeGlow = pow(1.0 - facing, 3.2) * smoothstep(0.035, 0.2, facing);
          vec3 coolLight = normalize(vec3(0.48, -0.28, 0.84));
          vec3 warmLight = normalize(vec3(-0.52, 0.22, 0.82));
          vec3 highLight = normalize(vec3(0.16, 0.42, 0.9));
          float cool = max(dot(normal, coolLight), 0.0);
          float warm = max(dot(normal, warmLight), 0.0);
          float gloss = pow(max(dot(reflect(-highLight, normal), viewDirection), 0.0), 36.0);
          float softGloss = pow(max(dot(reflect(-warmLight, normal), viewDirection), 0.0), 18.0);
          float shimmer = max(sin(uTime * 0.34 + normal.x * 2.1 + normal.y * 1.35), 0.0) * 0.018;
          vec3 color = uBaseColor * (0.5 + cool * 0.34 + warm * 0.22);
          color += uRimColor * (rim * 0.16 + edgeGlow * 0.14 + gloss * 0.5 + shimmer);
          color += uCyanColor * cool * 0.05;
          color += uLavenderColor * max(normal.y * 0.5 + 0.5, 0.0) * 0.02;
          color += uWarmColor * (warm * 0.055 + softGloss * 0.16);
          float alpha = uAlpha * (0.08 + edgeFade * 0.92) + edgeGlow * 0.026;
          gl_FragColor = vec4(color, alpha);
        }
      `,
      depthWrite: false,
      side: THREE.FrontSide,
      transparent: true,
    });

    const atmosphereMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uAlpha: { value: 0.16 },
        uBaseColor: { value: new THREE.Color("#53616b") },
        uGlowColor: { value: new THREE.Color("#b8cad1") },
        uTime: { value: 0 },
      },
      vertexShader: `
        varying vec3 vWorldNormal;
        varying vec3 vWorldPosition;

        void main() {
          vec4 worldPosition = modelMatrix * vec4(position, 1.0);
          vWorldNormal = normalize(mat3(modelMatrix) * normal);
          vWorldPosition = worldPosition.xyz;
          gl_Position = projectionMatrix * viewMatrix * worldPosition;
        }
      `,
      fragmentShader: `
        uniform float uAlpha;
        uniform vec3 uBaseColor;
        uniform vec3 uGlowColor;
        uniform float uTime;
        varying vec3 vWorldNormal;
        varying vec3 vWorldPosition;

        void main() {
          vec3 normal = normalize(vWorldNormal);
          vec3 viewDirection = normalize(cameraPosition - vWorldPosition);
          float facing = abs(dot(normal, viewDirection));
          float softBody = smoothstep(0.0, 0.64, facing);
          float rim = pow(1.0 - facing, 2.6) * smoothstep(0.12, 0.42, facing);
          vec3 color = uBaseColor * (0.46 + softBody * 0.38);
          color += uGlowColor * rim * 0.07;
          float alpha = uAlpha * (0.16 + softBody * 0.84);
          gl_FragColor = vec4(color, alpha);
        }
      `,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.FrontSide,
      transparent: true,
    });
    const atmosphereMesh = new THREE.Mesh(blobGeometry, atmosphereMaterial);
    atmosphereMesh.scale.setScalar(1.028);
    atmosphereMesh.renderOrder = 0;
    bubbleGroup.add(atmosphereMesh);

    const blobMesh = new THREE.Mesh(blobGeometry, blobMaterial);
    blobMesh.renderOrder = 1;
    bubbleGroup.add(blobMesh);

    const haloMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#aebdc6"),
      transparent: true,
      opacity: 0.006,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.BackSide,
    });
    const haloMesh = new THREE.Mesh(blobGeometry, haloMaterial);
    haloMesh.scale.setScalar(haloScale);
    bubbleGroup.add(haloMesh);

    const starTexture = createStarTexture(96, 9, 42);
    const glowTexture = createStarTexture(96, 4, 46);
    const orbitStars: OrbitStarEntry[] = [];
    const orbitStarCount = Math.round(THREE.MathUtils.lerp(22, ORBIT_STAR_COUNT, initialViewportProgress));

    for (let index = 0; index < orbitStarCount; index += 1) {
      const color = getRandomColor(ORBIT_STAR_PALETTE);
      const glowColor = color.clone().lerp(new THREE.Color("#dce5ea"), 0.28);
      const pivot = new THREE.Group();
      const radius = THREE.MathUtils.randFloat(
        THREE.MathUtils.lerp(2.08, 2.26, initialViewportProgress),
        THREE.MathUtils.lerp(3.12, 3.58, initialViewportProgress),
      );
      const scale = THREE.MathUtils.randFloat(
        THREE.MathUtils.lerp(0.42, 0.54, initialViewportProgress),
        THREE.MathUtils.lerp(0.68, 0.84, initialViewportProgress),
      );
      const starMaterial = new THREE.SpriteMaterial({
        color,
        map: starTexture,
        transparent: true,
        opacity: THREE.MathUtils.randFloat(0.46, 0.68),
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const star = new THREE.Sprite(starMaterial);
      star.position.set(
        radius,
        THREE.MathUtils.randFloatSpread(0.42),
        THREE.MathUtils.randFloatSpread(0.26),
      );
      star.scale.set(0.11 * scale, 0.11 * scale, 1);

      const glowMaterial = new THREE.SpriteMaterial({
        color: glowColor,
        map: glowTexture,
        transparent: true,
        opacity: THREE.MathUtils.randFloat(0.03, 0.055),
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const glow = new THREE.Sprite(glowMaterial);
      glow.position.copy(star.position);
      glow.scale.set(0.2 * scale, 0.2 * scale, 1);

      pivot.rotation.set(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
      );
      pivot.add(star);
      pivot.add(glow);
      orbitStarGroup.add(pivot);

      orbitStars.push({
        pivot,
        star,
        glow,
        baseRotation: pivot.rotation.clone(),
        orbitSpeed: THREE.MathUtils.randFloat(0.08, 0.16),
        orbitDrift: THREE.MathUtils.randFloat(0.12, 0.22),
        twinkleOffset: Math.random() * Math.PI * 2,
        glowScale: glow.scale.x,
        starOpacity: starMaterial.opacity,
        glowOpacity: glowMaterial.opacity,
      });
    }

    const pointerTarget = new THREE.Vector2(0, 0);
    const pointerCurrent = new THREE.Vector2(0, 0);
    let pointerHoverTarget = 0;
    let pointerHoverCurrent = 0;
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
    let cameraScrollY = THREE.MathUtils.lerp(0.08, 0.12, initialViewportProgress);
    let lookAtZ = THREE.MathUtils.lerp(0.05, 0.14, initialViewportProgress);
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
      cameraScrollY = THREE.MathUtils.lerp(0.08, 0.12, viewportProgress);
      lookAtZ = THREE.MathUtils.lerp(0.05, 0.14, viewportProgress);
      lookAtScroll = THREE.MathUtils.lerp(0.16, 0.22, viewportProgress);
    };

    const updatePointer = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const hoverRadius = Math.min(rect.width, rect.height) * 0.48;
      const offsetX = event.clientX - centerX;
      const offsetY = event.clientY - centerY;
      const distance = Math.hypot(offsetX, offsetY);

      if (distance > hoverRadius) {
        pointerHoverTarget = 0;
        pointerTarget.set(0, 0);
        return;
      }

      const falloff = 1 - THREE.MathUtils.smoothstep(distance / hoverRadius, 0.9, 1);
      pointerHoverTarget = falloff;
      pointerTarget.set(
        THREE.MathUtils.clamp(offsetX / hoverRadius, -1, 1) * falloff,
        THREE.MathUtils.clamp(offsetY / hoverRadius, -1, 1) * falloff,
      );
    };

    const resetPointer = () => {
      pointerHoverTarget = 0;
      pointerTarget.set(0, 0);
    };

    const resizeObserver = new ResizeObserver(updateSize);
    resizeObserver.observe(host);

    window.addEventListener("pointermove", updatePointer, { passive: true });
    window.addEventListener("blur", resetPointer);
    host.addEventListener("pointerleave", resetPointer, { passive: true });
    host.addEventListener("pointercancel", resetPointer, { passive: true });
    window.addEventListener("resize", updateSize);
    window.addEventListener("orientationchange", updateSize);
    window.visualViewport?.addEventListener("resize", updateSize);

    updateSize();

    const timer = new THREE.Timer();
    timer.connect(document);
    timer.setTimescale(0.58);

    const animate = (timestamp?: number) => {
      timer.update(timestamp);
      const elapsed = timer.getElapsed();
      const delta = Math.min(timer.getDelta(), 1 / 30);
      const motionFactor = shouldReduceMotion ? 0.35 : 1;
      blobMaterial.uniforms.uTime.value = elapsed;
      atmosphereMaterial.uniforms.uTime.value = elapsed;
      const scrollBlend = 1 - Math.exp(-(shouldReduceMotion ? 5.2 : 3.8) * delta);
      const pointerBlend = 1 - Math.exp(-(shouldReduceMotion ? 5.8 : 4.2) * delta);
      const cameraBlend = 1 - Math.exp(-3.4 * delta);
      const bubbleBlend = 1 - Math.exp(-3.8 * delta);
      const hoverBlend = 1 - Math.exp(-5.4 * delta);
      scrollTarget = THREE.MathUtils.clamp(scrollProgress?.get() ?? 0, 0, 1);
      scrollCurrent = THREE.MathUtils.lerp(scrollCurrent, scrollTarget, scrollBlend);
      pointerCurrent.lerp(pointerTarget, pointerBlend);
      pointerHoverCurrent = THREE.MathUtils.lerp(pointerHoverCurrent, pointerHoverTarget, hoverBlend);
      const playfulX = pointerCurrent.x * pointerHoverCurrent;
      const playfulY = pointerCurrent.y * pointerHoverCurrent;
      const hoverWobble = pointerHoverCurrent * Math.sin(elapsed * 1.18 * motionFactor);
      const hoverStretch = pointerHoverCurrent * (shouldReduceMotion ? 0.018 : 0.05);

      const fluidIntensity = shouldReduceMotion ? 0.012 : 0.052 + scrollCurrent * 0.03;
      const rippleIntensity = shouldReduceMotion ? 0.003 : 0.008 + scrollCurrent * 0.008;
      const pulse = 1 + Math.sin(elapsed * 0.46) * 0.009 + pointerHoverCurrent * Math.sin(elapsed * 1.45) * 0.006;

      for (let index = 0; index < basePositions.length; index += 3) {
        const x = basePositions[index];
        const y = basePositions[index + 1];
        const z = basePositions[index + 2];
        const length = Math.hypot(x, y, z) || 1;
        const nx = x / length;
        const ny = y / length;
        const nz = z / length;

        const pointerPush = nx * pointerCurrent.x - ny * pointerCurrent.y;
        const hoverFalloff = Math.max(0, pointerPush * 0.5 + 0.5) * pointerHoverCurrent;
        const waveA = Math.sin(nx * 2.65 + elapsed * 0.24 + scrollCurrent * 1.15);
        const waveB = Math.cos(ny * 2.9 - elapsed * 0.19 - scrollCurrent * 1);
        const waveC = Math.sin((nx + nz * 0.8) * 2.05 + elapsed * 0.15 + scrollCurrent * 1.2);
        const waveD = Math.cos((ny - nz + nx * 0.45) * 2.25 + elapsed * 0.13) * 0.014;
        const lift = Math.cos((ny - nz) * 2.15 + elapsed * 0.24) * rippleIntensity;
        const hoverWave =
          Math.sin(pointerPush * 3.2 - elapsed * 1.9 * motionFactor) *
          hoverStretch *
          hoverFalloff;
        const radiusScale =
          1 +
          waveA * (fluidIntensity * 1.08) +
          waveB * 0.014 +
          waveC * 0.011 +
          waveD +
          lift +
          hoverWave;
        const swirl =
          Math.sin(elapsed * 0.22 + length * 1.35 + pointerPush * 0.7) *
          (rippleIntensity * 0.68 + hoverStretch * 0.18);

        positionAttribute.setXYZ(
          index / 3,
          x * radiusScale * pulse + ny * swirl + pointerCurrent.x * hoverFalloff * 0.024,
          y * radiusScale * (1 + scrollCurrent * 0.035) - nz * swirl * 0.7 - pointerCurrent.y * hoverFalloff * 0.024,
          z * radiusScale * pulse + nx * swirl + hoverFalloff * hoverStretch * 0.18,
        );
      }

      positionAttribute.needsUpdate = true;
      blobGeometry.computeVertexNormals();

      bubbleGroup.rotation.y = THREE.MathUtils.lerp(
        bubbleGroup.rotation.y,
        elapsed * 0.038 * motionFactor + scrollCurrent * bubbleScrollTurn * 0.82 + playfulX * 0.68 + hoverWobble * 0.12,
        bubbleBlend,
      );
      bubbleGroup.rotation.x = THREE.MathUtils.lerp(
        bubbleGroup.rotation.x,
        -0.035 + scrollCurrent * 0.058 - playfulY * 0.5 + hoverWobble * 0.08,
        bubbleBlend,
      );
      bubbleGroup.rotation.z = THREE.MathUtils.lerp(
        bubbleGroup.rotation.z,
        Math.sin(elapsed * 0.16 * motionFactor) * 0.024 + scrollCurrent * bubbleScrollRoll * 0.72 - playfulX * playfulY * 0.32 + hoverWobble * 0.07,
        bubbleBlend,
      );
      bubbleGroup.position.y = Math.sin(elapsed * 0.18 * motionFactor) * bubbleFloatAmplitude * 0.68 - scrollCurrent * bubbleScrollLift * 0.86;
      bubbleGroup.position.x = THREE.MathUtils.lerp(
        bubbleGroup.position.x,
        0,
        bubbleBlend,
      );
      bubbleGroup.position.z = THREE.MathUtils.lerp(
        bubbleGroup.position.z,
        bubbleBaseZ + scrollCurrent * bubbleScrollZ * 0.88,
        bubbleBlend,
      );
      bubbleGroup.scale.setScalar(bubbleBaseScale * (1 + pointerHoverCurrent * 0.038));

      haloMesh.rotation.y = -elapsed * 0.038 * motionFactor - scrollCurrent * 0.12;
      haloMesh.rotation.x = elapsed * 0.022 * motionFactor;
      haloMesh.scale.setScalar(haloScale + Math.sin(elapsed * 0.34 * motionFactor) * 0.0015);
      atmosphereMesh.scale.setScalar(1.028 + Math.sin(elapsed * 0.24 * motionFactor) * 0.002);

      camera.position.x = THREE.MathUtils.lerp(
        camera.position.x,
        0,
        cameraBlend,
      );
      camera.position.y = THREE.MathUtils.lerp(
        camera.position.y,
        -scrollCurrent * cameraScrollY * 0.86,
        cameraBlend,
      );
      camera.position.z = THREE.MathUtils.lerp(
        camera.position.z,
        cameraBaseZ - scrollCurrent * cameraScrollZ * 0.9,
        cameraBlend,
      );
      camera.lookAt(
        0,
        0,
        lookAtZ + scrollCurrent * lookAtScroll * 0.86,
      );

      orbitStarGroup.position.copy(bubbleGroup.position);
      orbitStarGroup.scale.setScalar(bubbleBaseScale);
      orbitStarGroup.rotation.y = THREE.MathUtils.lerp(
        orbitStarGroup.rotation.y,
        elapsed * 0.012 * motionFactor + scrollCurrent * 0.12 + playfulX * 0.12,
        cameraBlend,
      );
      orbitStarGroup.rotation.x = THREE.MathUtils.lerp(
        orbitStarGroup.rotation.x,
        -scrollCurrent * 0.028 - playfulY * 0.08,
        cameraBlend,
      );
      orbitStarGroup.rotation.z = THREE.MathUtils.lerp(
        orbitStarGroup.rotation.z,
        Math.sin(elapsed * 0.11 * motionFactor) * 0.024,
        cameraBlend,
      );

      for (const orbitStar of orbitStars) {
        const shimmer = shouldReduceMotion
          ? 0.45
          : 0.5 + Math.sin(elapsed * 0.62 + orbitStar.twinkleOffset) * 0.5;
        const rotation = elapsed * orbitStar.orbitSpeed * motionFactor + scrollCurrent * orbitStar.orbitDrift;

        orbitStar.pivot.rotation.x =
          orbitStar.baseRotation.x +
          Math.sin(elapsed * 0.15 * motionFactor + orbitStar.twinkleOffset) * 0.07;
        orbitStar.pivot.rotation.y = orbitStar.baseRotation.y + rotation;
        orbitStar.pivot.rotation.z =
          orbitStar.baseRotation.z +
          scrollCurrent * orbitStar.orbitDrift * 0.45;
        orbitStar.star.material.rotation = rotation + orbitStar.twinkleOffset;
        orbitStar.glow.material.rotation = -orbitStar.star.material.rotation * 0.35;
        orbitStar.star.material.opacity = orbitStar.starOpacity + shimmer * 0.026;
        orbitStar.glow.material.opacity = orbitStar.glowOpacity + shimmer * 0.014;
        orbitStar.glow.scale.set(
          orbitStar.glowScale * (1 + shimmer * 0.08),
          orbitStar.glowScale * (1 + shimmer * 0.08),
          1,
        );
      }

      renderer.render(scene, camera);
    };

    renderer.setAnimationLoop(animate);

    return () => {
      renderer.setAnimationLoop(null);
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", updatePointer);
      window.removeEventListener("blur", resetPointer);
      host.removeEventListener("pointerleave", resetPointer);
      host.removeEventListener("pointercancel", resetPointer);
      window.removeEventListener("resize", updateSize);
      window.removeEventListener("orientationchange", updateSize);
      window.visualViewport?.removeEventListener("resize", updateSize);

      blobGeometry.dispose();
      blobMaterial.dispose();
      atmosphereMaterial.dispose();
      haloMaterial.dispose();
      starTexture.dispose();
      glowTexture.dispose();

      for (const orbitStar of orbitStars) {
        orbitStar.star.material.dispose();
        orbitStar.glow.material.dispose();
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
        className="h-full w-full opacity-90 [filter:drop-shadow(0_0_14px_rgba(90,132,158,0.06))]"
      />
    </div>
  );
}
