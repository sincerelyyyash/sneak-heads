import {atom} from 'recoil';


// user Login & Sign Up field Atoms
export const fullnameAtom = atom({
    key: "fullnameAtom",
    default: ""
})


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



