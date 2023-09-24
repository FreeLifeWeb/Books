import { getBooks, getUsers, getReviews } from '../lib/api';

export const fetchData = async () => {
    try {
        // Получаем список книг
        const fetchedBooks = await getBooks();

        // Получаем список пользователей
        const fetchedUsers = await getUsers();

        // Получаем список отзывов
        const fetchedReviews = await getReviews();

        // Преобразуем полученные данные о книгах
        const booksWithInfo = fetchedBooks.map((book) => {
            // Находим автора книги
            const author = fetchedUsers.find(
                (user) => user.id === book.authorId
            );

            // Фильтруем отзывы для данной книги
            const bookReviews = fetchedReviews.filter((review) =>
                book.reviewIds.includes(review.id)
            );

            // Получаем информацию об авторах отзывов
            const reviewsWithAuthors = bookReviews.map((review) => {
                const reviewAuthor = fetchedUsers.find(
                    (user) => user.id === review.userId
                );

                return {
                    ...review,
                    user: reviewAuthor || {
                        id: '',
                        name: 'Unknown User',
                    },
                };
            });

            return {
                // Возвращаем информацию о книгах с дополнительными данными
                id: book.id,
                name: book.name || 'Книга без названия',
                author: author || { id: '', name: 'Unknown Author' },
                reviews: reviewsWithAuthors,
                description: book.description,
            };
        });
        return booksWithInfo;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};
