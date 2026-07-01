import { headers } from "next/headers";
import AdminClient from "./AdminClient";

export const dynamic = "force-dynamic";

interface Fabric {
  id: string;
  name: string;
  title: string;
  category: string;
  description: string;
  image?: string;
  color?: string;
}

async function getFabrics(): Promise<Fabric[]> {
  const headersList = await headers();
  const host = headersList.get("host");
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http";

  const res = await fetch(`${protocol}://${host}/api/fabrics`, {
    cache: "no-store",
  });

  if (!res.ok) return [];

  const result = await res.json();

  return result.data || [];
}

export default async function AdminPage() {
  const fabrics = await getFabrics();

  return <AdminClient initialFabrics={fabrics} />;
}
