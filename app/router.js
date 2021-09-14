import Router from "express";
import workoutController from "./controller.js"
import workoutModel from "./model.js";

const router = new Router();

router.get("/workouts", async (_,res)=>{
  try {
    const workout = await workoutController.index();
    res.json(workout)
  } catch (error) {
    res.status(400).send(error);
  }
});

router.put("/workouts/:id", async (req, res) => {
  try {

      // It is validated in the "update" section of the controller.js
        const updatedWorkout = await workoutController.update(req.params.id, req.body);
        res.status(200).send(updatedWorkout);
    }
    catch (error) {
      res.status(404).json(error.message);
    }
  }
);

router.post("/workouts", async (_, res) => {
  try {
    const newWorkout = await workoutController.create();
    res.status(201).json(newWorkout);
  } catch (error) {
    res.status(400).json(error.message);
    }
});
  }
});

router.post("/workouts", async(req,res)=>{
  try {
    const validatedWorkout = workoutModel.createWorkout(req.body);
    const newWorkout = await workoutController.add(validatedWorkout);
    res.status(201).json(newWorkout);
  } catch (error){
    if(error.message.startsWith("Workout")){
      res.status(400).send(error,message);
    } else {
      res.status(500).send(error.message);
    }
  }
});

export default router;