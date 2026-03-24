import { useEffect, useState } from "react";

import PopularCoursesHome from "./components/home/PopularCoursesHome";
import HomeHeader from "./components/home/HomeHeader";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/auth/login/success`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          },
        );

        if (response.status === 200) {
          const responseObject = await response.json();
          setUser(responseObject.user);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Not authenticated or server error", err);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    getUser();
  }, []);

  return (
    <div>
      <HomeHeader user={user} isLoading={isLoading} />
      <PopularCoursesHome user={user} isLoading={isLoading} />
    </div>
  );
}

export default App;
