import { Switch } from 'antd'
import { useEthersAppContext } from 'eth-hooks/context'
import React, { FC, useEffect, useState } from 'react'
import { useThemeSwitcher } from 'react-css-theme-switcher'
import { useIsomorphicLayoutEffect } from 'usehooks-ts'

const loadTheme = (): string => {
  if (typeof window != null) {
    return window?.localStorage?.getItem('theme') ?? 'light'
  }
  return 'light'
}

const saveTheme = (theme: string): void => {
  if (typeof window != null) {
    window?.localStorage?.setItem('theme', theme)
  }
}

export const ThemeSwitcher: FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const { switcher, currentTheme, status, themes } = useThemeSwitcher()
  const ethersAppContext = useEthersAppContext()

  useEffect(() => {
    saveTheme(currentTheme ?? '')
    if (currentTheme === 'light' || currentTheme === 'dark') {
      ethersAppContext?.setModalTheme?.(currentTheme)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTheme])

  const toggleTheme = (isChecked: boolean): void => {
    setIsDarkMode(isChecked)
    switcher({ theme: isChecked ? themes.dark : themes.light })
    ethersAppContext?.setModalTheme?.(isDarkMode ? 'dark' : 'light')
  }

  useIsomorphicLayoutEffect(() => {
    const theme = loadTheme()
    setIsDarkMode(theme === 'dark')
    toggleTheme(theme === 'dark')
  }, [])

  if (status === 'loading' || status === 'idle') {
    return <></>
  }

  return (
    <div className="main fade-in" style={{ position: 'relative', top: 8, left: 0 }}>
      <span style={{ paddingRight: 8 }}>{currentTheme === 'light' ? '☀️' : '🌜'}</span>
      <Switch checked={isDarkMode} onChange={toggleTheme} />
    </div>
  )
}
