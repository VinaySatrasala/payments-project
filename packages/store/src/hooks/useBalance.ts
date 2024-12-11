import { useRecoilValue } from "recoil"
import { balanceAtom } from "../atoms/balence"

export const useBalance = () => {
    const value = useRecoilValue(balanceAtom);
    return value;
}   