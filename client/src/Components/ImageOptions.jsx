import React from 'react';

const ImageOptions = ({ imgURLs, selectedImage, setSelectedImage }) => {
  return (
    <div className="flex justify-center items-center m-4 p-4">
      {imgURLs.map((image, index) => (
        <div key={index} className="m-2 flex justify-center items-center">
          <img
            src={image}
            alt={`Option ${index}`}
            onClick={() => setSelectedImage(image)}
            onMouseOver={() => setSelectedImage(image)}
            className={`cursor-pointer ${selectedImage === image ? 'border-2 border-coral-red rounded-lg' : ''}`}
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </div>
      ))}
    </div>
  );
};

export default ImageOptions;
