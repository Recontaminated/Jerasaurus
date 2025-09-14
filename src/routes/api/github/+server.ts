import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/private';

const GITHUB_TOKEN = env.GITHUB_TOKEN;
const GITHUB_USERNAME = env.GITHUB_USERNAME || 'Recontaminated';

export const GET: RequestHandler = async () => {
	try {
		if (!GITHUB_TOKEN) {
			throw new Error('GitHub token not configured');
		}

		const currentYear = new Date().getFullYear();
		const startDate = `${currentYear}-01-01T00:00:00Z`;
		const endDate = `${currentYear}-12-31T23:59:59Z`;

		// Use GraphQL API to get contribution data
		const query = `
			query {
				user(login: "${GITHUB_USERNAME}") {
					contributionsCollection(from: "${startDate}", to: "${endDate}") {
						contributionCalendar {
							totalContributions
						}
						totalCommitContributions
						restrictedContributionsCount
					}
				}
			}
		`;

		const response = await fetch('https://api.github.com/graphql', {
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${GITHUB_TOKEN}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ query })
		});

		if (!response.ok) {
			throw new Error(`GitHub API responded with status ${response.status}`);
		}

		const data = await response.json();

		if (data.errors) {
			console.error('GraphQL errors:', data.errors);
			throw new Error('GraphQL query failed');
		}

		const contributions = data.data?.user?.contributionsCollection;

		// Use total contributions instead of just commits
		const totalContributions = contributions?.contributionCalendar?.totalContributions || 0;
		const totalCommits = contributions?.totalCommitContributions || 0;

		return json({
			totalCommits: totalCommits,
			totalContributions: totalContributions,
			year: currentYear
		});
	} catch (error) {
		console.error('Failed to fetch GitHub data:', error);
		return json({ error: 'Failed to fetch GitHub data' }, { status: 500 });
	}
};