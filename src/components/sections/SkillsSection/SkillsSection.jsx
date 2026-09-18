import styles from './SkillsSection.module.css';
import { skillsData } from "@/data/skillsData"; 

export default function SkillsSection() {
  return (
    <section id='skills' className={styles.skillsSection}>
      
      {/* Header section */}
      <div className={styles.header}>
        <h2 className={styles.title}>SKILLS</h2>
        <div className={styles.divider}></div>
      </div>

      {/* Dynamic grid list */}
      <div className={styles.gridContainer}>
        {skillsData.map((skill) => (
          <div
            key={skill.id}
            className={styles.card}
            /* Injecting dynamic color variable from data */
            style={{ '--skill-color': skill.colorCode || '#22d3ee' }} 
          >
            <div className={styles.topLine} />
            <h3 className={styles.cardTitle}>{skill.title}</h3>
            
            {skill.desc && (
              <p className={styles.cardDesc}>{skill.desc}</p>
            )}
          </div>
        ))}
      </div>
      
    </section>
  );
}
