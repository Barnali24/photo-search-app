import React, { useState } from 'react';

const PhotoItem = ({ photo, collections, onAddToCollection }) => {
  const [showCollections, setShowCollections] = useState(false);

  const handleAddClick = () => {
    setShowCollections(true);
  };

  const handleAddToCollection = (collectionId) => {
    onAddToCollection(photo, collectionId);
    setShowCollections(false);
  };

  return (
    <div className="photo-item">
      <img src={photo.urls.small} alt={photo.description} />
      <div className="photo-details">
        <p>By: {photo.user.name}</p>
        <button onClick={handleAddClick}>Add to Collection</button>
        {showCollections && (
          <div className="collection-list">
            {collections.map((collection) => (
              <div
                key={collection.id}
                onClick={() => handleAddToCollection(collection.id)}
              >
                {collection.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoItem;
