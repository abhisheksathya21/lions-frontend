"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAdmin } from "./AuthProvider";

export default function Protected({ children }) {
  const { admin, loading } = useAdmin();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !admin) {
      router.push("/admin/login");
    }
  }, [admin, loading, router]);

  if (loading) return <p>Loading...</p>; // avoids redirecting early

  return children;
}
