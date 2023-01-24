import { resolve } from 'path';
import { json } from '@sveltejs/kit';
import prisma from '$root/lib/prisma';

import 'dotenv';

interface UrlData {
	longUrl: string;
	shortUrl: string;
}

export const POST = async (req, res) => {
	const body = await json(req);
	console.log(body)
	if (!req.body) {
		return res.status(400).json({ error: 'No data in request body' });
	}

	const { longUrl, shortUrl }: UrlData = JSON.parse(req.body);

	try {
		const findUrl = await prisma.link.findUnique({
			where: {
				shortUrl: shortUrl
			}
		});

		if (findUrl) {
			return res
				.status(500)
				.json({ errorMessage: `${process.env.PUBLIC_SITE_URL}${shortUrl} is already taken.` });
		}

		await prisma.link.create({
			data: {
				longUrl,
				shortUrl
			}
		});
	} catch (err) {
		res.status(500);
		resolve();
	}
};
