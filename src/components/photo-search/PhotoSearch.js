import React, { useState } from 'react';
import axios from 'axios';
import PhotoItem from './PhotoItem';

const PhotoSearch = ({collections, onAddToCollection}) => {
  const [query, setQuery] = useState('');
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
    
      const response = await axios.get(`https://api.unsplash.com/search/photos`, {
        params: { query },
        headers: {
          Authorization: 'Client-ID kDLlv3aLKWD-TDn55aYnnY4QZWd4_5wQDfHFpg-Tjbk'
        }
      });
      setPhotos(response.data.results);
    } catch (err) {
      setError('Failed to fetch photos. Please try again later.');
    }
    setLoading(false);
  };

  return (
    <div>
    <div className='form-container'>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for photos..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </div>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <div className="photo-grid">
        {photos.map((photo) => (
          <PhotoItem
          key={photo.id}
          photo={photo}
          collections={collections}
          onAddToCollection={onAddToCollection}
        />
        ))}
      </div>
    </div>
    
  );
};

export default PhotoSearch;
