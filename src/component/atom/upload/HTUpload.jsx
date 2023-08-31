import React from 'react';

import './HTUpload.scss';

const HTUpload = ({
  image,
  name,
  onChange,
  onClose,
}) => (
  <div>
    {image ? (
      <div className="upload">
        <div className="upload-image">
          <img src={image} alt="" width={50} height={100} accept=".svg" />
        </div>
        <div className="upload-btn">
          <button
            type="button"
            onClick={onClose}
            style={{ display: name.length > 0 ? 'block' : 'none' }}
          >
            Supprimer
          </button>
        </div>
      </div>
    ) : (
      <div className="upload__form">
        <input
          id="fileupload"
          className="hidden"
          type="file"
          onChange={onChange}
        />
      </div>
    )}
  </div>
);

export default HTUpload;
