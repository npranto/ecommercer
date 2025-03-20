export default {
	ci: {
		collect: {
			url: [],
		},
		assert: {
			assertions: {
				// Performance should be above 90%
				'categories:performance': ['error', { minScore: 0.9 }],
				// LCP should be <= 2500ms
				'audits:largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
				// FID should be <= 100ms
				'audits:first-input-delay': ['error', { maxNumericValue: 100 }],
				// CLS should be <= 0.1
				'audits:cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
				// FCP should be <= 2000ms
				'audits:first-contentful-paint': ['warn', { maxNumericValue: 2000 }],
				// TTI should be <= 5000ms
				'audits:interactive': ['warn', { maxNumericValue: 5000 }],
				// TBT should be <= 300ms
				'audits:total-blocking-time': ['warn', { maxNumericValue: 300 }],
			},
		},
		upload: {
			target: 'temporary-public-storage',
		},
	},
};
