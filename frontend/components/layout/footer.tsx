export default function Footer() {
    return (
      <footer className="border-t bg-white/60">
        <div className="container mx-auto px-4 py-6 text-sm text-gray-500">
          © {new Date().getFullYear()} AI Workstation · All rights reserved.
        </div>
      </footer>
    );
  }