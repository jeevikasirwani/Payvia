import { useStore } from "zustand";
// import { useBalanceStore } from "../stores/balanceStore";
import { create } from "zustand";

type BalanceState = {
    balance: number;
    setBalance: (balance: number) => void;
};

export const useBalanceStore = create<BalanceState>((set) => ({
    balance: 0,
    setBalance: (balance) => set({ balance }),
}));
export const useBalance = () => {
    const value = useBalanceStore((state) => state.balance);
    return value;
}