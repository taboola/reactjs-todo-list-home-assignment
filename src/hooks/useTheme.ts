import {useState} from "react";

export function useTheme(defaultTheme = Themes.LightTheme):[Themes, (Themes) => void] {
    const [theme, setTheme] = useState<Themes>(defaultTheme)
    return [theme, setTheme]
}

export enum Themes {
    DarkTheme = 'dark-theme',
    LightTheme = 'light-theme'
}

export const isDarkTheme = (theme) => theme === Themes.DarkTheme

export const toggleTheme = (theme: Themes): Themes => isDarkTheme(theme) ? Themes.LightTheme : Themes.DarkTheme