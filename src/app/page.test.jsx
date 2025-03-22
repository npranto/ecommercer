import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Page from '@/app/page';
import { getProducts } from '@/lib/shopify/server';

jest.mock('@/lib/shopify/server');

describe('Home Page', () => {
	it('renders loading state', async () => {
		getProducts.mockResolvedValueOnce({
			products: [],
			isLoading: true,
			error: null,
		});

		const { container } = render(await Page());
		expect(container).toMatchSnapshot();
	});
});
