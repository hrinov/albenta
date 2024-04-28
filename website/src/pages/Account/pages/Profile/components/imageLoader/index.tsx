const url = import.meta.env.VITE_SERVER_URL;
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import profileDefaultImg from "../../../../../../images/profile.png";
import { fetchUser, requestHandler } from "../../../../../../utils";
import React, { ChangeEvent, Dispatch, useEffect, useState } from "react";

const AvatarUpload: React.FC = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const { user } = useSelector(
    (state: { slice: RootStateInterface }) => state.slice
  );

  const [loading, setLoading] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string>();

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

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    e.preventDefault();
    const input = e.target;

    if (input.files && input.files[0]) {
      const file = input.files[0];

      if (file.size > 1000000) {
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append("file", file);
      await addAvatar(formData, file);
    }

    dispatch(fetchUser());
    setLoading(false);
  };

  const handleRemoveAvatar = async () => {
    if (!user?.avatar) return;
    setLoading(true);

    await requestHandler(`avatar?filename=${user.avatar}`, "DELETE");
    setImagePreview(profileDefaultImg);

    dispatch(fetchUser());
    setLoading(false);
  };

  useEffect(() => {
    setImagePreview(user?.avatar ? user.avatar : profileDefaultImg);
  }, [user]);

  return (
    <div className={"avatar-upload-container"}>
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

          <div className="options">
            <label className={"edit"} htmlFor={"imageUpload"}>
              Edit
            </label>
            {user?.avatar && (
              <span onClick={handleRemoveAvatar} className={"delete"}>
                Delete
              </span>
            )}
          </div>
        </div>
      </div>
      <p>
        Max size:
        <span>1 mb</span>
      </p>
    </div>
  );
};

export default AvatarUpload;
