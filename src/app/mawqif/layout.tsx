import type { Metadata } from "next";
import "../globals.css";
import "./mawqif.css";

export const metadata: Metadata = {
  title: "مواقف | اشتراك مجاني في مواقف السيارات",
  description: "احصل على اشتراك مجاني في مواقف السيارات لمدة سنة كاملة. قدّم طلبك إلكترونيًا بخطوات سهلة وسريعة.",
  keywords: "مواقف، اشتراك مجاني، مواقف السيارات، برنامج المواقف",
};

export default function MawqifLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mawqif-root">
      {children}
    </div>
  );
}
