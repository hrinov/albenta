const multer = require("multer");
const express = require("express");
const { v4: uuidv4 } = require("uuid");
const controller = require("../controllers/updateUser");
import { Request, Response, NextFunction } from "express";
const { validateToken } = require("../middlewares/validateToken");
const { getStorage, ref, uploadBytes } = require("firebase/storage");
const { initializeFirebase } = require("../utils/initializeFirebase");
import { deleteObject, getDownloadURL } from "firebase/storage";

interface CustomRequest extends Request {
  uploadedFilePath: string;
  user: UserData;
  file: {
    buffer?: Buffer;
    mimetype?: string;
  };
}

const router = express.Router();
const upload = multer();

const handleFileLoading = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req?.file?.buffer || !req?.file?.mimetype) next();

    //initialize Firebase
    const firebaseApp = initializeFirebase();
    const storage = getStorage(firebaseApp);

    const currentAvatarUrl = req?.user?.avatar;

    //delete the previous file
    if (currentAvatarUrl) {
      const currentFileRef = ref(storage, currentAvatarUrl);
      await deleteObject(currentFileRef);
    }

    //create new file ref in Firebase
    const newFileRef = ref(storage, uuidv4());

    //upload new file
    await uploadBytes(newFileRef, req.file.buffer, {
      contentType: req.file.mimetype,
    });

    //get new file link
    const downloadURL = await getDownloadURL(newFileRef);
    req.uploadedFilePath = downloadURL;

    next();
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "error uploading file" });
  }
};

router.use(validateToken);
router.put("/", upload.single("file"), handleFileLoading);
router.use("/", controller.updateUser);

export { router };
