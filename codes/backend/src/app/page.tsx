import { redirect } from "next/navigation";

export default function Home() {
  // Redirecting the base path to the dashboard page
  redirect("/dashboard");
}
