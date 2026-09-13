import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Ensure absolute URL for og:image, og:url and twitter:image for scrapers / client sharing
if (typeof window !== 'undefined' && window.location) {
  const origin = window.location.origin;
  const href = window.location.href;

  const ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) {
    ogUrl.setAttribute('content', href);
  }

  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) {
    canonical.setAttribute('href', href);
  }

  const ogImg = document.querySelector('meta[property="og:image"]');
  if (ogImg && ogImg.getAttribute('content')?.startsWith('/')) {
    ogImg.setAttribute('content', `${origin}${ogImg.getAttribute('content')}`);
  }
  const ogSecureImg = document.querySelector('meta[property="og:image:secure_url"]');
  if (ogSecureImg && ogSecureImg.getAttribute('content')?.startsWith('/')) {
    ogSecureImg.setAttribute('content', `${origin}${ogSecureImg.getAttribute('content')}`);
  }
  const twImg = document.querySelector('meta[name="twitter:image"]');
  if (twImg && twImg.getAttribute('content')?.startsWith('/')) {
    twImg.setAttribute('content', `${origin}${twImg.getAttribute('content')}`);
  }
  const linkImg = document.querySelector('link[rel="image_src"]');
  if (linkImg && linkImg.getAttribute('href')?.startsWith('/')) {
    linkImg.setAttribute('href', `${origin}${linkImg.getAttribute('href')}`);
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
