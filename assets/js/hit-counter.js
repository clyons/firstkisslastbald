(function () {
  const script = document.currentScript;
  const endpoint =
    (typeof window !== 'undefined' && window.FKLB_COUNTER_ENDPOINT) ||
    (script && script.dataset.endpoint);

  if (!endpoint) {
    console.warn('Hit counter: no endpoint configured.');
    return;
  }

  const counterElement = document.querySelector('[data-hit-counter]');
  if (!counterElement) {
    return;
  }

  const digitsElement = counterElement.querySelector('[data-hit-counter-digits]');
  if (!digitsElement) {
    console.warn('Hit counter: digits element not found.');
    return;
  }

  const storageKey = counterElement.dataset.storageKey || 'fklb_hit_counter';
  const digitCount = parseInt(counterElement.dataset.digits || '6', 10);

  const padCount = (value) => {
    const stringValue = value.toString();
    return stringValue.padStart(digitCount, '0');
  };

  const renderCount = (value) => {
    digitsElement.textContent = padCount(Math.max(0, value));
  };

  const readFallback = () => {
    try {
      const stored = localStorage.getItem(storageKey);
      return stored ? parseInt(stored, 10) : null;
    } catch (error) {
      console.warn('Hit counter: unable to read fallback value.', error);
      return null;
    }
  };

  const writeFallback = (value) => {
    try {
      localStorage.setItem(storageKey, String(value));
    } catch (error) {
      console.warn('Hit counter: unable to store fallback value.', error);
    }
  };

  const bootstrap = () => {
    const fallbackValue = readFallback();
    if (typeof fallbackValue === 'number' && !Number.isNaN(fallbackValue)) {
      renderCount(fallbackValue);
    } else {
      renderCount(0);
    }
  };

  const updateFromEndpoint = async () => {
    let response;

    try {
      response = await fetch(endpoint, {
        method: 'POST',
        cache: 'no-store',
      });
    } catch (networkError) {
      console.warn('Hit counter: unable to reach endpoint.', networkError);
      return;
    }

    if (!response.ok) {
      console.warn('Hit counter: endpoint responded with', response.status);
      return;
    }

    let payload;
    try {
      payload = await response.json();
    } catch (parseError) {
      console.warn('Hit counter: unable to parse response.', parseError);
      return;
    }

    const nextCountCandidate =
      payload && (payload.count ?? payload.value ?? payload.total);
    const nextCount = Number(nextCountCandidate);

    if (Number.isNaN(nextCount)) {
      console.warn('Hit counter: response did not include a numeric count.');
      return;
    }

    renderCount(nextCount);
    writeFallback(nextCount);
  };

  bootstrap();

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateFromEndpoint, { once: true });
  } else {
    updateFromEndpoint();
  }
})();
