import React from "react";
import styles from "./EducationRoadmap.module.css";
import { educationData } from "@/data/educationData"; 

export default function EducationRoadmap() {
  return (
    <section id="education" className={styles.roadmapSection} dir="rtl">
      
      {/* سربرگ */}
      <div className={styles.sectionHeader}>
        <h2 className={styles.title}>Education</h2>
        <div className={styles.divider}></div>
      </div>

      {/* تایم‌لاین با خط وسط */}
      <div className={styles.timelineContainer}>
        <div className={styles.centerLine} />

        {educationData.map((item, index) => {
          // تناوب یکی‌درمیان بر اساس اندیس آیتم
          const isEven = index % 2 === 0;

          // تخصیص کلاس‌های رنگی بر اساس زوج یا فرد بودن
          const nodeColorClass = isEven ? styles.nodeCyan : styles.nodeMagenta;
          const cardColorClass = isEven ? styles.cardCyan : styles.cardMagenta;
          const badgeColorClass = isEven ? styles.badgeCyan : styles.badgeMagenta;

          return (
            <div 
              key={item.id} 
              className={`${styles.timelineRow} ${isEven ? styles.rowEven : styles.rowOdd}`}
            >
              
              {/* گره اتصال (Node) روی خط وسط */}
              <div className={`${styles.node} ${nodeColorClass}`}>
                <span className={styles.nodeCore} />
              </div>

              {/* کارت محتوا */}
              <div className={`${styles.glassCard} ${cardColorClass}`}>
                
                <div className={styles.cardHeader}>
                  <span className={styles.periodText}>{item.period}</span>
                  {item.badge && (
                    <span className={`${styles.badge} ${badgeColorClass}`}>
                      {item.badge}
                    </span>
                  )}
                </div>

                <h3 className={styles.degreeTitle}>{item.degree}</h3>
                <h4 className={styles.institutionName}>{item.institution}</h4>

                {item.highlights && item.highlights.length > 0 && (
                  <div className={styles.chipsContainer}>
                    {item.highlights.map((chip, idx) => (
                      <span key={idx} className={styles.skillChip}>
                        #{chip}
                      </span>
                    ))}
                  </div>
                )}

              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}