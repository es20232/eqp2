// ProfileImage.jsx
import React, { useRef } from "react";
import Image from "react-bootstrap/Image";
import PropTypes from "prop-types";
import { useState } from "react";

const ProfileImage = ({
  imageURL,
  altText,
  size,
  onImageChange,
  allowChange,
}) => {
  const inputRef = useRef(null);
  const [isChangeAllowed, setIsChangeAllowed] = useState(allowChange);

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
        style={{
          width: size,
          height: size,
          cursor: isChangeAllowed ? "pointer" : "default",
        }}
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
  allowChange: PropTypes.bool,
};

ProfileImage.defaultProps = {
  allowChange: true // Por padrão, permitir a mudança
};

export default ProfileImage;
