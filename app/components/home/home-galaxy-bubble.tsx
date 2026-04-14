"use client";

import type { MotionValue } from "framer-motion";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";

type HomeGalaxyBubbleProps = {
  className?: string;
  scrollProgress?: MotionValue<number>;
};

const DEEP_STAR_COUNT = 120;
const OUTER_STAR_COUNT = 220;
const INNER_DUST_COUNT = 72;
const COMET_TRAIL_POINTS = 22;
const STAR_PALETTE = ["#8f9eab", "#738592", "#64727e", "#536370", "#d8b58a"];
const DEEP_STAR_PALETTE = ["#88939d", "#6a7781", "#53606a"];

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

    positions[stride] = radius * Math.sin(phi) * Math.cos(theta) * stretch[0];
    positions[stride + 1] = (radius * Math.cos(phi) * 0.82 + drift) * stretch[1];
    positions[stride + 2] = radius * Math.sin(phi) * Math.sin(theta) * stretch[2];

    const color = new THREE.Color(
      palette[Math.min(palette.length - 1, Math.floor(Math.random() * palette.length))],
    );

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

function clampPointToBubble(point: THREE.Vector3, radius = 1.72) {
  const nextPoint = point.clone();
  const distance = nextPoint.length();

  if (distance > radius) {
    nextPoint.multiplyScalar(radius / distance);
  }

  return nextPoint;
}

function createCometCurve() {
  const fromLeft = Math.random() < 0.5;
  const start = clampPointToBubble(
    new THREE.Vector3(
      fromLeft
        ? THREE.MathUtils.randFloat(-1.88, -1.18)
        : THREE.MathUtils.randFloat(1.18, 1.88),
      THREE.MathUtils.randFloat(0.38, 1.28),
      THREE.MathUtils.randFloat(-0.18, 0.9),
    ),
  );
  const end = clampPointToBubble(
    new THREE.Vector3(
      fromLeft
        ? THREE.MathUtils.randFloat(0.28, 1.78)
        : THREE.MathUtils.randFloat(-1.78, -0.28),
      THREE.MathUtils.randFloat(-1.14, 0.26),
      THREE.MathUtils.clamp(start.z + THREE.MathUtils.randFloatSpread(0.74), -0.32, 0.96),
    ),
  );
  const controlPoint = clampPointToBubble(
    start.clone().lerp(end, 0.5).add(
      new THREE.Vector3(
        THREE.MathUtils.randFloatSpread(0.42),
        THREE.MathUtils.randFloat(0.14, 0.54),
        THREE.MathUtils.randFloatSpread(0.58),
      ),
    ),
    1.44,
  );

  return new THREE.CatmullRomCurve3(
    [start, controlPoint, end],
    false,
    "centripetal",
  );
}

