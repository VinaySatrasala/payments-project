'use client';

import { useEffect, useState, useRef } from 'react';
import { AiFillLock, AiOutlineCheckCircle, AiOutlineEllipsis } from 'react-icons/ai';
import { useRouter } from 'next/navigation';
import { Card } from '@repo/ui/CardTable';
import { Center } from '@repo/ui/Center';
import BalanceFetch from '../app/lib/actions/balance-fetch';

interface BalanceData {
  amount: number;
  locked: number;
}

function BalanceCard(): JSX.Element {
  const [balance, setBalance] = useState<BalanceData>({ amount: 0, locked: 0 });
  const [_loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    async function getBalance() {
      try {
        const res = await BalanceFetch();
        setBalance(res);
      } catch (error) {
        console.error('Failed to fetch balance:', error);
      } finally {
        setLoading(false);
      }
    }
    getBalance().catch((error) => {
      console.error('Failed to fetch balance:', error);
    });
  }, []);

  const toggleDropdown = (): void => setDropdownOpen(!dropdownOpen);

  const handleNavigation = (path: string): void => {
    router.push(path);
    setDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <Card className="w-96 bg-black text-white p-6 relative rounded-lg shadow-md">
      {/* Dropdown Button */}
      <div className="absolute top-4 right-4">
        <button
          type="button"
          onClick={toggleDropdown}
          className="text-white text-2xl focus:outline-none"
        >
          <AiOutlineEllipsis />
        </button>
        {dropdownOpen && (
          <div
            ref={dropdownRef}
            className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded shadow-lg z-10"
          >
            <ul className="py-2">
              <li
                onClick={() => handleNavigation('/deposits')}
                className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
              >
                View Deposits
              </li>
              <li
                onClick={() => handleNavigation('/transactions')}
                className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
              >
                View Transactions
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Centered Total Balance */}
      <div className="flex flex-col">
        <div className="text-lg font-semibold text-gray-300">Total Balance</div>
        <div className="text-2xl font-bold text-green-400 ml-3">
          ₹ {(balance.amount + balance.locked)/100}
        </div>
      </div>

      {/* Locked and Available Sections */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        <Center>
          <div className="flex items-center gap-2">
            <AiFillLock className="text-red-400 text-xl" />
            <div>
              <div className="text-sm font-semibold text-gray-300">Locked</div>
              <div className="text-lg font-bold text-red-400 ml-3">₹ {(balance.locked)/100}</div>
            </div>
          </div>
        </Center>
        <Center>
          <div className="flex items-center gap-2">
            <AiOutlineCheckCircle className="text-green-400 text-xl" />
            <div>
              <div className="text-sm font-semibold text-gray-300">Available</div>
              <div className="text-lg font-bold text-green-400">₹ {(balance.amount)/100}</div>
            </div>
          </div>
        </Center>
      </div>
    </Card>
  );
}

export default BalanceCard;
