import { getProducts } from '@/lib/shopify/server';

export default async function Home() {
	const { products, error, isLoading } = await getProducts({ first: 10 });

	console.log('products', products);

	if (isLoading) {
		return <p>Loading...</p>;
	}

	if (error) {
		return (
			<div>
				<p>Oops! Something went wrong: </p>
				<p>{error.message}</p>
			</div>
		);
	}

	return (
		<div className="flex flex-col min-h-screen max-w-screen-lg mx-auto bg-green-100">
			<header className="header">Header</header>
			<main className="flex flex-col">
				<h1>Hello ecommercer!</h1>
				<ul>
					{products.map(({ node: product }, idx) => (
						<li key={idx}>{product.title}</li>
					))}
				</ul>
			</main>
			<footer className="flex flex-col">Footer</footer>
		</div>
	);
}
