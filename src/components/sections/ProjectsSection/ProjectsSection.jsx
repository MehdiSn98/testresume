import React, { useState, useMemo } from 'react';
import styles from './ProjectsSection.module.css';
import { projectsData, projectCategories } from '@/data/projectsData';

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState('All');

  // فیلتر کردن پروژه‌ها بر اساس دسته‌بندی انتخابی با useMemo
  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return projectsData;
    return projectsData.filter((project) => project.category === activeCategory);
  }, [activeCategory]);

  return (
    <section className={styles.projectsSection} id="projects">
      <div className={styles.container}>
        
        {/* هدر بخش پروژه‌ها */}
        <div className={styles.sectionHeader}>
          <span className={styles.subTitle}>Featured Creations</span>
          <h2 className={styles.mainTitle}>Recent Projects</h2>
          <div className={styles.titleGlowBar}></div>
        </div>

        {/* نوار فیلتر دسته‌بندی‌ها */}
        <div className={styles.filterContainer}>
          {projectCategories.map((category) => (
            <button
              key={category}
              className={`${styles.filterBtn} ${activeCategory === category ? styles.activeFilter : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* شبکه نمایش کارت‌ها */}
        <div className={styles.projectsGrid}>
          {filteredProjects.map((project) => {
            const isInProgress = project.status.toLowerCase().includes('in progress');

            return (
              <div
                key={project.id}
                className={`${styles.projectCard} ${isInProgress ? styles.cardInProgress : styles.cardLive}`}
              >
                {/* خط درخشان متحرک لبه بالای کارت */}
                <div className={styles.cardTopGlow}></div>

                {/* بج وضعیت بالای کارت */}
                <div className={styles.cardHeader}>
                  <span className={styles.categoryBadge}>{project.category}</span>
                  <div className={`${styles.statusBadge} ${isInProgress ? styles.statusProgress : styles.statusSuccess}`}>
                    <span className={styles.statusPulseDot}></span>
                    <span>{project.status}</span>
                  </div>
                </div>

                {/* محتوای متنی کارت */}
                <div className={styles.cardBody}>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  <p className={styles.projectDescription}>{project.description}</p>

                  {/* تگ‌های تکنولوژی */}
                  <div className={styles.tagWrapper}>
                    {project.tags.map((tag, index) => (
                      <span key={index} className={styles.techTag}>
                        {tag}#
                      </span>
                    ))}
                  </div>
                </div>

                {/* فوتر کارت و دکمه‌های اکشن */}
                <div className={styles.cardFooter}>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.gitBtn}
                    aria-label="View Source on GitHub"
                  >
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                    </svg>
                    <span>Code</span>
                  </a>

                  {isInProgress ? (
                    <span className={styles.inProgressAction} title="Currently under active development">
                      <span>Under Dev</span>
                      <span className={styles.gearIcon}>⚙️</span>
                    </span>
                  ) : (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className={styles.demoBtn}
                    >
                      <span>Live Demo</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="7" y1="17" x2="17" y2="7"></line>
                        <polyline points="7 7 17 7 17 17"></polyline>
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
