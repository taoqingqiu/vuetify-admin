export const createResponse = (data = null, status = 0, message = '成功!') => ({
  status,
  data,
  message,
});
