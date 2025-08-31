import React from "react";
import { AlertTriangle, MapPin, Shield } from "lucide-react";
import { Button } from "./ui/button";
import heroImage from "../assets/hero-aqua-shield.jpg";

const Hero = () => {
  return (
    <section className="relative flex items-center justify-center min-h-screen overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-center bg-no-repeat bg-cover"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-hero"></div>
      </div>

      {/* Content */}
      <div className="container relative z-10 px-4 mx-auto text-center text-white">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 space-x-2 border rounded-full bg-white/20 backdrop-blur-sm border-white/30">
            <Shield className="w-4 h-4" />
            <span className="text-sm font-medium">Advanced Marine Protection System</span>
          </div>

          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-5xl font-bold leading-tight md:text-7xl">
              Protect Our
              <span className="block text-transparent bg-gradient-to-r from-white to-blue-200 bg-clip-text">
                Ocean's Future
              </span>
            </h1>
            <p className="max-w-3xl mx-auto text-xl leading-relaxed md:text-2xl opacity-90">
              Aqua Shield uses cutting-edge surveillance technology to detect, report, and prevent illegal fishing activities. Join the fight to preserve marine ecosystems.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button 
              size="lg" 
              className="px-8 py-6 text-lg bg-white text-primary hover:bg-white/90 shadow-ocean"
            >
              <AlertTriangle className="w-5 h-5 mr-2" />
              Report Illegal Activity
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="px-8 py-6 text-lg text-white border-white hover:bg-white bg-white/10 hover:text-primary"
            >
              <MapPin className="w-5 h-5 mr-2" />
              View Live Map
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 gap-8 pt-8 mt-16 border-t sm:grid-cols-3 border-white/20">
            <div className="text-center">
              <div className="mb-2 text-3xl font-bold md:text-4xl">2,847</div>
              <div className="text-sm tracking-wider uppercase opacity-80">Reports Processed</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-3xl font-bold md:text-4xl">156</div>
              <div className="text-sm tracking-wider uppercase opacity-80">Incidents Prevented</div>
            </div>
            <div className="text-center">
              <div className="mb-2 text-3xl font-bold md:text-4xl">43</div>
              <div className="text-sm tracking-wider uppercase opacity-80">Countries Protected</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero;