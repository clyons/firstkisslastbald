export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);

    if (pathname !== '/' && pathname !== '/api/hit') {
      return withCors(
        new Response(JSON.stringify({ error: 'Not found' }), {
          status: 404,
          headers: jsonHeaders(),
        })
      );
    }

    if (request.method === 'OPTIONS') {
      return handleOptions();
    }

    if (request.method !== 'POST' && request.method !== 'GET') {
      return withCors(
        new Response(JSON.stringify({ error: 'Method not allowed' }), {
          status: 405,
          headers: jsonHeaders(),
        })
      );
    }

    const key = 'fklb:global-hit-count';

    let currentValue = await env.HIT_COUNTER.get(key);
    if (currentValue === null) {
      currentValue = '0';
    }

    let numericValue = Number(currentValue);
    if (Number.isNaN(numericValue)) {
      numericValue = 0;
    }

    if (request.method === 'POST') {
      numericValue += 1;
      await env.HIT_COUNTER.put(key, String(numericValue));
    }

    return withCors(
      new Response(JSON.stringify({ count: numericValue }), {
        headers: jsonHeaders(),
      })
    );
  },
};

function handleOptions() {
  return withCors(
    new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Max-Age': '86400',
      },
    })
  );
}

function withCors(response) {
  const headers = response.headers;
  headers.set('Access-Control-Allow-Origin', '*');
  headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  headers.set('Access-Control-Allow-Headers', 'Content-Type');
  headers.set('Cache-Control', 'no-store');

  return response;
}

function jsonHeaders() {
  return new Headers({ 'content-type': 'application/json' });
}
