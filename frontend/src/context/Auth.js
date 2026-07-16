import { useState, useEffect, useContext, createContext } from "react";
// import { jwtDecode } from "jwt-decode";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  async function checkTokenIsValid() {
    const token = localStorage.getItem("accessToken");
    // const decodedToken = jwtDecode(token);

    try {
      if (response.ok) {
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.log("Error in auth.js: ", error);
    }
  }

  useEffect(() => {
    checkTokenIsValid();
  }, []);

  return (
    <AuthContext.Provider value={[isLoggedIn, setIsLoggedIn]}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);
export { useAuth, AuthProvider };
