'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from './Button';
interface AppBarProps {
    user: {
      name?: string | null;
    } | null;
    onSignIn: any;
    onSignOut: any;
  }

export const AppBar = ({
  user,
  onSignIn,
  onSignOut
}: AppBarProps): JSX.Element => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null); // Reference for the dropdown menu

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false); // Close the dropdown
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-black">
      <div className="container mx-auto">
        <div className="flex h-16 items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center">
            <a href="/" className="text-white text-xl font-bold">
              Simple
            </a>
          </div>

          {/* User Section */}
          <div className="flex items-center">
            {user ? (
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center justify-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-white"
                >
                  <span className="sr-only">Open user menu</span>
                  <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center text-white font-semibold">
                    {user?.name?.charAt(0).toUpperCase() || "?"}
                  </div>
                </button>
                {isMenuOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-neutral-900 ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-4 py-2 text-sm text-gray-300">
                      Signed in as <br />
                      <span className="font-medium text-white">{user.name || "Guest"}</span>
                    </div>
                    <hr className="border-gray-700" />
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsMenuOpen(false);
                        onSignOut();
                      }}
                    >
                      Sign out
                    </a>
                  </div>
                )}
              </div>
            ) : (
              <Button
                onClick={onSignIn}
                className="bg-white text-black hover:bg-gray-200 font-bold py-2 px-4 rounded"
              >
                Sign In
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
