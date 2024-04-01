export default defineEventHandler(async (event) => {
  const { page = 1, ids } = getQuery(event);
  return await $fetch(
    `https://gutendex.com/books?mime_type=image&ids=${ids}&page=${page}`
  );
});
