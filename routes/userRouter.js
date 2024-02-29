const express = require("express");
const router = express.Router();

const {
    getUsers,
    getUserByID,
    updateUser,
    deleteUser
} = require('../controllers/userController');

const {
    protect,
    authorize
} = require('../middlewares/authMiddleware');

router.route("/").get(protect, authorize("admin"), getUsers);

router.route("/:id")
    .get(protect, getUserByID)
    .put(protect, updateUser)
    .delete(protect, deleteUser);

module.exports = router;