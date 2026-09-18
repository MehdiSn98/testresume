"use client";

import { useEffect, useRef } from "react";

export function useMainController(isLoading = false, storageKey = "mainScrollPos", delay = 100) {
  const mainRef = useRef(null);

  useEffect(() => {
    if (isLoading) return;

    if (typeof window !== "undefined" && "scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    const container = mainRef.current;
    if (!container) return;

    let scrollTimer;
    let observer;

    // بازیابی اسکرول
    const savedPos = sessionStorage.getItem(storageKey);
    const targetY = savedPos ? parseInt(savedPos, 10) : 0;

    if (targetY > 0) {
      scrollTimer = setTimeout(() => {
        container.scrollTo({ top: targetY, behavior: "instant" });
      }, delay);
    }

    // تنظیمات بهینه ناظر اسکرول سازگار با صفحات موبایل
    observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      },
      {
        root: container,
        threshold: 0, // به محض اینکه اولین پیکسل وارد صفحه شد ریویل شود
        rootMargin: "0px 0px -10px 0px", // بدون نیاز به اسکرول عمیق در موبایل
      }
    );

    const sections = container.querySelectorAll("section");

    sections.forEach((section, index) => {
      if (index === 0) {
        section.classList.add("visible");
      } else {
        observer.observe(section);
      }
    });

    const handleScroll = () => {
      sessionStorage.setItem(storageKey, container.scrollTop.toString());
    };
    container.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      if (scrollTimer) clearTimeout(scrollTimer);
      container.removeEventListener("scroll", handleScroll);
      if (observer) observer.disconnect();
    };
  }, [isLoading, storageKey, delay]);

  return mainRef;
}