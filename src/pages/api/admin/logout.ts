import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ cookies }) => {
  cookies.delete('admin_session', { path: '/admin' });

  return new Response(null, {
    status: 302,
    headers: { Location: '/admin/login' },
  });
};
