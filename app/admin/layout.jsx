// app/admin/layout.jsx
import "../globals.css";
import { AdminProvider } from "../../components/admin/AuthProvider";
import AdminNav from "../../components/admin/AdminNav";

export const metadata = {
  title: "Admin | Lions Club",
};

export default function AdminRootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <AdminProvider>
          <AdminNav />
          <main className="max-w-6xl mx-auto p-6">{children}</main>
        </AdminProvider>
      </body>
    </html>
  );
}
