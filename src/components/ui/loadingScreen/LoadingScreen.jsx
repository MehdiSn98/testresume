"use client";

import { useEffect, useRef } from "react";
import styles from "./LoadingScreen.module.css";

export default function LoadingScreen({ onFinish }) {
  const overlayRef = useRef(null);
  const fillRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    const fill = fillRef.current;
    const text = textRef.current;
    if (!overlay || !fill || !text) return;

    let frameId;
    let finishTimer;
    const duration = 4000;
    const startTime = performance.now();

    const frame = (now) => {
      const elapsed = Math.max(0, now - startTime); // جلوگیری قطعی از مقدار منفی
      const progress = Math.min(Math.floor((elapsed / duration) * 100), 100);

      text.textContent = `${progress}%`;
      fill.style.width = `${progress}%`;

      if (elapsed < duration) {
        frameId = requestAnimationFrame(frame);
      } else {
        overlay.classList.add(styles.fadeOut);

        if (onFinish) onFinish();

        finishTimer = setTimeout(() => {
          overlay.style.display = "none";
        }, 800);
      }
    };

    frameId = requestAnimationFrame(frame);

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
      if (finishTimer) clearTimeout(finishTimer);
    };
  }, [onFinish]);

  return (
    <div 
      ref={overlayRef} 
      className={styles.loadingOverlay} 
      dir="ltr"
      style={{ direction: "ltr" }}
    >
      <div className={styles.ambientGlow} />

      <div className={styles.loaderContent} dir="ltr" style={{ direction: "ltr" }}>
        <div className={styles.gyroWrapper}>
          <div className={`${styles.gyroRing} ${styles.ringOne}`} />
          <div className={`${styles.gyroRing} ${styles.ringTwo}`} />
          <div className={styles.coreOrb} />
        </div>

        <div className={styles.progressSection} dir="ltr" style={{ direction: "ltr" }}>
          <div 
            className={styles.textRow} 
            dir="ltr" 
            style={{ direction: "ltr", display: "flex", justifyContent: "space-between" }}
          >
            <span className={styles.statusLabel}>INITIALIZING SYSTEM</span>
            <span ref={textRef} className={styles.percentText}>0%</span>
          </div>

          <div 
            className={styles.track} 
            dir="ltr"
            style={{ direction: "ltr", position: "relative" }}
          >
            <div 
              ref={fillRef} 
              className={styles.fillBar} 
              style={{ position: "absolute", left: 0, top: 0, width: "0%" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}