function createCometTrailColors(count: number) {
  const colors = new Float32Array(count * 3);
  const headColor = new THREE.Color("#ffe0b8");
  const warmCore = new THREE.Color("#ff8904");
  const tailColor = new THREE.Color("#72c9ff");
  const gradientColor = new THREE.Color();

  for (let index = 0; index < count; index += 1) {
    const stride = index * 3;
    const mix = index / Math.max(1, count - 1);
    const sectionMix = mix < 0.38 ? mix / 0.38 : (mix - 0.38) / 0.62;

    if (mix < 0.38) {
      gradientColor.lerpColors(headColor, warmCore, sectionMix);
    } else {
      gradientColor.lerpColors(warmCore, tailColor, sectionMix);
    }

    const brightness = THREE.MathUtils.lerp(1.14, 0.34, mix);
    colors[stride] = gradientColor.r * brightness;
    colors[stride + 1] = gradientColor.g * brightness;
    colors[stride + 2] = gradientColor.b * brightness;
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

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearAlpha(0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.35));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.set(0, 0, 8.9);

    const bubbleGroup = new THREE.Group();
    const galaxyGroup = new THREE.Group();
    scene.add(galaxyGroup);
    scene.add(bubbleGroup);

    scene.add(new THREE.AmbientLight("#8d98a3", 0.52));

    const orangeLight = new THREE.PointLight("#ff8904", 4.4, 20, 1.22);
    orangeLight.position.set(-3.7, 1.4, 5.2);
    scene.add(orangeLight);

    const steelLight = new THREE.PointLight("#83919d", 5.2, 18, 1.25);
    steelLight.position.set(3.4, -1.6, 4.8);
    scene.add(steelLight);

    const coolAccentLight = new THREE.PointLight("#678295", 2.1, 10, 1.34);
    coolAccentLight.position.set(2.3, 2.7, 3.5);
    scene.add(coolAccentLight);

    const blobGeometry = new THREE.IcosahedronGeometry(1.82, 4);
    const positionAttribute = blobGeometry.attributes.position as THREE.BufferAttribute;
    const basePositions = Float32Array.from(positionAttribute.array as ArrayLike<number>);

    const blobMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#6f7e8b"),
      emissive: new THREE.Color("#243847"),
      emissiveIntensity: 0.12,
      roughness: 0.24,
      metalness: 0.08,
      transmission: 0.22,
      thickness: 1.22,
      transparent: true,
      opacity: 0.54,
      ior: 1.08,
      reflectivity: 0.34,
      sheen: 1,
      sheenColor: new THREE.Color("#95a7b5"),
      sheenRoughness: 0.34,
      side: THREE.DoubleSide,
    });
    const blobMesh = new THREE.Mesh(blobGeometry, blobMaterial);
    bubbleGroup.add(blobMesh);

    const haloMesh = new THREE.Mesh(
      new THREE.IcosahedronGeometry(2.12, 3),
      new THREE.MeshBasicMaterial({
        color: new THREE.Color("#6b8798"),
        transparent: true,
        opacity: 0.04,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide,
      }),
    );
    bubbleGroup.add(haloMesh);

    const coreMesh = new THREE.Mesh(
      new THREE.SphereGeometry(1.02, 42, 42),
      new THREE.MeshBasicMaterial({
        color: new THREE.Color("#90aab8"),
        transparent: true,
        opacity: 0.055,
        blending: THREE.AdditiveBlending,
      }),
    );
    bubbleGroup.add(coreMesh);

    const cometGroup = new THREE.Group();
    cometGroup.visible = false;
    bubbleGroup.add(cometGroup);

    const cometTrailGeometry = new THREE.BufferGeometry();
    const cometTrailPositionAttribute = new THREE.BufferAttribute(
      new Float32Array(COMET_TRAIL_POINTS * 3),
      3,
    );
    cometTrailGeometry.setAttribute("position", cometTrailPositionAttribute);
    cometTrailGeometry.setAttribute("color", createCometTrailColors(COMET_TRAIL_POINTS));

    const cometTrailMaterial = new THREE.LineBasicMaterial({
      transparent: true,
      opacity: 0,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const cometTrail = new THREE.Line(cometTrailGeometry, cometTrailMaterial);
    cometGroup.add(cometTrail);

    const cometDustMaterial = new THREE.PointsMaterial({
      size: 0.08,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const cometDust = new THREE.Points(cometTrailGeometry, cometDustMaterial);
    cometGroup.add(cometDust);

    const cometHead = new THREE.Mesh(
      new THREE.SphereGeometry(0.052, 20, 20),
      new THREE.MeshBasicMaterial({
        color: new THREE.Color("#ffd5ad"),
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
    cometGroup.add(cometHead);

    const cometAura = new THREE.Mesh(
      new THREE.SphereGeometry(0.148, 18, 18),
      new THREE.MeshBasicMaterial({
        color: new THREE.Color("#68c3ff"),
        transparent: true,
        opacity: 0,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
    cometGroup.add(cometAura);

    const deepStars = new THREE.Points(
      createStarfield(DEEP_STAR_COUNT, [8.2, 14.8], DEEP_STAR_PALETTE, [1.65, 0.72, 1.34]),
      new THREE.PointsMaterial({
        size: 0.03,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.14,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
    deepStars.position.z = -3.2;
    galaxyGroup.add(deepStars);

    const outerStars = new THREE.Points(
      createStarfield(OUTER_STAR_COUNT, [4.8, 10.8], STAR_PALETTE, [1.42, 0.82, 1.18]),
      new THREE.PointsMaterial({
        size: 0.038,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.16,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
    outerStars.position.z = -1.35;
    galaxyGroup.add(outerStars);

    const innerDust = new THREE.Points(
      createStarfield(INNER_DUST_COUNT, [2.6, 5.4], STAR_PALETTE, [1.08, 0.84, 0.98]),
      new THREE.PointsMaterial({
        size: 0.055,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.08,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
    innerDust.position.z = 1.1;
    galaxyGroup.add(innerDust);

    const orbitA = new THREE.LineLoop(
      createOrbitGeometry(3.12),
      new THREE.LineBasicMaterial({
        color: new THREE.Color("#7d8d99"),
        transparent: true,
        opacity: 0.055,
        blending: THREE.AdditiveBlending,
      }),
    );
    orbitA.rotation.x = Math.PI * 0.34;
    orbitA.rotation.y = -0.46;
    orbitA.position.z = 0.8;
    galaxyGroup.add(orbitA);

    const orbitB = new THREE.LineLoop(
      createOrbitGeometry(3.72),
      new THREE.LineBasicMaterial({
        color: new THREE.Color("#ffc68a"),
        transparent: true,
        opacity: 0.022,
        blending: THREE.AdditiveBlending,
      }),
    );
    orbitB.rotation.x = Math.PI * 0.63;
    orbitB.rotation.z = 0.84;
    orbitB.position.z = -0.6;
    galaxyGroup.add(orbitB);

    const pointerTarget = new THREE.Vector2(0, 0);
    const pointerCurrent = new THREE.Vector2(0, 0);
    const cometPoint = new THREE.Vector3();
    const cometHeadPosition = new THREE.Vector3();
    let scrollTarget = 0;
    let scrollCurrent = 0;
    const cometState = {
      active: false,
      curve: null as THREE.CatmullRomCurve3 | null,
      duration: 0,
      startTime: 0,
      trailSpan: 0.22,
      nextSpawnAt: shouldReduceMotion ? Number.POSITIVE_INFINITY : THREE.MathUtils.randFloat(1.8, 4.1),
      pulseOffset: Math.random() * Math.PI * 2,
    };

    const updateSize = () => {
      const nextWidth = host.clientWidth;
      const nextHeight = host.clientHeight;

      if (nextWidth === 0 || nextHeight === 0) {
        return;
      }

      renderer.setSize(nextWidth, nextHeight, false);
      camera.aspect = nextWidth / nextHeight;
      camera.updateProjectionMatrix();
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

    updateSize();

    const timer = new THREE.Timer();
    timer.connect(document);
    timer.setTimescale(0.6);

    const animate = (timestamp?: number) => {
      timer.update(timestamp);
      const elapsed = timer.getElapsed();
      scrollTarget = THREE.MathUtils.clamp(scrollProgress?.get() ?? 0, 0, 1);
      scrollCurrent = THREE.MathUtils.lerp(scrollCurrent, scrollTarget, shouldReduceMotion ? 0.12 : 0.065);
      pointerCurrent.lerp(pointerTarget, shouldReduceMotion ? 0.1 : 0.06);
      const fluidIntensity = shouldReduceMotion ? 0.018 : 0.05 + scrollCurrent * 0.055;
      const rippleIntensity = shouldReduceMotion ? 0.006 : 0.012 + scrollCurrent * 0.016;
      const pulse = 1 + Math.sin(elapsed * 0.64) * 0.01 + scrollCurrent * 0.014;
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

        const waveA = Math.sin(nx * 4.6 + elapsed * 0.42 + scrollCurrent * 2.1);
        const waveB = Math.cos(ny * 5.2 - elapsed * 0.34 - scrollCurrent * 1.8);
        const waveC = Math.sin((nx + nz) * 3 + elapsed * 0.26 + scrollCurrent * 2.8);
        const lift = Math.cos((ny - nz) * 3.8 + elapsed * 0.44) * rippleIntensity;
        const radiusScale = 1 + waveA * fluidIntensity + waveB * 0.028 + waveC * 0.024 + lift;
        const swirl = Math.sin(elapsed * 0.54 + length * 2.1) * rippleIntensity;

        positionAttribute.setXYZ(
          index / 3,
          x * radiusScale * pulse + ny * swirl,
          y * radiusScale * (1 + scrollCurrent * 0.05) - nz * swirl * 0.7,
          z * radiusScale * pulse + nx * swirl,
        );
      }

      positionAttribute.needsUpdate = true;
      blobGeometry.computeVertexNormals();

      bubbleGroup.rotation.y = THREE.MathUtils.lerp(
        bubbleGroup.rotation.y,
        elapsed * 0.05 + scrollCurrent * 0.46 + pointerCurrent.x * 0.08,
        0.045,
      );
      bubbleGroup.rotation.x = THREE.MathUtils.lerp(
        bubbleGroup.rotation.x,
        -0.05 + scrollCurrent * 0.12 - pointerCurrent.y * 0.05,
        0.04,
      );
      bubbleGroup.position.y = Math.sin(elapsed * 0.28) * 0.08 - scrollCurrent * 0.18;
      bubbleGroup.position.x = THREE.MathUtils.lerp(
        bubbleGroup.position.x,
        pointerCurrent.x * 0.08,
        0.05,
      );
      bubbleGroup.position.z = THREE.MathUtils.lerp(
        bubbleGroup.position.z,
        0.25 + scrollCurrent * 0.52,
        0.05,
      );
      bubbleGroup.scale.setScalar(0.94 + scrollCurrent * 0.04);

      haloMesh.rotation.y = -elapsed * 0.06 - scrollCurrent * 0.26;
      haloMesh.rotation.x = elapsed * 0.035;
      haloMesh.scale.setScalar(
        1.01 +
          Math.sin(elapsed * 0.52) * 0.012 +
          scrollCurrent * 0.024,
      );

      coreMesh.scale.setScalar(
        1 + Math.sin(elapsed * 0.82) * 0.018 + scrollCurrent * 0.028,
      );
      coreMesh.position.y = Math.sin(elapsed * 0.56) * 0.04;

      camera.position.x = THREE.MathUtils.lerp(
        camera.position.x,
        pointerCurrent.x * 0.12,
        0.04,
      );
      camera.position.y = THREE.MathUtils.lerp(
        camera.position.y,
        -scrollCurrent * 0.12 - pointerCurrent.y * 0.08,
        0.04,
      );
      camera.position.z = THREE.MathUtils.lerp(
        camera.position.z,
        8.9 - scrollCurrent * 0.9,
        0.04,
      );
      camera.lookAt(pointerCurrent.x * 0.08, -pointerCurrent.y * 0.06, 0.12 + scrollCurrent * 0.38);

      galaxyGroup.rotation.y = THREE.MathUtils.lerp(
        galaxyGroup.rotation.y,
        scrollCurrent * 0.18 + pointerCurrent.x * 0.05,
        0.03,
      );
      galaxyGroup.rotation.x = THREE.MathUtils.lerp(
        galaxyGroup.rotation.x,
        -scrollCurrent * 0.05 - pointerCurrent.y * 0.03,
        0.03,
      );
      galaxyGroup.position.y = THREE.MathUtils.lerp(galaxyGroup.position.y, -scrollCurrent * 0.34, 0.04);
      galaxyGroup.position.z = THREE.MathUtils.lerp(galaxyGroup.position.z, -scrollCurrent * 1.18, 0.04);
      galaxyGroup.scale.setScalar(1 + particleScatter * 0.28);

      deepStars.rotation.y = elapsed * 0.005 + scrollCurrent * 0.038;
      deepStars.rotation.x = -elapsed * 0.003;
      outerStars.rotation.y = elapsed * 0.011 + scrollCurrent * 0.08;
      outerStars.rotation.x = -elapsed * 0.006 - scrollCurrent * 0.03;
      innerDust.rotation.z = elapsed * 0.03 + scrollCurrent * 0.22;
      innerDust.rotation.x = -elapsed * 0.02;

      outerStars.position.y = THREE.MathUtils.lerp(outerStars.position.y, -particleScatter * 0.44, 0.04);
      outerStars.position.z = THREE.MathUtils.lerp(outerStars.position.z, -1.35 - particleScatter * 2.9, 0.04);
      innerDust.position.y = THREE.MathUtils.lerp(innerDust.position.y, particleScatter * 0.34, 0.04);
      innerDust.position.z = THREE.MathUtils.lerp(innerDust.position.z, 1.1 + particleScatter * 2.3, 0.04);
      deepStars.material.opacity = 0.14 - clearProgress * 0.04;
      outerStars.material.opacity = 0.16 - clearProgress * 0.14;
      innerDust.material.opacity = 0.08 - clearProgress * 0.075;

      orbitA.rotation.z = elapsed * 0.04 + scrollCurrent * 0.28;
      orbitB.rotation.y = -elapsed * 0.03 - scrollCurrent * 0.2;

      if (!shouldReduceMotion) {
        if (!cometState.active && elapsed >= cometState.nextSpawnAt) {
          cometState.active = true;
          cometState.curve = createCometCurve();
          cometState.startTime = elapsed;
          cometState.duration = THREE.MathUtils.randFloat(1.2, 2.1);
          cometState.trailSpan = THREE.MathUtils.randFloat(0.16, 0.28);
          cometState.pulseOffset = Math.random() * Math.PI * 2;
          cometGroup.visible = true;
        }

        if (cometState.active && cometState.curve) {
          const lifeProgress = THREE.MathUtils.clamp(
            (elapsed - cometState.startTime) / cometState.duration,
            0,
            1,
          );

          if (lifeProgress >= 1) {
            cometState.active = false;
            cometState.curve = null;
            cometState.nextSpawnAt = elapsed + THREE.MathUtils.randFloat(4.8, 10.2);
            cometGroup.visible = false;
            cometTrailMaterial.opacity = 0;
            cometDustMaterial.opacity = 0;
            (cometHead.material as THREE.MeshBasicMaterial).opacity = 0;
            (cometAura.material as THREE.MeshBasicMaterial).opacity = 0;
          } else {
            const travelProgress = 1 - Math.pow(1 - lifeProgress, 2.15);
            const glowEnvelope =
              THREE.MathUtils.smoothstep(lifeProgress, 0, 0.12) *
              (1 - THREE.MathUtils.smoothstep(lifeProgress, 0.72, 1));
            const pulse = 0.92 + Math.sin(elapsed * 18 + cometState.pulseOffset) * 0.08;

            for (let index = 0; index < COMET_TRAIL_POINTS; index += 1) {
              const sampleProgress = Math.max(
                0,
                travelProgress - (index / (COMET_TRAIL_POINTS - 1)) * cometState.trailSpan,
              );

              cometState.curve.getPoint(sampleProgress, cometPoint);
              cometTrailPositionAttribute.setXYZ(
                index,
                cometPoint.x,
                cometPoint.y,
                cometPoint.z,
              );

              if (index === 0) {
                cometHeadPosition.set(cometPoint.x, cometPoint.y, cometPoint.z);
              }
            }

            cometTrailPositionAttribute.needsUpdate = true;
            cometHead.position.copy(cometHeadPosition);
            cometAura.position.copy(cometHeadPosition);

            cometTrailMaterial.opacity = glowEnvelope * 0.62;
            cometDustMaterial.opacity = glowEnvelope * 0.96;
            (cometHead.material as THREE.MeshBasicMaterial).opacity = glowEnvelope * 0.94;
            (cometAura.material as THREE.MeshBasicMaterial).opacity = glowEnvelope * 0.26;

            const headScale = 1 + glowEnvelope * 0.54 + (pulse - 0.92) * 0.9;
            cometHead.scale.setScalar(headScale);
            cometAura.scale.setScalar(1.08 + glowEnvelope * 0.92);
          }
        }
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

      blobGeometry.dispose();
      blobMaterial.dispose();
      haloMesh.geometry.dispose();
      (haloMesh.material as THREE.Material).dispose();
      coreMesh.geometry.dispose();
      (coreMesh.material as THREE.Material).dispose();
      cometTrailGeometry.dispose();
      cometTrailMaterial.dispose();
      cometDustMaterial.dispose();
      cometHead.geometry.dispose();
      (cometHead.material as THREE.Material).dispose();
      cometAura.geometry.dispose();
      (cometAura.material as THREE.Material).dispose();
      deepStars.geometry.dispose();
      (deepStars.material as THREE.Material).dispose();
      outerStars.geometry.dispose();
      (outerStars.material as THREE.Material).dispose();
      innerDust.geometry.dispose();
      (innerDust.material as THREE.Material).dispose();
      orbitA.geometry.dispose();
      (orbitA.material as THREE.Material).dispose();
      orbitB.geometry.dispose();
      (orbitB.material as THREE.Material).dispose();
      timer.dispose();
      renderer.dispose();
    };
  }, [scrollProgress, shouldReduceMotion]);

  return (
    <div
      className={`absolute inset-0 z-10 touch-pan-y ${className}`.trim()}
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="h-full w-full opacity-90 [filter:drop-shadow(0_0_28px_rgba(90,132,158,0.12))]"
      />
    </div>
  );
}
