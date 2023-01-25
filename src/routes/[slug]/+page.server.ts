import type { PageServerLoad } from './$types';
import prisma from '$root/lib/prisma';

export const load: PageServerLoad = (async ({ params }) => {
	const shortUrl = params.slug;

	try {
		const URL = await prisma.link.findUnique({
			where: {
				shortUrl: shortUrl as string
			}
		});

		if (URL) {
			await prisma.link.update({
				where: {
					shortUrl: shortUrl as string
				},
				data: {
					clicks: {
						increment: 1
					}
				}
			});

			return {
				longURL: URL.longUrl,
				status: 302
			};
		} else {
			return {
				longURL: '/',
				status: 404
			};
		}
	} catch (err) {
		console.error(err);
		return {
			status: 500
		};
	}
}) satisfies PageServerLoad;
