import { createContext } from "react";

export const  imagesContext = createContext()

export const ImagesProvider = ({children})=>{
    return (<imagesContext.Provider value={{contextQuery:'frog', contextPage:231}}>
        {children}
    </imagesContext.Provider>)
}