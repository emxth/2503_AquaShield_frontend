import React from "react";
import { Shield, Menu, User, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-lg bg-gradient-ocean">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-primary">Aqua Shield</h1>
            <p className="-mt-1 text-xs text-muted-foreground">Illegal Fishing Prevention</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="items-center hidden space-x-8 md:flex">
          <a href="/" className="transition-colors text-foreground hover:text-primary">
            Home
          </a>
          <a href="/reports" className="transition-colors text-foreground hover:text-primary">
            Report Activity
          </a>
          <a href="/about" className="transition-colors text-foreground hover:text-primary">
            About
          </a>
          <a href="/contact" className="transition-colors text-foreground hover:text-primary">
            Contact
          </a>
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="hidden md:flex">
                <User className="w-4 h-4 mr-2" />
                Account
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <a href="/login" className="w-full">Login</a>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <a href="/signup" className="w-full">Sign up</a>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <a href="/admin" className="w-full">Admin Login</a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t md:hidden bg-card">
          <div className="container px-4 py-4 mx-auto space-y-4">
            <a href="/" className="block transition-colors text-foreground hover:text-primary">
              Home
            </a>
            <a href="/reports" className="block transition-colors text-foreground hover:text-primary">
              Report Activity
            </a>
            <a href="/about" className="block transition-colors text-foreground hover:text-primary">
              About
            </a>
            <a href="/contact" className="block transition-colors text-foreground hover:text-primary">
              Contact
            </a>
            <div className="space-y-2">
              <a href="/login" className="block w-full p-3 transition-colors rounded-md text-foreground hover:text-primary hover:bg-accent">
                Login
              </a>
              <a href="/signup" className="block w-full p-3 transition-colors rounded-md text-foreground hover:text-primary hover:bg-accent">
                Sign up
              </a>
              <a href="/admin" className="block w-full p-3 transition-colors rounded-md text-foreground hover:text-primary hover:bg-accent">
                Admin Login
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;