import { gql } from '@urql/core';

export const GET_PRODUCTS = gql`
	query getProducts($first: Int = 10) {
		products(first: $first) {
			edges {
				node {
					id
					title
					handle
					description
					images(first: 5) {
						edges {
							node {
								src
								altText
								url
							}
						}
					}
				}
			}
		}
	}
`;
