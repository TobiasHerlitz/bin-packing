enum ColorTheme {
  Light = 'light',
  Dark = 'dark',
}

const THEME_ATTR = 'color-theme';

export const ColorThemeToggle = () => {
  // https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme
  const userPrefersDarkMode = window.matchMedia(
    '(prefers-color-scheme: dark)'
  ).matches;

  document.documentElement.setAttribute(
    THEME_ATTR,
    userPrefersDarkMode ? ColorTheme.Dark : ColorTheme.Light
  );

  const toggleTheme = () => {
    const theme = document.documentElement.getAttribute(THEME_ATTR);
    document.documentElement.setAttribute(
      'color-theme',
      theme === ColorTheme.Dark ? ColorTheme.Light : ColorTheme.Dark
    );
  };

  return <button onClick={toggleTheme}>Toggle theme</button>;
};
