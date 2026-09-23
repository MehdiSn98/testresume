"use client";

import { useEffect, useState } from "react";
import styles from "./ScrollToTop.module.css";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // کانتینر اسکرول پروژه
    const mainContainer = document.getElementById("mainScroll");

    const checkScroll = () => {
      // بررسی اسکرول چه از روی کانتینر main و چه از روی window
      const scrollPos =
        mainContainer?.scrollTop ||
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;

      if (scrollPos > 250) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // اضافه کردن لیسنر به کانتینر داخلی و پنجره
    mainContainer?.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("scroll", checkScroll, { passive: true });

    checkScroll();

    return () => {
      mainContainer?.removeEventListener("scroll", checkScroll);
      window.removeEventListener("scroll", checkScroll);
    };
  }, []);

  const scrollToTop = () => {
    const mainContainer = document.getElementById("mainScroll");

    // اسکرول نرم کانتینر داخلی به بالا
    if (mainContainer && mainContainer.scrollTop > 0) {
      mainContainer.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    // اسکرول پنجره در صورت وجود
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="بازگشت به بالای صفحه"
      className={styles.scrollTopBtn}
    >
      <svg
        viewBox="0 0 24 24"
        width="22"
        height="22"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={styles.arrowIcon}
      >
        <polyline points="18 15 12 9 6 15"></polyline>
      </svg>
    </button>
  );
}