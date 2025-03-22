# ecommercer

An e-commerce application to make it easy for developers to get started with selling products leveraging Shopify.

## Prerequisites

- Node.js version 22 or higher.
- [nvm](https://github.com/nvm-sh/nvm) (recommended for managing Node.js versions).

## Setup Instructions

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   ```

2. Install the correct Node.js version using nvm:

   ```bash
   nvm install
   nvm use
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Environment Variables

To run this project, you need to set up the following environment variables in a .env.local file:

1. Create a .env.local file in the root of your project:

```
touch .env.local
```

2. Add the following variables to the .env.local file:

```
NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_URL=https://your-store.myshopify.com/api/2024-04/graphql.json
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-storefront-access-token
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
```

Replace the placeholders with your actual Shopify Storefront API URL, access token and domain. Reach out to [@npranto](https://github.com/npranto) if you need these credentials in local environment.

3. Using Storefront API

The Storefront API is a GraphQL API that allows you to query and mutate data in a Shopify store. In this app, we use this API to fetch product details at the moment, but plan to expand its functionality to use more resources in the future.

### Using `lib/shopify/client.js` for Client-side API calls

To use the Storefront API on the client rnedered pages or compoennts, use the `lib/shopify/client.js` file to import functionalities as follows:

- `ShopifyClientProvider`: A React Context Provider that provides the Storefront API client to the app. Usually added to the page level root `app/[PAGE]/layout.js` component.
- `useProductsQuery`: A React hook that fetches product data from the Storefront API. By default, it fetches first 10 products from the Storefront API, but you can modify the query to fetch specific number of products.

Example:

```js
// app/about/layout.js
export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className="page about">
				<ShopifyClientProvider>{children}</ShopifyClientProvider>
			</body>
		</html>
	);
}
```

```js
// app/about/page.js
'use client';

import { useProductsQuery } from '@/lib/shopify/client';

export default function About() {
	const {
		products = [],
		isLoading,
		error,
	} = useProductsQuery({
		first: 10, // number of products to fetch (default: 10)
	});

	if (isLoading) return <div>Loading...</div>;

	if (error) return <div>Oops! Something went wrong {error.message}</div>;

	return (
		<div className="flex flex-col min-h-screen max-w-screen-lg mx-auto">
			<main className="flex flex-col">
				<ul>
					{products.map(({ node: product }, idx) => (
						<li key={idx}>{product.title}</li>
					))}
				</ul>
			</main>
		</div>
	);
}
```

### Using `lib/shopify/server.js` for Server-side API calls

To use the Storefront API on the server-rendered pages or components, use the `lib/shopify/server.js` file to import functionalities as follows:

- `getProducts`: A function that fetches product data from the Storefront API. By default, it fetches first 10 products from the Storefront API, but you can modify the query to fetch specific number of products.

Example:

```js
import { getProducts } from '@/lib/shopify/server';

export default async function Home() {
	const { products, error, isLoading } = await getProducts({
		first: 10, // number of products to fetch (default: 10)
	});

	console.log('products', products);

	if (isLoading) return <p>Loading...</p>;

	if (error) return <div>Oops! Something went wrong: {error.message}</div>;

	return (
		<div className="flex flex-col min-h-screen max-w-screen-lg mx-auto">
			<main className="flex flex-col">
				<ul>
					{products.map(({ node: product }, idx) => (
						<li key={idx}>{product.title}</li>
					))}
				</ul>
			</main>
		</div>
	);
}
```
