"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Navbar.module.css";
import Image from "next/image";

const NAV_ITEMS = [
  { href: "#about", id: "about", label: "درباره من" },
  { href: "#skills", id: "skills", label: "مهارت‌ها" },
  { href: "#education", id: "education", label: "تحصیلات و مدارک" },
  { href: "#projects", id: "projects", label: "پروژه‌ها" },
  { href: "#experience", id: "experience", label: "سوابق کاری" },
];

export default function Navbar() {
  const [theme, setTheme] = useState("light");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#about");

  // قفل کردن تشخیص اسکرول حین اسکرول ناشی از کلیک
  const isClickScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef(null);

  // دریافت تم ذخیره‌شده
  useEffect(() => {
    const savedTheme = localStorage.getItem("app-theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  // ۱. کنترل استایل شناور ناوبار هنگام اسکرول
  useEffect(() => {
    const handleScroll = (e) => {
      const target = e?.target && e.target !== document ? e.target : document.documentElement;
      const scrollPos = target.scrollTop ?? window.scrollY ?? 0;
      setIsScrolled(scrollPos > 15);
    };

    window.addEventListener("scroll", handleScroll, true);
    return () => window.removeEventListener("scroll", handleScroll, true);
  }, []);

  // ۲. تشخیص خودکار بخش فعال فقط هنگام اسکرول دستی کاربر
  useEffect(() => {
    const sectionElements = NAV_ITEMS.map((item) =>
      document.getElementById(item.id)
    ).filter(Boolean);

    if (sectionElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // اگر ناشی از کلیک روی لینک است، سکشن‌های میانی هایلایت نشوند
        if (isClickScrollingRef.current) return;

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      {
        rootMargin: "-25% 0px -65% 0px",
        threshold: 0,
      }
    );

    sectionElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("app-theme", nextTheme);
  };

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setActiveSection(href); // بلافاصله مقصد انتخاب شود
    setIsMenuOpen(false);

    // فعال کردن قفل به مدت ۸۰۰ میلی‌ثانیه برای پرش از سکشن‌های میانی
    isClickScrollingRef.current = true;
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

    const targetId = href.replace("#", "");
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }

    scrollTimeoutRef.current = setTimeout(() => {
      isClickScrollingRef.current = false;
    }, 800);
  };

  return (
    <header className={`${styles.navbarContainer} ${isScrolled ? styles.scrolled : styles.atTop}`}>
      <nav className={styles.capsule}>
        
        {/* راست: همبرگر + لوگو */}
        <div className={styles.brandGroup}>
          <button 
            type="button"
            className={`${styles.hamburger} ${isMenuOpen ? styles.open : ""}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="منو"
          >
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
          </button>

          <div className={styles.brand}>
            <Image className={styles.logoCircle} src="/images/logo.png" alt="Logo" width={120} height={40} priority />
          </div>
        </div>

        {/* دسکتاپ: لینک‌ها */}
        <ul className={styles.navLinks}>
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a 
                href={item.href} 
                onClick={(e) => handleLinkClick(e, item.href)}
                className={`${styles.navItem} ${activeSection === item.href ? styles.active : ""}`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* چپ: تم و ارتباط */}
        <div className={styles.actions}>
          <button 
            type="button" 
            onClick={toggleTheme} 
            className={styles.themeToggle} 
            aria-label="تغییر تم"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
          
          <a 
            href="#contact" 
            onClick={(e) => handleLinkClick(e, "#contact")}
            className={styles.contactBtn} 
            aria-label="ارتباط"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="18" 
              height="18" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className={styles.contactIcon}
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
          </a>
        </div>
      </nav>

      {/* موبایل: کشو */}
      <div className={`${styles.mobileDrawer} ${isMenuOpen ? styles.drawerOpen : ""}`}>
        <ul className={styles.mobileNavLinks}>
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a 
                href={item.href} 
                onClick={(e) => handleLinkClick(e, item.href)} 
                className={`${styles.mobileNavItem} ${activeSection === item.href ? styles.active : ""}`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}