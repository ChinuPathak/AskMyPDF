import {Router} from "express"
import chat from "../controller/chat.js"
import multer from "multer";

const router = Router()

const upload = multer({ storage: multer.memoryStorage() });
router.post("/",upload.single("file"), chat)

export default router