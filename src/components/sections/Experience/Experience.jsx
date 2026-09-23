"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import styles from "./Experience.module.css";
import { experienceData } from "@/data/experienceData";

const AUTO_SLIDE_DURATION = 5000; // ۵ ثانیه

export default function Experience() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState("next"); // "next" | "prev"
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // متغیرهای سوایپ موبایل
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const touchStartX = useRef(0);
  const touchCurrentX = useRef(0);

  // مراجع تایمر برای توقف دقیق در هاور
  const startTimeRef = useRef(Date.now());
  const elapsedBeforePauseRef = useRef(0);
  const requestRef = useRef(null);

  const total = experienceData.length;

  const handleNext = useCallback(() => {
    setDirection("next");
    setProgress(0);
    elapsedBeforePauseRef.current = 0;
    startTimeRef.current = Date.now();
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    setDirection("prev");
    setProgress(0);
    elapsedBeforePauseRef.current = 0;
    startTimeRef.current = Date.now();
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const handleDotClick = (index) => {
    if (index === currentIndex) return;
    setDirection(index > currentIndex ? "next" : "prev");
    setProgress(0);
    elapsedBeforePauseRef.current = 0;
    startTimeRef.current = Date.now();
    setCurrentIndex(index);
  };

  // تایمر ۵ ثانیه‌ای دقیق
  useEffect(() => {
    if (total <= 1) return;

    if (isHovered || isDragging) {
      elapsedBeforePauseRef.current += Date.now() - startTimeRef.current;
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      return;
    }

    startTimeRef.current = Date.now();

    const updateTimer = () => {
      const now = Date.now();
      const currentRunTime = now - startTimeRef.current;
      const totalElapsed = elapsedBeforePauseRef.current + currentRunTime;
      const currentProgress = (totalElapsed / AUTO_SLIDE_DURATION) * 100;

      if (totalElapsed >= AUTO_SLIDE_DURATION) {
        handleNext();
      } else {
        setProgress(Math.min(currentProgress, 100));
        requestRef.current = requestAnimationFrame(updateTimer);
      }
    };

    requestRef.current = requestAnimationFrame(updateTimer);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isHovered, isDragging, total, currentIndex, handleNext]);

  // رویدادهای لمسی سوایپ
  const handleTouchStart = (e) => {
    setIsDragging(true);
    touchStartX.current = e.touches[0].clientX;
    touchCurrentX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    touchCurrentX.current = e.touches[0].clientX;
    const diff = touchCurrentX.current - touchStartX.current;
    setDragOffset(Math.max(Math.min(diff, 100), -100));
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    const diff = touchStartX.current - touchCurrentX.current;

    if (diff > 45) {
      handleNext();
    } else if (diff < -45) {
      handlePrev();
    }

    setDragOffset(0);
    touchStartX.current = 0;
    touchCurrentX.current = 0;
  };

  const item = experienceData[currentIndex];
  const isEven = currentIndex % 2 === 0;

  return (
    <section id="experience" className={styles.experienceSection} dir="rtl">
      {/* سربرگ */}
      <div className={styles.sectionHeader}>
        <h2 className={styles.title}>Experiences</h2>
        <div className={styles.divider}></div>
      </div>

      {/* اسلایدر */}
      <div
        className={styles.sliderContainer}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* دکمه قبلی (راست) */}
        <button
          type="button"
          onClick={handlePrev}
          className={`${styles.navBtn} ${styles.prevBtn}`}
          aria-label="قبلی"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>

        {/* فریم نمایش کارت متحرک */}
        <div className={styles.sliderViewport}>
          <div
            key={currentIndex}
            className={`${styles.slideStage} ${
              direction === "next" ? styles.flipNext : styles.flipPrev
            } ${isDragging ? styles.noTransition : ""}`}
            style={
              isDragging
                ? { transform: `translateX(${dragOffset}px)` }
                : undefined
            }
          >
            <div
              className={`${styles.experienceCard} ${
                isEven ? styles.cardCyan : styles.cardMagenta
              }`}
            >
              {/* فریم تصویر */}
              <div className={styles.imageGallery}>
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.role}
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 100vw, 450px"
                    className={styles.projectImage}
                  />
                ) : (
                  <div className={styles.imagePlaceholder}>
                    <span>بدون تصویر</span>
                  </div>
                )}
              </div>

              {/* متن و مشخصات کارت */}
              <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                  <span className={styles.periodText}>{item.period}</span>
                  <span
                    className={`${styles.badge} ${
                      isEven ? styles.badgeCyan : styles.badgeMagenta
                    }`}
                  >
                    {item.badge}
                  </span>
                </div>

                <h3 className={styles.roleTitle}>{item.role}</h3>
                <h4 className={styles.companyName}>{item.company}</h4>

                <p className={styles.description}>{item.description}</p>

                <div className={styles.chipsContainer}>
                  {item.techStack.map((tech, idx) => (
                    <span key={idx} className={styles.skillChip}>
                      {tech}#
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* دکمه بعدی (چپ) */}
        <button
          type="button"
          onClick={handleNext}
          className={`${styles.navBtn} ${styles.nextBtn}`}
          aria-label="بعدی"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
      </div>

      {/* نقطه‌های ناوبری زیر اسلایدر */}
      <div className={styles.dotsContainer}>
        {experienceData.map((_, dotIdx) => {
          const isCurrent = currentIndex === dotIdx;
          return (
            <button
              key={dotIdx}
              type="button"
              className={`${styles.dot} ${isCurrent ? styles.activeDot : ""}`}
              onClick={() => handleDotClick(dotIdx)}
              aria-label={`اسلاید ${dotIdx + 1}`}
            >
              {isCurrent && (
                <span
                  className={styles.dotFill}
                  style={{ width: `${progress}%` }}
                />
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}