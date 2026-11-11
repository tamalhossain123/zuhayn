import Link from "next/link";

export default function NotFound() {
  return (
    <div className="wrap not-found">
      <p className="breadcrumb">404</p>
      <h1>This page could not be found</h1>
      <p className="lede" style={{ marginBottom: 28 }}>
        The page you are looking for has moved or never existed. Head back
        home, or tell us what you were looking for, we will point you the
        right way.
      </p>
      <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
        <Link href="/" className="btn btn-primary">
          Back to Home
        </Link>
        <Link href="/contact" className="btn btn-outline">
          Contact Us
        </Link>
      </div>
    </div>
  );
}
