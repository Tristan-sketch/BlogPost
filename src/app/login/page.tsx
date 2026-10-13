import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { login } from "../actions/auth";
import AuthForm from "../auth_form";

export default function LoginPage() {
  if (getCurrentUser()) redirect("/blog");
  return <AuthForm mode="login" action={login} />;
}
