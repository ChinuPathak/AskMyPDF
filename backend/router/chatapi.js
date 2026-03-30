import {Router} from "express"
import chat from "../controller/chat.js"
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

const upload = multer({ storage });

// router.post("/", upload.single("file"), chat);
router.post("/" , upload.array("files" , 5) , chat)

export default router