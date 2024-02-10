import { useContext, createContext } from "react";

//Criando o contexto pora diferenciação de usuário autenticado ou nao
const AuthContext = createContext()

//Exportando a função do provedor de contexto
export function AuthProvider({children, value}){
    return <AuthContext.Provider value = {value}>{children}</AuthContext.Provider>
}
//
export function useAuthValue(){
    return useContext(AuthContext)
}