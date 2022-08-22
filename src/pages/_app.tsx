import { useEffect, useMemo, useState } from 'react';

import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Script from 'next/script';

import CssBaseline from '@mui/material/CssBaseline';

import useMediaQuery from '@mui/material/useMediaQuery';

import { CacheProvider, ThemeProvider as EmotionThemeProvider, css } from '@emotion/react';
import { ThemeProvider } from '@mui/material/styles';

import Header from '../components/Header';
import createCache, { EmotionCache } from '@emotion/cache';

import * as fbq from '../lib/fbPixel';
import * as gtag from '../lib/gtag';
import dynamic from 'next/dynamic';
import getTheme from '../lib/theme';

const ToTopButton = dynamic(() => import('../components/ToTopButton'));
const Footer = dynamic(() => import('../components/Footer'));
const CookieBanner = dynamic(() => import('../components/CookieBanner'), { ssr: false });

const browserCache = createCache({ key: 'css' });
browserCache.compat = true;

const DARK_MODE_KEY = 'prefersDarkMode';

const getInitialDarkMode = (prefersDarkMode: boolean): boolean => {
  if (typeof window !== 'undefined') {
    const stored = window.localStorage.getItem(DARK_MODE_KEY);
    // If we got a stored value, let it override the browser preference
    if (stored !== null) {
      return stored === 'true';
    }
  }
  // If no stored value, let the initial value be the browser preference
  return prefersDarkMode;
};

const setStoredDarkModeValue = (value: boolean) => {
  localStorage.setItem(DARK_MODE_KEY, value.toString());
};

interface Props extends AppProps {
  emotionCache?: EmotionCache;
}

function MyApp({ Component, pageProps, emotionCache = browserCache }: Props): JSX.Element {
  const router = useRouter();
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [darkModeState, setDarkModeState] = useState(prefersDarkMode);

  const theme = useMemo(() => {
    return getTheme(darkModeState);
  }, [darkModeState]);

  useEffect(() => {
    /* In case the server and client has different opinions on which mode to use */
    setDarkModeState(getInitialDarkMode(prefersDarkMode));
  }, [prefersDarkMode]);

  useEffect(() => {
    // This pageview only triggers the first time (it's important for Pixel to have real information)
    fbq.pageview();

    const handleRouteChange = (url: URL) => {
      gtag.pageview(url);
      fbq.pageview();
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <EmotionThemeProvider theme={theme}>
          {process.env.NODE_ENV === 'production' && (
            <>
              {/* Global Site Code Pixel - Facebook Pixel */}
              <Script
                id="fb-pixel"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                  __html: `
                    !function(f,b,e,v,n,t,s)
                    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                    n.queue=[];t=b.createElement(e);t.async=!0;
                    t.src=v;s=b.getElementsByTagName(e)[0];
                    s.parentNode.insertBefore(t,s)}(window, document,'script',
                    'https://connect.facebook.net/en_US/fbevents.js');
                    fbq('init', '${fbq.FB_PIXEL_ID}');
                  `,
                }}
              />
            </>
          )}
          <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
          </Head>
          <CssBaseline />
          <Header
            toggleDarkMode={() => {
              setDarkModeState((prevValue) => {
                const newValue = !prevValue;
                setStoredDarkModeValue(newValue);
                return newValue;
              });
            }}
          />
          <main
            css={css`
              margin-bottom: 1rem;
              display: flex;
              flex-direction: column;
              flex-grow: 1;
            `}
          >
            <Component {...pageProps} />
          </main>
          <Footer />
          <ToTopButton />
          <CookieBanner />
        </EmotionThemeProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;
