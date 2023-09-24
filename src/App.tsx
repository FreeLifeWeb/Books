import './styles.css';
import { BookInformation } from './lib/types';
import { useEffect, useState, FC } from 'react';
import Card from './Card';
import { fetchData } from './utils/apiFunction';

const App: FC = () => {
    const [books, setBooks] = useState<BookInformation[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchBooksData = async () => {
            setIsLoading(true);
            try {
                const booksData = await fetchData();
                setBooks(booksData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchBooksData();
    }, []);

    return (
        <div>
            <h1>Мои книги:</h1>
            {isLoading && <div>Загрузка...</div>}
            {!isLoading &&
                books.map((book) => (
                    <Card
                        key={book.id}
                        book={book}
                    />
                ))}
        </div>
    );
};

export default App;
