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

router.get("/workouts", async(_,res)=>{
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