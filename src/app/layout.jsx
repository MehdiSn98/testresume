import "./globals.css";

// تنظیمات متا برای موتورهای جستجو و اشتراک‌گذاری
export const metadata = {
  title: "رزومه و نمونه‌کارها | مهندس نرم‌افزار",
  description: "رزومه مهندسی نرم‌افزار",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <head>
        {/* این اسکریپت قبل از اولین رندر مرورگر اجرا می‌شود تا هیچ پرش رنگی رخ ندهد */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('app-theme') || 'light';
                  document.documentElement.setAttribute('data-theme', saved);
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body>
        {/* ساختار محتوای صفحات */}
        {children}
      </body>
    </html>
  );
}