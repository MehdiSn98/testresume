
'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';

import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiPython,
  SiGithub,
} from 'react-icons/si';

import { DiPhotoshop } from 'react-icons/di';

const ICONS = [
  DiPhotoshop,
  SiHtml5,
  SiCss,
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiPython,
  SiGithub,
];

const CYAN_PALETTE = [
  'rgba(6, 182, 212, 0.9)',
  'rgba(8, 145, 178, 0.85)',
  'rgba(56, 189, 248, 0.9)',
  'rgba(20, 184, 166, 0.85)',
  'rgba(34, 211, 238, 0.8)',
];

export default function FloatingLogos() {
  const logosRef = useRef([]);
  const dataRef = useRef([]);
  const [mounted, setMounted] = useState(false);

  // دسکتاپ: 6×6
  // موبایل: 3×3
  const [grid, setGrid] = useState({
    cols: 6,
    rows: 6,
  });

  useEffect(() => {
    setMounted(true);

    const updateGrid = () => {
      if (window.innerWidth <= 900) {
        setGrid({
          cols: 4,
          rows: 4,
        });
      } else {
        setGrid({
          cols: 5,
          rows: 5,
        });
      }
    };

    updateGrid();

    window.addEventListener('resize', updateGrid);

    return () => {
      window.removeEventListener('resize', updateGrid);
    };
  }, []);

  const GRID_COLS = grid.cols;
  const GRID_ROWS = grid.rows;
  const totalLogos = GRID_COLS * GRID_ROWS;

  const particles = useMemo(() => {
    return Array.from({ length: totalLogos }).map((_, i) => {
      const containerSize = 24 + (i % 3) * 3;
      const iconSize = Math.round(containerSize * 0.4);
      const color = CYAN_PALETTE[i % CYAN_PALETTE.length];
      const IconComponent = ICONS[i % ICONS.length];

      return {
        containerSize,
        iconSize,
        color,
        IconComponent,
      };
    });
  }, [totalLogos]);

  useEffect(() => {
    if (!mounted) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    dataRef.current = Array.from({ length: totalLogos }).map((_, i) => {
      const col = i % GRID_COLS;
      const row = Math.floor(i / GRID_COLS);

      const anchorU = (col + 0.5) / GRID_COLS;
      const anchorV = (row + 0.5) / GRID_ROWS;

      return {
        anchorU,
        anchorV,

        ampU:
          (0.35 / GRID_COLS) *
          (0.6 + Math.random() * 0.4),

        ampV:
          (0.35 / GRID_ROWS) *
          (0.6 + Math.random() * 0.4),

        
        freqU:
          0.0002 +
          Math.random() * 0.0003,

        freqV:
          0.00018 +
          Math.random() * 0.0003,

        phaseU: Math.random() * Math.PI * 2,
        phaseV: Math.random() * Math.PI * 2,

    
        pulseFreq:
          0.003 +
          Math.random() * 0.003,

        pulsePhase:
          Math.random() * Math.PI * 2,
      };
    });

    let animationFrameId;

    const render = (time) => {
      dataRef.current.forEach((d, i) => {
        const offsetU =
          Math.sin(time * d.freqU + d.phaseU) *
          d.ampU;

        const offsetV =
          Math.cos(time * d.freqV + d.phaseV) *
          d.ampV;

        const currentU = d.anchorU + offsetU;
        const currentV = d.anchorV + offsetV;

        const pulse =
          Math.sin(
            time * d.pulseFreq + d.pulsePhase
          ) * 0.18;

        const opacity = Math.max(
          0.35,
          Math.min(0.85, 0.55 + pulse)
        );

        const el = logosRef.current[i];

        if (el) {
          const x = currentU * width;
          const y = currentV * height;

          el.style.transform =
            `translate3d(${x}px, ${y}px, 0)`;

          el.style.opacity =
            opacity.toFixed(2);
        }
      });

      animationFrameId =
        requestAnimationFrame(render);
    };

    animationFrameId =
      requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener(
        'resize',
        handleResize
      );
    };
  }, [
    mounted,
    totalLogos,
    GRID_COLS,
    GRID_ROWS,
  ]);

  if (!mounted) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
      }}
    >
      {particles.map((p, i) => {
        const {
          IconComponent,
          containerSize,
          iconSize,
          color,
        } = p;

        return (
          <div
            key={i}
            ref={(el) => {
              logosRef.current[i] = el;
            }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,

              width: `${containerSize}px`,
              height: `${containerSize}px`,

              borderRadius: '50%',

              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',

              willChange:
                'transform, opacity',

              backgroundColor:
                'rgba(6, 182, 212, 0.04)',

              border:
                '1px solid rgba(6, 182, 212, 0.16)',

              boxShadow:
                '0 0 10px rgba(6, 182, 212, 0.07)',

              backdropFilter:
                'blur(3px)',

              WebkitBackdropFilter:
                'blur(3px)',

              color,
            }}
          >
            <IconComponent size={iconSize} />
          </div>
        );
      })}
    </div>
  );
}

