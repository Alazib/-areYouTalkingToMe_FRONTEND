export default function httpErrorHandler(error: Record<string, unknown>) {
  const response = error.response as Record<string, unknown>;

  if (response) {
    const data = response.data as Record<string, unknown>;
    const errorMessage = data.error;

    return errorMessage;
  } else {
    return 'El servidor no responde';
  }
}
