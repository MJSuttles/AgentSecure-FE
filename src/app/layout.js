import { Inter } from 'next/font/google';
import PropTypes from 'prop-types';
import ClientProvider from '../utils/context/ClientProvider';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}

// ✅ Moved outside the function block
RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

// Optional dynamic metadata generation
export const generateMetadata = async ({ params }) => {
  const { slug } = params || {}; // fallback in case params is undefined

  return {
    title: `TEMPLATE - ${slug || 'HOME'}`,
    description: `This is a dynamically generated description for ${slug || 'home'}.`,
    keywords: [slug || 'home', 'dynamic', 'page'],
    openGraph: {
      title: `Open Graph Title for ${slug || 'home'}`,
      description: `Open Graph Description for ${slug || 'home'}`,
      url: `https://yourwebsite.com/${slug || ''}`,
    },
  };
};
