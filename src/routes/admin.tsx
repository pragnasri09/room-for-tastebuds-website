import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { isLoggedIn, login } from "@/lib/admin-auth";
import { Lock } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [{ title: "Admin Login — Room For Tastebuds" }],
  }),
  component: AdminLoginPage,
});

function AdminLoginPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (isLoggedIn()) navigate({ to: "/admin-panel", replace: true });
  }, [navigate]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (login(user.trim(), pass)) {
      navigate({ to: "/admin-panel", replace: true });
    } else {
      setError("Invalid username or password.");
    }
  };

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md items-center px-5 py-16">
      <div className="w-full rounded-2xl border border-border/60 bg-card p-8 shadow-card">
        <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-accent text-primary">
          <Lock size={20} />
        </div>
        <h1 className="text-center font-display text-3xl text-primary">Admin Login</h1>
        <p className="mt-1 text-center text-sm text-muted-foreground">Owner access to manage menu & prices.</p>

        <form onSubmit={onSubmit} className="mt-7 space-y-4">
          <div>
            <label className="mb-1.5 block text-xs uppercase tracking-widest text-muted-foreground">Username</label>
            <input
              value={user}
              onChange={(e) => setUser(e.target.value)}
              required
              autoComplete="username"
              className="w-full rounded-md border border-input bg-background px-4 py-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs uppercase tracking-widest text-muted-foreground">Password</label>
            <input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full rounded-md border border-input bg-background px-4 py-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/30"
            />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            Sign in
          </button>
        </form>

        <p className="mt-5 text-center text-xs text-muted-foreground">
          Demo credentials: <span className="font-mono">admin</span> / <span className="font-mono">tastebuds2024</span>
        </p>
        <p className="mt-4 text-center">
          <Link to="/" className="text-xs text-muted-foreground underline-offset-4 hover:underline">
            Back to home
          </Link>
        </p>
      </div>
    </div>
  );
}
