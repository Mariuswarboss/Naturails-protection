export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Natural Protection. All rights reserved.</p>
        <p className="mt-1">
          Your trusted source for natural protection products.
        </p>
        {/* Optional: Add links to social media, terms, privacy policy etc. */}
        {/* <div className="mt-4 space-x-4">
          <Link href="/terms" className="hover:text-primary">Terms of Service</Link>
          <Link href="/privacy" className="hover:text-primary">Privacy Policy</Link>
        </div> */}
      </div>
    </footer>
  );
}
