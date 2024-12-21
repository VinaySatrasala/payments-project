export interface BalanceData {
    amount: number;
    locked: number;
  }
  
  export interface BalanceItemProps {
    label: string;
    amount: number;
    isTotal?: boolean;
  }