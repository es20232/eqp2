import React from "react";
import Image from "react-bootstrap/Image";

const ProfileImage = ({ imageURL, altText, size }) => {
    return (
      <Image
        src={imageURL}
        alt={altText}
        roundedCircle
        className="profile-image"
        style={{ width: size, height: size }}
      />
    );
  };

export default ProfileImage;