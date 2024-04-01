export default defineEventHandler(async (event) => {
  const { page = 1, genre = "", search = "" } = getQuery(event);
  return await $fetch(
    `https://gutendex.com/books?mime_type=image&page=${page}&search=${search}&topic=${genre}`
  );
});
