import React, { useState, useEffect } from 'react';
import type { AppProps } from 'next/app'
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import SnackbarController from '../components/snackbar/snackbarController'

import stores from '../stores/index.js'

import {
  CONFIGURE,
} from '../stores/constants/constants'

import '../styles/globals.css'

import lightTheme from '../theme/light';
import darkTheme from '../theme/dark';

export default function MyApp({ Component, pageProps }: AppProps) {
  const [ themeConfig, setThemeConfig ] = useState(lightTheme);

  const changeTheme = (dark?: boolean) => {
    setThemeConfig(dark ? darkTheme : lightTheme)
    localStorage.setItem("yearn.finance-dark-mode", dark ? "dark" : "light");
  }

  useEffect(function() {
    const localStorageDarkMode = window.localStorage.getItem(
      "yearn.finance-dark-mode"
    );
    changeTheme(localStorageDarkMode ? localStorageDarkMode === "dark" : false);
  }, []);

  useEffect(function() {
    stores.dispatcher.dispatch({ type: CONFIGURE })
  },[]);

  return (
    <ThemeProvider theme={ themeConfig }>
      <CssBaseline />
      <Component {...pageProps} changeTheme={ changeTheme } />
        <SnackbarController />
    </ThemeProvider>
  )
}

// export default function MyApp({ Component, pageProps }: AppProps) {
//   return <Component {...pageProps} />
// }