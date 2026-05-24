const GET = ({ cookies }) => {
  cookies.delete("admin_session", { path: "/admin" });
  return new Response(null, {
    status: 302,
    headers: { Location: "/admin/login" }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
