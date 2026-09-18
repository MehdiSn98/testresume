'use client';
import { useState, useRef, useCallback } from 'react';

/**
 * هوک اختصاصی برای ایجاد افکت چرخش ۳بعدی و اسپات‌لایت با حرکت موس
 * @param {Object} options تنظیمات اختیاری
 * @param {number} options.maxRotation حداکثر زاویه چرخش (پیش‌فرض: 12 درجه)
 */
export const use3DTilt = ({ maxRotation = 12 } = {}) => {
  const ref = useRef(null);
  const [style, setStyle] = useState({});

  const handleMouseMove = useCallback(
    (e) => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // نرمال‌سازی بین ۱- و ۱+
      const normX = (x - centerX) / centerX;
      const normY = (y - centerY) / centerY;

      const rotateX = -normY * maxRotation;
      const rotateY = normX * maxRotation;

      const posX = (x / rect.width) * 100;
      const posY = (y / rect.height) * 100;

      setStyle({
        '--rx': `${rotateX.toFixed(2)}deg`,
        '--ry': `${rotateY.toFixed(2)}deg`,
        '--mouse-x': `${posX.toFixed(1)}%`,
        '--mouse-y': `${posY.toFixed(1)}%`,
        '--norm-x': normX.toFixed(2),
        '--norm-y': normY.toFixed(2),
        '--glow-opacity': '1',
      });
    },
    [maxRotation]
  );

  const handleMouseLeave = useCallback(() => {
    setStyle({
      '--rx': '0deg',
      '--ry': '0deg',
      '--mouse-x': '50%',
      '--mouse-y': '50%',
      '--norm-x': '0',
      '--norm-y': '0',
      '--glow-opacity': '0',
    });
  }, []);

  return {
    ref,
    style,
    // یک پکیج آماده برای اسپرد کردن روی المان {...tiltProps}
    tiltProps: {
      ref,
      style,
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave,
    },
  };
};

export default use3DTilt;
