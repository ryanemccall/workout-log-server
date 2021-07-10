const Express = require("express");
const router = Express.Router();
const { Workout } = require('../models');
const validateSession = require('../middleware/validate-session');

// router.get('/practice', (req, res) => {
//     res.send('This is a practice route')
// });

//Log a Workout
router.post("/create", validateSession, async (req, res) => {
    const { description, definition, result } = req.body.workout;
    const { id } = req.user;
    const workoutEntry = {
        description,
        definition,
        result,
        owner_id: id
    }
    try {
        const newWorkout = await Workout.create(workoutEntry);
        res.status(200).json(newWorkout);
    } catch (err) {
        res.status(500).json({ error: err});
    }
});

//Get All Workout Logs for a User
router.get("/", validateSession, async (req, res) => {
    try {
        const entries = await Workout.findAll({
            where: { owner_id: req.user.id },
        });
        res.status(200).json({ entries })
    } catch (err) {
        res.status(500).json({
            error: `Sorry, there was an error: ${err}`
        })
    }
});

// Get Workout by ID for a User
router.get("/:id", validateSession, async (req, res) => {
    try {
        const getEntry = await Workout.findOne({
            where: {
                id: req.params.id,
                owner_id: req.user.id,
            }
        });
        res.status(200).json({ getEntry})
    } catch (err) {
        res.status(500).json({
            error: `Sorry, there was an error: ${err}`
        })
    }
});

// Update an indivudal Log for a USER

router.put("/:id", validateSession, async (req, res) => {
    const { description, definition, result } = req.body.workout;
    const query = {
        where: {
            id: req.params.id,
                owner_id: req.user.id,
        },
    };

    const updateWorkout = {
        description: description,
        definition: definition,
        result: result
    };
    try {
        const update = await Workout.update(updateWorkout, query);
        res.status(200).json({
            message: "Workout log has been updated!",
            update,
        });
    } catch (err) {
        res.status(500).json({
            message: `Update to your workout log failed: ${err}`
        })
    }
})

// Delete an Individual Log for a USER
router.delete("/:id", validateSession, async (req, res) => {
    const owner = req.user.id;
    const workoutId = req.params.id;

    try {
        const query = {
            where: {
                id: workoutId,
                owner_id: owner
            },
    };

    await Workout.destroy(query);
    res.status(200).json({ message:"Workout Entry Removed"})
} catch (err) {
    res.status(500).json({error: err});
}
})

module.exports = router;