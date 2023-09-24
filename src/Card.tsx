import { FC } from 'react';
import { BookInformation } from './lib/types';

const Card: FC<{ book: BookInformation }> = ({ book }) => {
    // console.log(book);
    return (
        <div>
            <h3>{book.name}</h3>
            <p>
                <b>Автор</b>:{' '}
                {book.author ? book.author.name : 'Unknown Author'}
            </p>
            <p>
                <b>Описание</b>: {book.description}
            </p>
            <p>
                <b>Отзыв: </b>
                {book.reviews
                    .map(
                        (r) =>
                            `${r.text} (${
                                r.user ? r.user.name : 'Unknown User'
                            })`
                    )
                    .join(', ') || '-'}
            </p>
        </div>
    );
};

export default Card;
