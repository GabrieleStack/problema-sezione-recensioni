import React, { useEffect, useState } from 'react';
import './App.css'
import {useNavigate} from 'react-router-dom'

export default function Test() {
  const [user, setUser] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'user' });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5;
  const navigate = useNavigate()
  

  useEffect(() => {
    fetch(`http://localhost:5001/api/users?page=${currentPage}&limit=${limit}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then(data => {
        setUser(data.users);
        setTotalPages(data.totalPages);
      })
      .catch(err => {
        console.error(err);
      });
  }, [currentPage]);

  const postUser = (e) => {
    e.preventDefault();
    fetch('http://localhost:5001/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })
      .then(res => res.json())
      .then(data => {
        setUser([...user, data]);
        setNewUser({ name: '', email: '', role: 'user' });
      })
      .catch(err => console.error('Errore nel post', err));
  };

  const deleteUser = (_id) => {
    fetch(`http://localhost:5001/api/users/${_id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setUser(user.filter(u => u._id !== _id));
      })
      .catch(err => {
        console.error('Errore nell\'eliminazione', err);
      });
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const navigateToReviews = (_id) => {
    navigate(`/users/${_id}/comments`)
  }

  return (
    <div className='tutto'>
      <div className='contenuto'>
        <ul>
          {user && user.length > 0 ? (
            user.map((us) => (
              <li key={us._id}>
                <h5>{us.name} <button onClick={() => deleteUser(us._id)}>elimina</button></h5>
                <h5>{us.email}</h5>
                <h5>{us.role}</h5>
                <button onClick={() => navigateToReviews(us._id)}>Recensioni</button>
              </li>
            ))
          ) : (
            <p>Nessun utente trovato.</p>
          )}
        </ul> 

        <form onSubmit={postUser}>
          <input type='text' value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} required />
          <input type='text' value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} required />
          <select value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })} required>
            <option value='user'>User</option>
            <option value='admin'>Admin</option>
          </select>
          <button type='submit'>clicca</button>
        </form>
      </div>
      <div className='pagination'>
          <button onClick={handlePreviousPage} disabled={currentPage === 1}>Precedente</button>
          <span>Pagina {currentPage} di {totalPages}</span>
          <button onClick={handleNextPage} disabled={currentPage === totalPages}>Successivo</button>
        </div>
    </div>
  );
}




