#!/usr/bin/env node

const configuredBaseUrl = process.env.TEST_API_BASE_URL;

if (!configuredBaseUrl) {
  console.log('[mobile->api] Skipped: set TEST_API_BASE_URL to run contract checks');
  process.exit(0);
}

const baseUrl = configuredBaseUrl.replace(/\/$/, '');

const assert = (condition, message) => {
  if (!condition) {
    throw new Error(message);
  }
};

const log = (message) => console.log(`[mobile->api] ${message}`);

const getJson = async (path, init) => {
  const response = await fetch(`${baseUrl}${path}`, init);
  const text = await response.text();
  let json;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    throw new Error(`Expected JSON from ${path}, got: ${text.slice(0, 200)}`);
  }

  return { response, json };
};

(async () => {
  log(`Checking API contract against ${baseUrl}`);

  const health = await getJson('/health');
  assert(health.response.ok, `Health check failed with ${health.response.status}`);
  assert(health.json?.status === 'ok', 'Health payload must include status=ok');

  const dishes = await getJson('/dishes?archived=all');
  assert(dishes.response.ok, `/dishes failed with ${dishes.response.status}`);
  assert(Array.isArray(dishes.json), '/dishes must return an array');

  const password = `ContractPass123!${Date.now()}`;
  const auth = await getJson('/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: `contract-${Date.now()}@randomeal.app`,
      password,
    }),
  });
  assert(auth.response.ok, `/auth/register failed with ${auth.response.status}`);
  assert(typeof auth.json?.token === 'string', 'auth response must include token');

  const random = await getJson('/random/next', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth.json.token}`,
    },
    body: JSON.stringify({
      cooldownClicks: 4,
      dishType: 'vegan',
    }),
  });

  const randomOk = random.response.status === 201;
  const noDishes = random.response.status === 404 && random.json?.message === 'No dishes available';

  assert(
    randomOk || noDishes,
    `/random/next must return 201 or 404 "No dishes available", got ${random.response.status}`,
  );

  if (randomOk) {
    assert(random.json?.dish?.id, 'random response must include dish.id');
    assert(typeof random.json?.dish?.name === 'string', 'random response must include dish.name');
    assert(
      ['usual', 'vegetarian', 'vegan'].includes(random.json?.dish?.dishType),
      'random response has invalid dishType',
    );
  }

  const logout = await getJson('/auth/logout', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${auth.json.token}`,
    },
  });
  assert(logout.response.ok, `/auth/logout failed with ${logout.response.status}`);

  log('Contract checks passed');
})().catch((error) => {
  console.error(`[mobile->api] FAILED: ${error.message}`);
  process.exit(1);
});
