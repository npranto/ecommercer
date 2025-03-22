'use client';

import { useProductsQuery } from '@/lib/shopify/client';

export default function About() {
	const { products, isLoading, error } = useProductsQuery();

	if (isLoading) return <div>Loading...</div>;

	if (error) return <div>Error: {error.message}</div>;

	return (
		<div className="flex flex-col min-h-screen max-w-screen-lg mx-auto bg-yellow-100">
			<header className="header">About Header</header>
			<main className="flex flex-col">
				<h1>About Page</h1>
				<ul>
					{products.map(({ node: product }, idx) => (
						<li key={idx}>{product.title}</li>
					))}
				</ul>
			</main>
			<footer className="flex flex-col">About Footer</footer>
		</div>
	);
}
