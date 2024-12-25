'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from './Button';

interface AppBarProps {
  user: {
    name?: string | null;
  } | null;
  onSignIn: () => void;
  onSignOut: () => void;
  onEditUser: () => void; // Function to handle redirect
}

export const AppBar = ({
  user,
  onSignIn,
  onSignOut,
  onEditUser, // Function to handle redirect
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
    <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-black shadow-md">
      <div className="container mx-auto">
        <div className="flex h-16 items-center justify-between px-4">
          {/* Logo Section */}
          <a
            href="/"
            className="text-green-500 text-2xl font-bold text-green-400 transition duration-200"
          >
            Finly.
          </a>

          {/* User Section */}
          <div className="flex items-center">
            {user ? (
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center justify-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-green-400 transition duration-200"
                  aria-expanded={isMenuOpen}
                  aria-haspopup="true"
                >
                  <span className="sr-only">Open user menu</span>
                  <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center text-white font-semibold">
                    {user?.name?.charAt(0).toUpperCase() || "?"}
                  </div>
                </button>
                {isMenuOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg py-2 bg-neutral-900 ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-4 py-2 text-sm text-gray-300">
                      Signed in as <br />
                      <span className="font-medium text-white">{user.name || "Guest"}</span>
                    </div>
                    <hr className="border-gray-700 my-2" />
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition duration-200"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsMenuOpen(false);
                        onEditUser(); // Call onEditUser function to handle redirect
                      }}
                    >
                      Edit Profile
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition duration-200"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsMenuOpen(false);
                        onSignOut();
                      }}
                    >
                      Sign out
                    </a>
                    {/* Edit User Information Option */}
                  </div>
                )}
              </div>
            ) : (
              <Button
                onClick={onSignIn}
                className="bg-green-600 hover:bg-black hover:border-green-600 border hover:text-green-500 hover:underline font-bold py-2 px-4 rounded shadow-md transition duration-200"
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
