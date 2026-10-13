"use client";

import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import type { AuthState } from "./actions/auth";

type Props = {
  mode: "login" | "register";
  action: (state: AuthState, formData: FormData) => Promise<AuthState>;
};

const inputClass = "border-gray-400 p-2 border rounded-md w-full mb-3";

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className="mt-2 hover:bg-white bg-violet-600 hover:border-violet-600 text-white rounded-md border hover:text-violet-600 p-2 w-full disabled:opacity-50"
    >
      {pending ? "..." : label}
    </button>
  );
}

export default function AuthForm({ mode, action }: Props) {
  const [state, formAction] = useFormState(action, {});
  const isRegister = mode === "register";

  return (
    <main className="flex items-center p-4 flex-col">
      <div className="border border-gray-400 p-6 m-4 text-gray-700 rounded-md shadow-md w-full max-w-sm">
        <h1 className="text-violet-600 text-3xl font-bold mb-4">
          {isRegister ? "Sign up" : "Sign in"}
        </h1>

        <form action={formAction}>
          <label className="font-bold" htmlFor="username">Username</label>
          <input id="username" name="username" required autoComplete="username" className={inputClass} />

          {isRegister && (
            <>
              <label className="font-bold" htmlFor="firstName">First Name (optional)</label>
              <input id="firstName" name="firstName" autoComplete="given-name" className={inputClass} />

              <label className="font-bold" htmlFor="lastName">Last Name (optional)</label>
              <input id="lastName" name="lastName" autoComplete="family-name" className={inputClass} />
            </>
          )}

          <label className="font-bold" htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            minLength={isRegister ? 8 : undefined}
            autoComplete={isRegister ? "new-password" : "current-password"}
            className={inputClass}
          />

          {state.error && <p className="text-red-500 mb-2">{state.error}</p>}

          <SubmitButton label={isRegister ? "Create Account" : "Sign in"} />
        </form>

        <p className="mt-4 text-center">
          {isRegister ? (
            <>Already have an account? <Link href="/login" className="text-violet-600 underline">Sign in</Link></>
          ) : (
            <>No account yet? <Link href="/register" className="text-violet-600 underline">Sign up</Link></>
          )}
        </p>
      </div>
    </main>
  );
}
