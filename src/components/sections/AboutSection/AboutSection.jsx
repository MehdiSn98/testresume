'use client';

import React from 'react';
import use3DTilt from '@/hooks/use3DTilt';
import styles from './AboutSection.module.css';

const AboutSection = () => {
  const { tiltProps } = use3DTilt({ maxRotation: 4 });

  const handleScrollDown = () => {
    // برای پرش نرم به سکشن بعدی وقتی کاربر روش کلیک می‌کنه
    window.scrollBy({ top: window.innerHeight * 0.85, behavior: 'smooth' });
  };

  return (
    <section id="about" className={styles.sectionWrapper} dir="rtl">
      <div className={styles.container}>
        
        {/* ستون کارت IDE (سمت راست) */}
        <div className={styles.ideWrapper}>
          <div className={styles.ideCard} {...tiltProps}>
            
            {/* هدر پنجره کد */}
            <div className={styles.cardHeader} dir="ltr">
              <div className={styles.windowControls}>
                <span className={`${styles.controlDot} ${styles.redDot}`} />
                <span className={`${styles.controlDot} ${styles.yellowDot}`} />
                <span className={`${styles.controlDot} ${styles.greenDot}`} />
              </div>
              <span className={styles.fileName}>developer.config.js</span>
            </div>

            {/* محتوای کد */}
            <div className={styles.codeContent} dir="ltr">
              <pre>
                <code>
                  <span className={styles.keyword}>const</span> <span className={styles.variable}>Developer</span> = &#123;{'\n'}
                  {'  '}name: <span className={styles.string}>'Name'</span>,{'\n'}
                  {'  '}role: <span className={styles.string}>'Software Developer'</span>,{'\n'}
                  {'  '}coreSkills: [<span className={styles.string}>'Oracle APEX'</span>, <span className={styles.string}>'Next.js'</span>, <span className={styles.string}>'Python'</span>],{'\n'}
                  {'  '}passions: [<span className={styles.string}>'UI Design'</span>, <span className={styles.string}>'Graphic Design'</span>],{'\n'}
                  {'  '}status: <span className={styles.string}>'Ready to Build'</span>{'\n'}
                  &#125;;
                </code>
              </pre>
            </div>

            {/* فوتر پروفایل با آیکون آواتار */}
            <div className={styles.profileContainer} dir="ltr">
              <div className={styles.profileMeta}>
                <h3 className={styles.profileName}>Name</h3>
                <span className={styles.profileRole}>Software Developer</span>
              </div>
              
              <div className={styles.avatarRing}>
                <div 
                  className={styles.avatarImage} 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    background: 'var(--bg-surface, #ffffff)' 
                  }}
                >
                  <svg 
                    width="44" 
                    height="44" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="1.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    style={{ color: 'var(--text-secondary, #64748b)' }}
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ستون متن معرفی (سمت چپ) */}
        <div className={styles.textContent}>
          <h2 className={styles.title}>
            <span className={styles.highlight}>Full Name</span>
          </h2>
          
          <p className={styles.description}>
            علاقه‌مند به ساخت تجربه‌های دیجیتال سریع و خلاقانه‌؛ سعی می‌کنم بین منطق مهندسی و زیبایی طراحی تعادل ایجاد کنم و ایده‌ها رو به محصولاتی کاربردی و جذاب تبدیل کنم.
            برای من، کدنویسی فقط نوشتن کد و طراحی فقط زیباتر کردن یک صفحه نیست؛ هر دو بخشی از فرآیند حل مسئله‌اند. از ساخت یک رابط کاربری دقیق و واکنش‌گرا گرفته تا طراحی یک سیستم قابل توسعه و بهینه، به جزئیات اهمیت می‌دم و همیشه دنبال راهی هستم که نتیجه هم خوب کار کنه و هم خوب به نظر برسه.
          </p>
        </div>

      </div>

      {/* نشانگر Scroll Down با گرادیانت و افکت شناور */}
      <div 
        className={styles.scrollDownWrapper} 
        tabIndex={0}
      >
        <span className={styles.scrollText}>Scroll Down</span>
        <svg 
          className={styles.scrollArrow} 
          width="26" 
          height="26" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="scrollCyanMagenta" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00e5ff" />
              <stop offset="100%" stopColor="#d946ef" />
            </linearGradient>
          </defs>
          <path 
            d="M6 9L12 15L18 9" 
            stroke="url(#scrollCyanMagenta)" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </div>

    </section>
  );
};

export default AboutSection;
