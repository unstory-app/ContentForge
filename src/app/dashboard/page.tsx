import { Metadata } from "next";
import AppLayout from "@/components/layout/AppLayout";
import ContentForge from "@/components/dashboard/ContentForge";

export const metadata: Metadata = {
  title: "Dashboard | ContentForge AI",
  description: "Generate 10+ viral content pieces from one idea. Your power center for content repurposing, built on Puter.js.",
};

export default function DashboardPage() {
  return (
    <AppLayout>
      <ContentForge />
    </AppLayout>
  );
}
