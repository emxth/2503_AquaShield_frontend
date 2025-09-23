import { Shield, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container px-4 py-12 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-lg bg-primary">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Aqua Shield</h3>
                <p className="text-sm opacity-80">Protecting Our Oceans</p>
              </div>
            </div>
            <p className="text-sm opacity-90">
              Advanced surveillance and reporting system for combating illegal fishing activities and protecting marine ecosystems.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold tracking-wider uppercase">Quick Links</h4>
            <div className="space-y-2">
              <a href="/about" className="block text-sm transition-opacity opacity-90 hover:opacity-100">
                About Us
              </a>
              <a href="/reports" className="block text-sm transition-opacity opacity-90 hover:opacity-100">
                Report Activity
              </a>
              <a href="/statistics" className="block text-sm transition-opacity opacity-90 hover:opacity-100">
                Statistics
              </a>
              <a href="/help" className="block text-sm transition-opacity opacity-90 hover:opacity-100">
                Help Center
              </a>
            </div>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold tracking-wider uppercase">Legal</h4>
            <div className="space-y-2">
              <a href="/privacy" className="block text-sm transition-opacity opacity-90 hover:opacity-100">
                Privacy Policy
              </a>
              <a href="/terms" className="block text-sm transition-opacity opacity-90 hover:opacity-100">
                Terms of Service
              </a>
              <a href="/guidelines" className="block text-sm transition-opacity opacity-90 hover:opacity-100">
                Reporting Guidelines
              </a>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold tracking-wider uppercase">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 opacity-70" />
                <span className="text-sm">contact@aquashield.org</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 opacity-70" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 opacity-70" />
                <span className="text-sm">Marine Conservation HQ</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 mt-8 text-center border-t border-secondary-foreground/20">
          <p className="text-sm opacity-80">
            © 2024 Aqua Shield. All rights reserved. Protecting marine life through technology.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;