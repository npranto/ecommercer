import { createClient, defaultExchanges } from '@urql/core';
import { CONFIG } from '@/config';
import { GET_PRODUCTS } from './queries';

/**
 * This file contains server-side implementations of Shopify functionality.
 * All server-side interactions with the Shopify API should be imported from here.
 * This ensures proper server-side execution and avoids client-side API token exposure.
 *
 * @example
 * // (server components / API routes):
 * import { getProducts } from '@/lib/shopify/server'
 */

export function createUrqlPromise(client) {
	return async function ({ operation, gql, variables }) {
		if (operation === 'mutation') return await client.mutation(gql, variables).toPromise();
		return await client.query(gql, variables).toPromise();
	};
}

const shopifyClient = createClient({
	url: CONFIG.SHOPIFY_STOREFRONT_API_URL,
	requestPolicy: 'cache-and-network',
	fetchOptions: () => ({
		headers: {
			'X-Shopify-Storefront-Access-Token': CONFIG.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
			'Content-Type': 'application/json',
		},
	}),
	exchanges: defaultExchanges,
});

const shopifyServerQuery = createUrqlPromise(shopifyClient);

export const getProducts = async ({
	first = 10, // number of products to fetch
}) => {
	const { data, error } = await shopifyServerQuery({
		gql: GET_PRODUCTS,
		variables: { first },
	});

	if (error) {
		console.error(error);
		return {
			products: [],
			error,
			isLoading: false,
		};
	}

	return {
		products: data?.products?.edges || [],
		error,
		isLoading: false,
	};
};
