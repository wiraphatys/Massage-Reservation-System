const Reservation = require("../models/ReservationModel");
const Massage = require("../models/MassageModel")

// @desc    Get all reservations
// @route   GET /api/reservations/
// @access  Private
exports.getReservations = async (req, res, next) => {
    // Define empty query
    let query;

    if (req.user.id === "admin") {
        if (req.params.massageId) {
            query = Reservation.find({ massage: req.params.massageId }).populate({
                path: "massage",
                select: "name address tel"
            })
        } else {
            query = Reservation.find({}).populate({
                path: "massage",
                select: "name address tel"
            })
        }
    } else {
        query = Reservation.find({ user: req.user.id }).populate({
            path: "massage",
            select: "name address tel"
        })
    }
    try {
        const reservations = await query;

        return res.status(200).send({
            success: true,
            data: reservations
        })

    } catch (err) {
        console.log(err);
        return res.status(500).send({
            success: false,
            message: "Cannot find reservation"
        })
    }
}

// @desc    Get single reservation
// @route   GET /api/reservations/:id
// @access  Private
exports.getReservationByID = async (req, res, next) => {
    try {
        const reservation = await Reservation.findById(req.params.id).populate({
            path: "massage",
            select: "name address tel"
        });

        if (reservation.user.toString() !== req.user.id && req.user.role !== "admin") {
            return res.status(401).send({
                success: false,
                message: `This user ID of ${req.user.id} is not authorized to access this reservation`
            })
        }

        if (!reservation) {
            return res.status(404).send({
                success: false,
                message: `Not found reservation ID of ${req.params.id}`
            })
        }

        res.status(200).send({
            success: true,
            data: reservation
        })

    } catch (err) {
        console.log(err.stack)
        return res.status(500).send({
            success: false,
            message: `Cannot find reservation`
        })
    }
}

// @desc    Add a new reservation
// @route   POST /api/:massageId/reservations/
// @access  Private
exports.createReservation = async (req, res, next) => {
    try {
        // create new fields in req.body to prepare the payload for create new preservation
        req.body.massage = req.params.massageId;
        req.body.user = req.user.id;        // ownership validation

        
        const existedReservation = await Reservation.find({ user : req.user.id });

        if (existedReservation.length >= 3 && req.user.role !== "admin") {
            return res.status(400).send({
                success: false,
                message: `The user with ID ${req.user.id} has already made 3 reservations`
            })
        }

        const massage = await Massage.findById(req.params.massageId);

        if (!massage) {
            return res.status(404).send({
                success: false,
                message: `Not found massage ID of ${req.params.massageId}`
            })
        }

        const reservation = await Reservation.create(req.body);
        res.status(201).send({
            success: true,
            data: reservation
        })

    } catch (err) {
        console.log(err.stack)
        return res.status(500).send({
            success: false,
            message: "Cannot create reservation"
        })
    }
}

// @desc    Update a reservation
// @route   PUT /api/reservations/:id
// @access  Private
exports.updateReservation = async (req, res, next) => {
    try {
        let reservation = await Reservation.findById(req.params.id);

        if (!reservation) {
            return res.status(404).send({
                success: true,
                message: `Not found reservation ID of ${req.params.id}`
            })
        }

        if (reservation.user.toString() !== req.user.id && req.user.role !== "admin") {
            return res.status(401).send({
                success: false,
                message: `This user ${req.user.id} is not authorized to update this reservation`
            })
        }

        reservation = await Reservation.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })

        res.status(200).send({
            success: true,
            data: reservation
        })

    } catch (err) {
        console.log(err)
        return res.status(500).send({
            success: true,
            message: "Cannot update reservation"
        })
    }
}

// @desc    Delete a reservation
// @route   DELETE /api/reservations/:id
// @access  Private
exports.deleteReservation = async (req, res, next) => {
    try {
        let reservation = await Reservation.findById(req.params.id);

        if (!reservation) {
            return res.status(404).send({
                success: false,
                message: `Not found reservation ID of ${req.params.id}`
            })
        }

        if (reservation.user.toString() !== req.user.id && req.user.role !== "admin") {
            return res.status(401).send({
                success: false,
                message: `This user ${req.user.id} is not authorized to delete this reservation`
            })
        }

        await reservation.deleteOne();

        res.status(200).send({
            success: true,
            data: {}
        })

    } catch (err) {
        console.log(err);
        return res.status(500).send({
            success: false,
            message: "Cannot delete reservation"
        })
    }
}