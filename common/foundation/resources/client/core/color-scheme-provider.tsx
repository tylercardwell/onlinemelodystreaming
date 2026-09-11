import {themeEl} from '@ui/root-el';
import {getCurrentThemeValue} from '@ui/themes/utils/get-current-theme-value';
import {useCookie} from '@ui/utils/hooks/use-cookie';
import {createContext, useCallback, useEffect, useMemo} from 'react';

type ColorScheme = 'dark' | 'light' | 'system';

export interface ColorSchemeContextValue {
  colorScheme: Omit<ColorScheme, 'system'>;
  setColorScheme: (colorScheme: ColorScheme) => void;
}

export const ColorSchemeContext = createContext<ColorSchemeContextValue>(null!);

export function ColorSchemeProvider({
  children,
  cookieName,
}: {
  children: any;
  cookieName?: string;
}) {
  const [, setCurrentSchemeCookie] = useCookie(cookieName ?? 'be-color-scheme');

  const setColorScheme = useCallback(
    (_scheme: ColorScheme) => {
      setCurrentSchemeCookie('dark');
      applyColorSchemeToDom('dark');
    },
    [setCurrentSchemeCookie],
  );

  useEffect(() => {
    setColorScheme('dark');
  }, [setColorScheme]);

  const contextValue: ColorSchemeContextValue = useMemo(() => {
    return {
      colorScheme: 'dark',
      setColorScheme,
    };
  }, [setColorScheme]);

  return (
    <ColorSchemeContext.Provider value={contextValue}>
      {children}
    </ColorSchemeContext.Provider>
  );
}

export function applyColorSchemeToDom(scheme: Omit<ColorScheme, 'system'>) {
  if (scheme === 'dark') {
    themeEl.classList.add('dark');
    themeEl.classList.remove('light');
  } else {
    themeEl.classList.remove('dark');
    themeEl.classList.add('light');
  }

  const themeColorMetaEl = document.querySelector('meta[name="theme-color"]');
  if (themeColorMetaEl) {
    themeColorMetaEl.setAttribute(
      'content',
      getCurrentThemeValue('--be-background'),
    );
  }
}
