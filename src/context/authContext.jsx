import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  getAuth, 
  signOut, 
  onAuthStateChanged
} from "firebase/auth"; 
import { app, db } from "../../firebase"; 
import { doc, getDoc } from "firebase/firestore";

export const AuthContext = createContext();

export const AuthContexProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const navigate = useNavigate();
  
  const auth = getAuth(app); 

  // Log out the user
  const logout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
      localStorage.removeItem("user");
      navigate("/");
    } catch (error) {
      throw error;
    }
  };

  // Keep track of the authenticated user using Firebase onAuthStateChanged
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in
        const userRef = doc(db, "users", user.email);
        const userDoc = await getDoc(userRef);
        
        if (userDoc.exists()) {
          // If user data exists in Firestore, set it to state
          const userData = { email: user.email, ...userDoc.data() }; 
          setCurrentUser(userData); 
          localStorage.setItem("user", JSON.stringify(userData));
        } else {
          console.error("No such document in Firestore!"); 
          const userData = { email: user.email };
          setCurrentUser(userData); 
          localStorage.setItem("user", JSON.stringify(userData));
        }
      } else {
        // User is signed out
        setCurrentUser(null); 
        localStorage.removeItem("user"); 
      }
    });

    return () => unsubscribe(); 
  }, [auth, db]);

  // Manage favorites (local storage)
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (stock, isFavorite) => {
    setFavorites(prevFavorites => {
      const updatedFavorites = [...prevFavorites];
      if (isFavorite) {
        updatedFavorites.push(stock);
      } else {
        const index = updatedFavorites.findIndex(item => item.id === stock.id);
        if (index > -1) {
          updatedFavorites.splice(index, 1);
        }
      }
      return updatedFavorites;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        logout,
        toggleFavorite,
        favorites,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
