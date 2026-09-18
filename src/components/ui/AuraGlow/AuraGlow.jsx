import styles from "./AuraGlow.module.css";

// کامپوننت رندرکننده پس‌زمینه نوری مات 
export default function AuraGlow() {
  return (
    <div className={styles.wrapper} aria-hidden="true">
      <div className={styles.glowCyan} />
      <div className={styles.glowMagenta} />
    </div>
  );
}
