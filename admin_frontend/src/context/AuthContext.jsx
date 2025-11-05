import { createContext, useContext, useState } from 'react'


const AuthContext = createContext();

export function AuthProvider({children}) {
    
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState(null);

    const login = (data) => {
        setIsAuthenticated(true);
        setToken(data.token);
        localStorage.setItem('token', data.token);
    };
    

    const registerUser = () => setIsAuthenticated(false);
    

    const logout = () => {
        setIsAuthenticated(false);
        setToken(null);
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated,token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

// References
// userNick. 2020. ‘How to use context with hooks for authentication?’ [Online]. Available at: https://stackoverflow.com/q/62366578/11914974 [Accessed 10 October 2025].