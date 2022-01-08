import { Router } from "express";
import { currentUser } from "sgticketsbekeeeee";

const router = Router();

router.get("/api/users/currentuser", currentUser, (req, res) => {
  // console.log("here currentuser route")
  res.send({ currentUser: req.currentUser || null });
});
export { router as currentUserRouter };
