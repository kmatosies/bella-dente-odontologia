import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "../services/firebase";

type AuthCtx = { user: User | null; booting: boolean };

const Ctx = createContext<AuthCtx>({ user: null, booting: true });

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [booting, setBooting] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setBooting(false);
    });
    return () => unsub();
  }, []);

  return <Ctx.Provider value={{ user, booting }}>{children}</Ctx.Provider>;
}

export function useAuth() {
  return useContext(Ctx);
}
// Fim src/providers/AuthProvider.tsx