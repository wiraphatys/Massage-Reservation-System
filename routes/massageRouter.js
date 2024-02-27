const express = require("express");
const router = express.Router();
const reservationRouter = require("./reservationRouter");

const {
    getMassages,
    getMassageByID,
    createMassage,
    updateMassage,
    deleteMassage
} = require("../controllers/massageController");

const {
    protect,
    authorize
} = require("../middlewares/authMiddleware");

router.route("/")
    .get(getMassages)
    .post(protect, authorize("admin"), createMassage);

router.route("/:id")
    .get(getMassageByID)
    .put(protect, authorize("admin"), updateMassage)
    .delete(protect, authorize("admin"), deleteMassage);

// re-Routing to reservation router
router.use("/:massageId/reservations", reservationRouter);

module.exports = router;