import { atom, selector } from 'recoil';


export const fullnameAtom = atom({
  key: "fullnameAtom",
  default: ""
})

export const userId = atom({
  key: "userId",
  default: ""
})

export const loginState = selector({
  key: 'loginState',
  get: ({ get }) => {
    const userIdValue = get(userId);
    return !!userIdValue; 
  },
});


export const emailAtom = atom({
  key: "emailAtom",
  default: ""
})

export const passwordAtom = atom({
  key: "passwordAtom",
  default: ""
})

export const accessTokenAtom = atom({
  key: "accessToken",
  default: ""
})

export const userAddress = atom({
  key: "userAddress",
  default: ""
})


