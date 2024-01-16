const url = import.meta.env.VITE_URL;
import React, { ChangeEvent, useEffect, useState } from "react";
import profileDefaultImg from "../../../../../../../../images/profile.png";
import { requestHandler } from "../../../../../../../../utils";
import { useSelector } from "react-redux";
import {
  RootStateInterface,
  updateUser,
} from "../../../../../../../../../redux/slice";
import { useDispatch } from "react-redux";
import { MeResponse } from "../../../../../../../../../types";

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
  const dispatch = useDispatch();

  const handleUserUpdate = async () => {
    const response: MeResponse = await requestHandler("me", "GET");
    if (response?.success) {
      const { avatar, id, email, name, balance } = response?.data!;
      dispatch(
        updateUser({
          id,
          email,
          name,
          balance,
          avatar,
        })
      );
    }
  };

  const addAvatar = async (formData: FormData, file: File) => {
    await requestHandler("update-user", "PUT", { avatar: formData });
    const reader = new FileReader();
    reader.onload = function (e) {
      if (typeof e.target?.result === "string") {
        setImagePreview(e.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const deleteImage = async () => {
    if (user?.avatar) {
      await requestHandler(`avatar?filename=${user.avatar}`, "DELETE");
      setImagePreview(profileDefaultImg);
    }
  };

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    const isAvatar = false;
    e.preventDefault();
    const input = e.target;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const formData = new FormData();
      formData.append("file", file);
      if (!isAvatar) {
        await addAvatar(formData, file);
      } else {
        await deleteImage();
        addAvatar(formData, file);
      }
    }
    await handleUserUpdate();
    setLoading(false);
  };

  const handleRemoveAvatar = async () => {
    setLoading(true);
    await deleteImage();
    await handleUserUpdate();
    setLoading(false);
  };

  useEffect(() => {}, [user]);

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
          <span onClick={handleRemoveAvatar} className={"delete"}>
            Delete
          </span>
        </div>
      </div>
    </div>
  );
};

export default AvatarUpload;
