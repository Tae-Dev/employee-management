import { createContext, FC, useContext, useState } from "react";
import Loading from "../Components/Loading/Loading";

type LoadingContextType = {
    onLoading: (callback?: any) => void
}

const LoadingContext = createContext<LoadingContextType>({
    onLoading: () => {}
})

const LoadingProvider:FC<any> = ({children}) => {
    const [isLoading, setIsLoading] = useState(false)

    const onLoading = (callback: any) => {
        setIsLoading(true)
        setTimeout(() => {        
            setIsLoading(false)
            callback && callback()
        }, 1000);
    }

    return (
        <LoadingContext.Provider value={{onLoading}}>
            {children}
            <Loading isOpen={isLoading} setIsOpen={() => null}/>
        </LoadingContext.Provider>
    )
}

export default LoadingProvider;
export const useLoading = () => useContext(LoadingContext);