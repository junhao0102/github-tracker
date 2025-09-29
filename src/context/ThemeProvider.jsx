  import { createContext,useContext, useEffect, useState } from "react";

  const ThemeContext = createContext();

  export function ThemeProvider({children}) {
    const [theme, setTheme] = useState("light");

    // 從 localStorage 載入偏好
    useEffect(() => {
      const store = localStorage.getItem("theme");
      if (store) {
        setTheme(store);
      }
    }, []);

    // 當 theme 改變,更新 html
    useEffect(() => {
      const root = document.documentElement;
      root.classList.remove("light", "dark");
      root.classList.add(theme);
      localStorage.setItem("theme", theme);
    }, [theme]);

    return (
      <ThemeContext.Provider value={{ theme, setTheme }}>
        {children}
      </ThemeContext.Provider>
    );
  }

  export function useTheme() {
    return useContext(ThemeContext);
  }
