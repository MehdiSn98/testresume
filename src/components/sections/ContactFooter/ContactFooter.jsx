"use client";

import styles from "./ContactFooter.module.css";
import { footerSocials } from "@/data/footerData";

export default function Footer() {
  return (
    <footer id="contact" className={styles.footer} dir="rtl">
      <div className={styles.footerContent}>
        <span className={styles.subTitle}>ارتباط مستقیم و ثبت سفارش پروژه</span>
        <h2 className={styles.mainTitle}>آماده همکاری در پروژه بعدی شما</h2>

        {/* دایره‌ها به صورت یکی‌درمیان */}
        <div className={styles.socialCircles}>
          {footerSocials.map((item) => {
            const isCyan = item.accent === "cyan";

            return (
              <a
                key={item.id}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.name}
                className={`${styles.circleBtn} ${
                  isCyan ? styles.circleCyan : styles.circleMagenta
                }`}
              >
                <svg
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="currentColor"
                  className={styles.icon}
                >
                  <path d={item.iconPath} />
                </svg>

                {/* تولتیپ */}
                <div className={styles.tooltip}>
                  <span className={styles.tooltipName}>{item.name}</span>
                  <span className={styles.tooltipHandle}>{item.handle}</span>
                </div>
              </a>
            );
          })}
        </div>

        <div className={styles.statusBadge}>
          <span className={styles.statusDot}></span>
          <span>پاسخ‌گویی معمولاً در کمتر از چند ساعت</span>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <p className={styles.copyright}>
          طراحی و توسعه اختصاصی با Next.js
        </p>
      </div>
    </footer>
  );
}