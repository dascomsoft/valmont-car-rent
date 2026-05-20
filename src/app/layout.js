








// // Layout principal avec police Nunito
// import { Nunito } from 'next/font/google';
// import './globals.css';
// import Header from '@/components/Header.jsx';
// import Footer from '@/components/Footer.jsx';
// import { BookingProvider } from '@/context/BookingContext';
// import BookingModalGlobal from '@/components/BookingModalGlobal';

// const nunito = Nunito({ 
//   subsets: ['latin'],
//   weight: ['400', '500', '600', '700', '800'],
//   variable: '--font-nunito',
// });

// export const metadata = {
//   title: 'Zua Car - Location de véhicules avec chauffeur à Kinshasa',
//   description: 'Vente & location de véhicules avec chauffeur à Kinshasa. Zua Car, votre compagnon de route pour toutes vos activités.',
//   manifest: '/manifest.json',
//   appleWebApp: {
//     capable: true,
//     statusBarStyle: 'black-translucent',
//     title: 'Zua Car',
//   },
// };

// export const viewport = {
//   width: 'device-width',
//   initialScale: 1,
//   maximumScale: 1,
//   themeColor: '#FDBB02',
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="fr">
//       <head>
//         <meta name="mobile-web-app-capable" content="yes" />
//         <meta name="apple-mobile-web-app-capable" content="yes" />
//         <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
//         <link rel="shortcut icon" href="/images/zuacarlogo.jpg" type="image/jpeg" />
//         <link rel="apple-touch-icon" href="/images/zuacarlogo.jpg" />
//         <meta name="msapplication-navbutton-color" content="#FDBB02" />
//       </head>
//       <body className={`${nunito.className} antialiased bg-gradient-to-b from-gray-900 to-black text-white`}>
//         {/* Provider qui donne accès au modal partout */}
//         <BookingProvider>
//           <Header />
//           <main className="min-h-screen">
//             {children}
//           </main>
//           <Footer />
//           {/* Un seul modal global pour toute l'application */}
//           <BookingModalGlobal />
//         </BookingProvider>
//       </body>
//     </html>
//   );
// }



















































// // Layout principal avec police Nunito
// import { Nunito } from 'next/font/google';
// import './globals.css';
// import Header from '@/components/Header.jsx';
// import AdminHeader from '@/components/AdminHeader.jsx';
// import Footer from '@/components/Footer.jsx';
// import { BookingProvider } from '@/context/BookingContext';
// import BookingModalGlobal from '@/components/BookingModalGlobal';
// import { cookies } from 'next/headers';

// const nunito = Nunito({ 
//   subsets: ['latin'],
//   weight: ['400', '500', '600', '700', '800'],
//   variable: '--font-nunito',
// });

// export const metadata = {
//   title: 'Zua Car - Location de véhicules avec chauffeur à Kinshasa',
//   description: 'Vente & location de véhicules avec chauffeur à Kinshasa. Zua Car, votre compagnon de route pour toutes vos activités.',
//   manifest: '/manifest.json',
//   appleWebApp: {
//     capable: true,
//     statusBarStyle: 'black-translucent',
//     title: 'Zua Car',
//   },
// };

// export const viewport = {
//   width: 'device-width',
//   initialScale: 1,
//   maximumScale: 1,
//   themeColor: '#FDBB02',
// };

// // Vérifier si l'utilisateur est admin
// async function isAdminAuthenticated() {
//   const cookieStore = await cookies();
//   const adminSession = cookieStore.get('admin_session');
//   return adminSession?.value === 'authenticated';
// }

// export default async function RootLayout({ children }) {
//   const isAdmin = await isAdminAuthenticated();

//   return (
//     <html lang="fr">
//       <head>
//         <meta name="mobile-web-app-capable" content="yes" />
//         <meta name="apple-mobile-web-app-capable" content="yes" />
//         <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
//         <link rel="shortcut icon" href="/images/zuacarlogo.jpg" type="image/jpeg" />
//         <link rel="apple-touch-icon" href="/images/zuacarlogo.jpg" />
//         <meta name="msapplication-navbutton-color" content="#FDBB02" />
//       </head>
//       <body className={`${nunito.className} antialiased bg-gradient-to-b from-gray-900 to-black text-white`}>
//         <BookingProvider>
//           {/* Afficher le header approprié selon l'authentification */}
//           {isAdmin ? <AdminHeader /> : <Header />}
//           <main className="min-h-screen pt-16">
//             {children}
//           </main>
//           <Footer />
//           <BookingModalGlobal />
//         </BookingProvider>
//       </body>
//     </html>
//   );
// }








































































// Main layout with Nunito font
import { Nunito } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header.jsx';
import AdminHeader from '@/components/AdminHeader.jsx';
import Footer from '@/components/Footer.jsx';
import { BookingProvider } from '@/context/BookingContext';
import BookingModalGlobal from '@/components/BookingModalGlobal';
import { cookies } from 'next/headers';

const nunito = Nunito({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-nunito',
});

export const metadata = {
  title: 'Valmont Car Rent - Premium Car Rental in Seychelles Islands',
  description: 'Premium car rental service in Seychelles. Explore Mahé, Praslin and La Digue with our modern fleet. Free island delivery, 24/7 support, best price guarantee.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Valmont Car Rent',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#FDBB02',
};

// Check if user is admin
async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  const adminSession = cookieStore.get('admin_session');
  return adminSession?.value === 'authenticated';
}

export default async function RootLayout({ children }) {
  const isAdmin = await isAdminAuthenticated();

  return (
    <html lang="en">
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="shortcut icon" href="/images/valmont-logo.jpg" type="image/jpeg" />
        <link rel="apple-touch-icon" href="/images/valmont-logo.jpg" />
        <meta name="msapplication-navbutton-color" content="#FDBB02" />
        <meta name="keywords" content="car rental Seychelles, rent car Mahe, Seychelles airport transfer, luxury car rental Seychelles, Valmont Car Rent" />
        <meta name="author" content="Valmont Car Rent Seychelles" />
        <meta name="geo.region" content="SC" />
        <meta name="geo.placename" content="Mahé, Seychelles" />
      </head>
      <body className={`${nunito.className} antialiased bg-gradient-to-b from-gray-900 to-black text-white`}>
        <BookingProvider>
          {/* Show appropriate header based on authentication */}
          {isAdmin ? <AdminHeader /> : <Header />}
          <main className="min-h-screen pt-16">
            {children}
          </main>
          <Footer />
          <BookingModalGlobal />
        </BookingProvider>
      </body>
    </html>
  );
}