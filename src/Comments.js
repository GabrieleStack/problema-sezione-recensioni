import React, { useEffect, useState } from "react";
import './App.css';

export default function Comments() {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState({ text: '', valutation: '' });

    useEffect(() => {
        fetch(`http://localhost:5001/api/comments`)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Errore nel fetch delle recensioni');
                }
                return res.json();
            })
            .then(data => {
                setComments(data);
            })
            .catch(err => {
                console.error('Errore nel fetch delle recensioni', err);
            });
    }, []);

    const postComment = (e) => {
        e.preventDefault();
        fetch('http://localhost:5001/api/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newComment)
        })
            .then(res => res.json())
            .then(data => {
                setComments([...comments, data]);
                setNewComment({ text: '', valutation: '' });
            })
            .catch(err => {
                console.error('Errore nel post della recensione', err);
            });
    };

    return (
        <div>
            <h1>PAGINA RECENSIONI</h1>
            <form onSubmit={postComment}>
                <input type="text" value={newComment.text} onChange={(e) => setNewComment({ ...newComment, text: e.target.value })} required />
                <input type="text" value={newComment.valutation} onChange={(e) => setNewComment({ ...newComment, valutation: e.target.value })} required />
                <button type="submit">Aggiungi</button>
            </form>

            <div>
                <ul>
                    {comments && comments.length > 0 ? (
                        comments.map((com) => (
                            <li key={com._id}>
                                <h5>{com.text}</h5>
                                <h5>{com.valutation}</h5>
                            </li>
                        ))
                    ) : (
                        <p>Nessuna recensione trovata.</p>
                    )}
                </ul>
            </div>
        </div>
    );
}


