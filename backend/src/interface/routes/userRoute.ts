import express from "express";

const router = express.Router();

router.post("/", (req, res) => {
  console.log(req.body);
});
router.post("/login", (req, res) => {
  console.log(req.body);
});

export default router;
