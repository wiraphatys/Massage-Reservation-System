const express = require("express");
const router = express.Router({ mergeParams: true }); // Enable params merging

const {
    getReservations,
    getReservationByID,
    createReservation,
    updateReservation,
    deleteReservation
} = require("../controllers/reservationController");

const {
    protect,
    authorize
} = require("../middlewares/authMiddleware");

router.route("/")
    .get(protect, getReservations)
    .post(protect, authorize("user", "admin"), createReservation);

router.route("/:id")
    .get(protect, authorize("user", "admin"), getReservationByID)
    .put(protect, authorize("user", "admin"), updateReservation)
    .delete(protect, authorize("user", "admin"), deleteReservation);

module.exports = router;