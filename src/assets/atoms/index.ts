import { atom } from "recoil";

interface FineProps {
  reason: string;
  created_at: string;
  amount: string;
  dueDate: string;
  status: string;
}

export interface UserProps {
  avatar: string;
  dob: string;
  email: string;
  fines: FineProps[];
  firstName: string;
  lastName: string;
  licenseNumber: string;
  __typename: string;
}

export const useAtom = atom<UserProps>({
  key: "userAtom",
  default: {
    avatar: "",
    dob: "",
    email: "",
    fines: [],
    firstName: "",
    lastName: "",
    licenseNumber: "",
    __typename: "",
  },
});
