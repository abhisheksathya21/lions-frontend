"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const PageLoaderContext = createContext();

export function PageLoaderProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  // Show loader on first load
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Run loader again on route change
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <PageLoaderContext.Provider value={{ loading }}>
      {children}
    </PageLoaderContext.Provider>
  );
}

export function usePageLoader() {
  return useContext(PageLoaderContext);
}
