import {Router} from "express"
import chat from "../controller/chat.js"
import multer from "multer";

const router = Router()

router.post("/" , chat)

export default router
