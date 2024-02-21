import { gql, useMutation, useQuery } from '@apollo/client';
import { useState } from 'react'
import React from 'react';
import { USER, ALLBOOKS } from '../queries';
const RecomGenre = (props) => {
    if (!props.show) {
        return null;
    }
    const userResult = useQuery(USER)
    const result = useQuery(ALLBOOKS)
    if (userResult.loading) {
        return (
            <div>loading....</div>
        )
    }
    if (result.loading) {
        return (
            <div>loading....</div>
        )
    }
    const favGenre = userResult.data.me.favouriteGenre;
    console.log('user', favGenre);
    let books = result.data.allBooks;
    let booksByFavGenre = books.filter(
        (book) => {
            const genres = book.genres.filter(
                (genre) => {
                    return genre == favGenre;
                }
            )
            console.log('genres', genres);
            if (genres.length > 0) {
                return true;
            } else {
                return false;
            }
        }
    )
    console.log('booksByFavGenre', booksByFavGenre);
    return (
        <div>
            <p>books in your favourite genre {favGenre}</p>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>author</th>
                        <th>published</th>
                    </tr>
                    {booksByFavGenre.map((a) => (
                        <tr key={a.title}>
                            <td>{a.title}</td>
                            <td>{a.author.name}</td>
                            <td>{a.published}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}





export default RecomGenre