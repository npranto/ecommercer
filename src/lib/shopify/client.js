'use client';

/**
 * This file contains client-side implementations of Shopify functionality.
 * All client-side interactions with the Shopify API should be imported from here.
 * This ensures proper client-side execution and avoids server-side API token exposure.
 *
 * @example
 * // (client components):
 * import { ShopifyProvider, useProductsQuery } from '@/lib/shopify/client'
 */

import { createClient, defaultExchanges, Provider, useQuery } from 'urql';
import { CONFIG } from '@/config';
import { GET_PRODUCTS } from './queries';

const shopifyClient = createClient({
	url: CONFIG.SHOPIFY_STOREFRONT_API_URL,
	fetchOptions: () => ({
		headers: {
			'X-Shopify-Storefront-Access-Token': CONFIG.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
			'Content-Type': 'application/json',
		},
	}),
	exchanges: [...defaultExchanges],
});

export function ShopifyClientProvider({ children }) {
	return <Provider value={shopifyClient}>{children}</Provider>;
}

export const useProductsQuery = ({ first = 10 }) => {
	const [{ data, fetching, error }] = useQuery({
		query: GET_PRODUCTS,
		variables: {
			first, // number of products to fetch
		},
		requestPolicy: 'cache-and-network', // caches data and only re-fetches when stale
		staleTime: 1000 * 60 * 5, // stale time in milliseconds (default: 5 minute)
	});

	return {
		products: data?.products?.edges || [],
		isLoading: fetching || false,
		error: error || null,
	};
};
