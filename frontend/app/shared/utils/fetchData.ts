type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface RequestOptions<T = any> {
  method?: HttpMethod; // HTTP method
  headers?: Record<string, string>; // Custom headers
  body?: T; // Payload for POST/PUT/PATCH requests
}

async function fetchData<TResponse = any, TBody = any>(
  url: string,
  options?: RequestOptions<TBody>
): Promise<TResponse> {
  try {
    const { method = 'GET', headers = {}, body } = options || {};
    
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Error: ${response.status} - ${error.message || 'Unknown error'}`);
    }

    // Return parsed JSON data
    return (await response.json()) as TResponse;
  } catch (error: any) {
    console.error('API request failed:', error.message);
    throw error; // Re-throw for further handling
  }
}
