import React, { useReducer } from "react";
import { createContext } from "react";

export const InfoContext = createContext({
    info: '',
    tokenLogin: null,
    onChangeInfo: () => { },
    onMakeLogin: () => { },
    onMakeLogout: () => { },
})

const InfoReducer = (state, action) => {
    if (action.type === 'CHANGE_INFO') {
        return { info: action.val}
    } else if (action.type === 'MAKE_LOGIN') {
        localStorage.setItem("tokenLogin", action.val);
        return { tokenLogin: action.val }
    } else if (action.type === 'MAKE_LOGOUT') {
        localStorage.removeItem("tokenLogin");
        return { tokenLogin: null }
    }
}
export const InfoContextProvider = (props) => {

    const [infoState, dispatch] = useReducer(InfoReducer, {
        info: 'Info Inicial',
        tokenLogin: null,
    });

    const onSetNewInfo = (info) => {
        dispatch({ type: 'CHANGE_INFO', val: info })
    }

    const onMakeLogin = (info) => {
        dispatch({ type: 'MAKE_LOGIN', val: info })
    }    

    const onMakeLogout = (info) => {
        dispatch({ type: 'MAKE_LOGOUT', val: info })
    }        

    return <InfoContext.Provider value={{
        info: infoState.info,
        tokenLogin: infoState.tokenLogin,
        onChangeInfo: onSetNewInfo,
        onMakeLogin: onMakeLogin,
        onMakeLogout: onMakeLogout,
    }}>
        {props.children}
    </InfoContext.Provider>
}