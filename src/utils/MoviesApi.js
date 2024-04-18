import { MOVIES_API_BASE_URL } from './constants';

async function request(url) {
  try {
    const response = await fetch(`${MOVIES_API_BASE_URL}${url}`);
    if (!response.ok) {
      throw new Error('Ошибка при выполнении запроса. Пожалуйста, проверьте соединение и доступность сервера.');
    }
    return await response.json();
  } catch (error) {
    console.error("Ошибка запроса:", error);
    throw error;
  }
}

export function moviesApi() {
  return request('/beatfilm-movies');
}

