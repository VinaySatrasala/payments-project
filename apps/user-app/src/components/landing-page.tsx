"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn,useSession } from "next-auth/react";
import Image from "next/image";
import {
  ArrowRight,
  Wallet,
  Shield,
  Smartphone,
  CreditCard,
  Users,
  Zap,
} from "lucide-react";
import { Card } from "@repo/ui/CardTable";

export default function Home() {
  const [_isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-black shadow-md">
        <div className="container mx-auto">
          <div className="flex h-16 items-center justify-between px-4">
            <a
              href="/"
              className="text-green-500 text-2xl font-bold text-green-400 transition duration-200"
            >
              Finly.
            </a>

            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-600 focus:ring-offset-2 focus:ring-offset-neutral-800 disabled:opacity-50 disabled:pointer-events-none bg-green-600 hover:bg-black hover:border-green-600 border-green-500 hover:text-green-500 hover:underline font-bold py-2 px-4 rounded shadow-md transition duration-200"
                    onClick={()=>{
                      signIn();
                    }}>
              Sign In
            </button>
          </div>
        </div>
      </header>
      {/* Hero Section */}
      <section className="container mx-auto px-6 pt-32 pb-16 text-center md:pt-40 md:pb-24 md:text-left">
        <div className="md:flex md:items-center md:justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight animate-fade-in-up">
              Your Digital Wallet for the Modern World
            </h1>
            <p className="text-xl text-gray-300 mb-8 animate-fade-in-up animation-delay-200">
              Securely store, send, and manage your digital assets with ease.
              Experience the future of payments today.
            </p>
            <button
              className="bg-green-500 text-black px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-400 transition duration-300 inline-flex items-center animate-fade-in-up animation-delay-400"
              onClick={() => {
                router.push("/auth/signin");
              }}
            >
              Get Started
              <ArrowRight className="ml-2" />
            </button>
          </div>
          <div className="md:w-1/2 animate-fade-in-up animation-delay-600 flex justify-center md:justify-end">
            <div className="flex space-x-3">
              <Image
                src="/phone1.jpg"
                alt="Wallet App Dashboard"
                width={200}
                height={400}
                className="rounded-lg shadow-2xl mx-auto md:mx-0 object-contain"
                priority
              />
              <Image
                src="/phone2.png"
                alt="Wallet App Dashboard"
                width={200}
                height={400}
                className="rounded-lg shadow-2xl mx-auto md:mx-0 object-contain"
                priority
              />
              <Image
                src="/phone3.png"
                alt="Wallet App Dashboard"
                width={200}
                height={400}
                className="rounded-lg shadow-2xl mx-auto md:mx-0 object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      {/* Features Section */}
      <section id="features" className="py-16 md:py-24 bg-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 animate-fade-in-up">
            Powerful Features for Your Digital Wallet
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Wallet,
                title: "Multi-Currency Support",
                description:
                  "Store and manage multiple cryptocurrencies and digital assets in one place.",
              },
              {
                icon: Shield,
                title: "Advanced Security",
                description:
                  "Your digital assets are protected with state-of-the-art encryption and multi-factor authentication.",
              },
              {
                icon: Smartphone,
                title: "Mobile-First Design",
                description:
                  "Access your wallet on-the-go with our intuitive mobile app.",
              },
              {
                icon: CreditCard,
                title: "Instant Transactions",
                description:
                  "Send and receive digital assets quickly and securely.",
              },
              {
                icon: Users,
                title: "Peer-to-Peer Transfers",
                description:
                  "Easily transfer assets to friends and family within the app.",
              },
              {
                icon: Zap,
                title: "Real-Time Updates",
                description:
                  "Get instant notifications and live price updates for your assets.",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="bg-black hover:bg-gray-800 transition duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="p-6">
                  <feature.icon className="w-12 h-12 text-green-400 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300">{feature.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section id="cta" className="py-16 md:py-24">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4 animate-fade-in-up">
            Ready to Join the Digital Revolution?
          </h2>
          <p className="text-xl text-gray-300 mb-8 animate-fade-in-up animation-delay-200">
            Join thousands of users who trust our wallet for their digital asset
            management.
          </p>
          <button
            className="bg-green-500 text-black px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-400 transition duration-300 inline-flex items-center animate-fade-in-up animation-delay-400"
            onClick={() => {
              router.push("/auth/signin");
            }}
          >
            Create Your Wallet
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
              <p className="text-gray-400">
                Your trusted digital asset companion.
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Product</h5>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-green-400 transition duration-300"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-green-400 transition duration-300"
                  >
                    Security
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-green-400 transition duration-300"
                  >
                    Supported Assets
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Company</h5>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-green-400 transition duration-300"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-green-400 transition duration-300"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-green-400 transition duration-300"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Legal</h5>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-green-400 transition duration-300"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-green-400 transition duration-300"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-green-400 transition duration-300"
                  >
                    Security
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 WalletPro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
