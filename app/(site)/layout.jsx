import "../globals.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Loader from "../../components/Loader";
import GlobalBreadcrumbs from "../../components/GlobalBreadcrumbs";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { PageLoaderProvider } from "../PageLoaderContext";

export default function SiteLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <PageLoaderProvider>

          {/* FIXED NAVBAR */}
          <Navbar />

          {/* CORRECT SPACING BELOW NAVBAR */}
          <div className="pt-16 md:pt-20">
            <GlobalBreadcrumbs />
          </div>

          <Loader />

          {/* Main content also respects navbar height */}
          <main className="max-w-6xl mx-auto px-4 py-10 min-h-screen">
            {children}
          </main>

          <Footer />

        </PageLoaderProvider>
      </body>
    </html>
  );
}
