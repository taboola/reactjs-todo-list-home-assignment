import {useState} from "react";

export function useTheme(defaultTheme = Themes.lightTheme) {
    const [isDarkTheme, setDarkTheme] = useState(defaultTheme)
    return [isDarkTheme, setDarkTheme]
}

export const Themes = {
    darkTheme: 'dark-theme',
    lightTheme: 'light-theme'
}

export const isDarkTheme = (theme) => theme === Themes.darkTheme
export const isLightTheme = (theme) => theme === Themes.lightTheme

export const toggleTheme = (theme)=> isDarkTheme(theme)? Themes.lightTheme: Themes.darkTheme