const url = import.meta.env.VITE_URL;
import React, { ChangeEvent, useState } from "react";
import profileDefaultImg from "../../../../../../../../images/profile.png";
import { requestHandler } from "../../../../../../../../utils";
import { useSelector } from "react-redux";
import { RootStateInterface } from "../../../../../../../../../redux/slice";

const AvatarUpload: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useSelector(
    (state: { slice: RootStateInterface }) => state.slice
  );
  const [imagePreview, setImagePreview] = useState<string>(
    user?.avatar
      ? `${url}/api/avatar?filename=${user?.avatar}`
      : profileDefaultImg
  );

  const addAvatar = async (formData: FormData, file: File) => {
    await requestHandler("update-user", "PUT", { avatar: formData });

    const reader = new FileReader();
    reader.onload = function (e) {
      if (typeof e.target?.result === "string") {
        setImagePreview(e.target.result);
      }
    };
    setLoading(false);
    reader.readAsDataURL(file);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoading(true);

    const isAvatar = false;

    e.preventDefault();
    const input = e.target;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const formData = new FormData();
      formData.append("file", file);
      if (!isAvatar) {
        addAvatar(formData, file);
      } else {
        addAvatar(formData, file);
      }
    }
  };
  const deleteImage = async () => {
    if (user?.avatar) {
      await requestHandler(`avatar?filename=${user.avatar}`, "DELETE");
    }
  };

  return (
    <div className={"container"}>
      <div className={"avatar-upload"}>
        <div
          className={"avatar-preview"}
          style={{ opacity: loading ? 0.6 : 1 }}
        >
          <img src={imagePreview} className="avatar" />
          <input
            type={"file"}
            id={"imageUpload"}
            accept={".png, .jpg, .jpeg"}
            onChange={handleImageChange}
          />
          <label className={"edit"} htmlFor={"imageUpload"}>
            Edit
          </label>
          <span onClick={deleteImage} className={"delete"}>
            Delete
          </span>
        </div>
      </div>
    </div>
  );
};

export default AvatarUpload;
