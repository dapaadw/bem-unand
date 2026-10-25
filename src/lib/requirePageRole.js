import { redirect } from "next/navigation";
import { getSession } from "./session";
export async function requirePageRole(roles) {
  const session = await getSession();
  if (!session.userId) redirect("/admin/login");
  if (!roles.includes(session.role)) {
    redirect(session.role === "ADMIN" ? "/admin/" : "/admin");
  }
  return session;
}
