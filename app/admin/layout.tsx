import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { AdminChrome } from "@/app/admin/admin-chrome";
import { auth } from "@/lib/auth";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerList = await headers();
  const session = await auth.api.getSession({
    headers: headerList,
  });

  if (!session) {
    const pathname = headerList.get("x-pathname") ?? "/admin";
    redirect("/account/login?siguiente=" + encodeURIComponent(pathname));
  }

  return (
    <AdminChrome email={session.user.email} name={session.user.name}>
      {children}
    </AdminChrome>
  );
}
