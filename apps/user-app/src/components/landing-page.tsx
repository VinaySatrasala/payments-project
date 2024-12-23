'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ArrowRight, BarChart2, Lock, Smartphone, DollarSign, Users, Menu, X } from 'lucide-react'

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className={`fixed w-full z-10 transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-md' : ''}`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-green-400">Finly.</div>
            <div className="hidden md:flex space-x-6">
              <a href="#features" className="text-gray-300 hover:text-green-400 transition duration-300">Features</a>
              <a href="#cta" className="text-gray-300 hover:text-green-400 transition duration-300">Get Started</a>
            </div>
            <button 
              className="md:hidden text-green-400"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-900 py-4">
            <div className="container mx-auto px-6 flex flex-col space-y-4">
              <a href="#features" className="text-gray-300 hover:text-green-400 transition duration-300">Features</a>
              <a href="#cta" className="text-gray-300 hover:text-green-400 transition duration-300">Get Started</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 pt-32 pb-16 text-center md:pt-40 md:pb-24 md:text-left">
        <div className="md:flex md:items-center md:justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight animate-fade-in-up">
              Manage Your Finances with Ease and Precision
            </h1>
            <p className="text-xl text-gray-300 mb-8 animate-fade-in-up animation-delay-200">
              Finly helps you track, analyze, and optimize your financial life. Take control of your money like never before.
            </p>
            <button className="bg-green-500 text-black px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-400 transition duration-300 inline-flex items-center animate-fade-in-up animation-delay-400">
              Start Your Journey
              <ArrowRight className="ml-2" />
            </button>
          </div>
          <div className="md:w-1/2 animate-fade-in-up animation-delay-600 flex justify-center md:justify-end">
            <Image 
              src="/phone.png" 
              alt="Finly App Dashboard" 
              width={300} 
              height={600} 
              className="rounded-lg shadow-2xl mx-auto md:mx-0 object-contain"
              priority
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-24 bg-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 animate-fade-in-up">Powerful Features for Your Financial Success</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: BarChart2, title: "Advanced Analytics", description: "Gain insights into your spending habits and financial trends." },
              { icon: Lock, title: "Bank-Level Security", description: "Your financial data is protected with state-of-the-art encryption." },
              { icon: Smartphone, title: "Mobile App", description: "Access your finances on-the-go with our intuitive mobile app." },
              { icon: DollarSign, title: "Budget Planning", description: "Set and track budgets to reach your financial goals faster." },
              { icon: Users, title: "Multi-User Support", description: "Collaborate on finances with family or team members." },
              { icon: ArrowRight, title: "Smart Recommendations", description: "Receive personalized advice to improve your financial health." },
            ].map((feature, index) => (
              <div key={index} className="bg-black p-6 rounded-lg hover:bg-gray-800 transition duration-300 animate-fade-in-up" style={{animationDelay: `${index * 100}ms`}}>
                <feature.icon className="w-12 h-12 text-green-400 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section id="cta" className="py-16 md:py-24">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4 animate-fade-in-up">Ready to Take Control of Your Finances?</h2>
          <p className="text-xl text-gray-300 mb-8 animate-fade-in-up animation-delay-200">Join thousands of satisfied users and start your journey to financial freedom today.</p>
          <button className="bg-green-500 text-black px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-400 transition duration-300 inline-flex items-center animate-fade-in-up animation-delay-400">
            Start Your Journey
            <ArrowRight className="ml-2" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-2xl font-bold mb-4 text-green-400">Finly.</h4>
              <p className="text-gray-400">Empowering your financial journey.</p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Product</h5>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-green-400 transition duration-300">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-green-400 transition duration-300">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-green-400 transition duration-300">Integrations</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Company</h5>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-green-400 transition duration-300">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-green-400 transition duration-300">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-green-400 transition duration-300">Contact</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Legal</h5>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-green-400 transition duration-300">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-green-400 transition duration-300">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-green-400 transition duration-300">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Finly. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

