// ProfileImage.jsx
import React, { useRef } from "react";
import Image from "react-bootstrap/Image";
import PropTypes from 'prop-types';

const ProfileImage = ({ imageURL, altText, size, onImageChange }) => {
  const inputRef = useRef(null);

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    onImageChange(file);
  };

  return (
    <>
      <Image
        src={imageURL}
        alt={altText}
        roundedCircle
        className="profile-image"
        style={{ width: size, height: size, cursor: "pointer" }}
        onClick={handleClick}
      />
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        ref={inputRef}
        onChange={handleChange}
      />
    </>
  );
};

ProfileImage.propTypes = {
  imageURL: PropTypes.string.isRequired,
  altText: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  onImageChange: PropTypes.func.isRequired,
};

export default ProfileImage;
