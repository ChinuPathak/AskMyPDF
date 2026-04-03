import {Router} from "express"
import upload from "../controller/upload.js"
import multer from "multer";

const router = Router()

// here we are using memory storage 
// const upload = multer({ storage: multer.memoryStorage() });
// router.post("/",upload.single("file"), chat)

// now we are using diskstorage 
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const uploadStorage = multer({ storage });

// router.post("/", upload.single("file"), chat);
router.post("/" , uploadStorage.array("files" , 5) , upload)

export default router