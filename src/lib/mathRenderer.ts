import katex from 'katex';

export const renderMath = (latex: string): string => {
  try {
    return katex.renderToString(latex, {
      displayMode: true,
      throwOnError: false
    });
  } catch (error) {
    console.error('Math rendering error:', error);
    return latex;
  }
};

export const renderInlineMath = (latex: string): string => {
  try {
    return katex.renderToString(latex, {
      displayMode: false,
      throwOnError: false
    });
  } catch (error) {
    console.error('Math rendering error:', error);
    return latex;
  }
};