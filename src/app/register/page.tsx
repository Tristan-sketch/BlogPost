import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { register } from "../actions/auth";
import AuthForm from "../auth_form";

export default function RegisterPage() {
  if (getCurrentUser()) redirect("/blog");
  return <AuthForm mode="register" action={register} />;
}
