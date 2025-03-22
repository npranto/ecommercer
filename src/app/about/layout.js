import { Geist, Geist_Mono } from 'next/font/google';
import { ShopifyClientProvider } from '@/lib/shopify/client';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata = {
	title: 'About Page',
	description: 'About - Ecommercer',
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<ShopifyClientProvider>{children}</ShopifyClientProvider>
			</body>
		</html>
	);
}
