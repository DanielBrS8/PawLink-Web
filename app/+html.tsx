import { ScrollViewStyleReset } from 'expo-router/html';

export default function Root({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1.00001,viewport-fit=cover"
        />
        <title>PawLink — Cuidamos a quienes nos cuidan</title>
        <meta
          name="description"
          content="Adopciones, centros veterinarios, campañas solidarias y comunidad para amantes de los animales."
        />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&display=swap"
          rel="stylesheet"
        />

        <ScrollViewStyleReset />

        <style dangerouslySetInnerHTML={{ __html: globalStyles }} />
      </head>
      <body>{children}</body>
    </html>
  );
}

const globalStyles = `
  html, body, #root {
    background-color: #fdf8f3;
  }
  body {
    font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #1f1b16;
  }
  *, *::before, *::after {
    transition-property: background-color, border-color, color, fill, stroke,
      opacity, box-shadow, transform, filter;
    transition-duration: 220ms;
    transition-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
  }
  ::selection {
    background-color: #fed7aa;
    color: #7c2d12;
  }
  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background: #f5d6b8;
    border-radius: 999px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #f8b878;
  }
`;
