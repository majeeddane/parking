import type { Metadata } from "next";
import "../globals.css";
import "./mawqif.css";
import { MawqifProvider } from "@/components/mawqif/MawqifContext";

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
    <MawqifProvider>
      <div className="mawqif-root">
        {children}
      </div>
    </MawqifProvider>
  );
}
