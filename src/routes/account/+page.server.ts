import { fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { auth } from '$lib/server/auth';
import { APIError } from 'better-auth/api';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		throw redirect(303, '/login');
	}

	return {
		user: locals.user
	};
};

export const actions: Actions = {
	updateProfile: async ({ request, locals }) => {
		if (!locals.user) {
			throw redirect(303, '/login');
		}

		const formData = await request.formData();
		const name = String(formData.get('name') ?? '').trim();

		await auth.api.updateUser({
			headers: request.headers,
			body: {
				name
			}
		});

		throw redirect(303, '/account');
	},
	changeEmail: async ({ request, locals }) => {
		if (!locals.user) {
			throw redirect(303, '/login');
		}

		const formData = await request.formData();
		const newEmail = String(formData.get('newEmail') ?? '').trim();

		await auth.api.changeEmail({
			headers: request.headers,
			body: {
				newEmail,
				callbackURL: '/account'
			}
		});

		throw redirect(303, '/account');
	},
	changePassword: async ({ request, locals }) => {
		if (!locals.user) {
			throw redirect(303, '/login');
		}

		const formData = await request.formData();
		const currentPassword = String(formData.get('currentPassword') ?? '');
		const newPassword = String(formData.get('newPassword') ?? '');

		try {
			await auth.api.changePassword({
				headers: request.headers,
				body: {
					currentPassword,
					newPassword,
					revokeOtherSessions: true
				}
			});
		} catch (error) {
			if (error instanceof APIError) {
				return fail(400, { message: error.message || 'Password change failed' });
			}

			return fail(500, { message: 'Unexpected error' });
		}

		throw redirect(303, '/account');
	},
	signOut: async ({ request }) => {
		await auth.api.signOut({
			headers: request.headers
		});

		throw redirect(303, '/login');
	}
};