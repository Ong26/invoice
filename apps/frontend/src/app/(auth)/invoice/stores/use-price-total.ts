import { create } from "zustand";
type TotalPriceState = {
	totalPrice: number;
	setTotalPrice: (totalPrice: number) => void;
};

export const useTotalPriceStore = create<TotalPriceState>((set) => ({
	totalPrice: 0,
	setTotalPrice: (totalPrice) => set({ totalPrice }),
}));
