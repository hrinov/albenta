import { Request, Response } from "express";
import { handleUserActivity } from "../utils/activityLog";
import { initializeFirebase } from "../utils/initializeFirebase";
import { deleteObject, getStorage, ref } from "firebase/storage";
import { updateUser as updateUserQuery } from "../db/queries/userQueries";

interface CustomRequest extends Request {
  useragent: { [key: string]: string };
  user: UserData;
}

const deleteAvatar = async (req: CustomRequest, res: Response) => {
  try {
    // check if the avatar filename is provided in the request
    const filename = req.user?.avatar;
    if (!filename) {
      return res.status(400).send({ message: "Avatar filename not provided" });
    }

    //remove avatar info from user
    await updateUserQuery({
      ...req.user,
      avatar: "",
    });

    //add activity
    try {
      await handleUserActivity(req.useragent, req.user.id!, "update profile");
    } catch (error) {
      console.log(error);
    }

    //initialize Firebase
    const firebaseApp = initializeFirebase();
    const storage = getStorage(firebaseApp);

    //get a reference to the file in Firebase Storage
    const fileRef = ref(storage, filename);

    //delete the file from Firebase Storage
    await deleteObject(fileRef);

    res.status(200).send({ message: "avatar deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: "error deleting avatar" });
  }
};

export { deleteAvatar };
