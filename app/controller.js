import { ObjectId } from "mongodb";
import client from "./loader.js";
import workoutModel from "./model.js"

const workoutController = client.db("workout_db").collection("workouts");

export default {

    // See '../public/stats.js' line 4 and 19, then
    // See '../public/api.js' line 2, then
    // See './router.js' line 9
  index() {
    const workouts = workoutController.aggregate([
    {
      $addFields: {
        totalDuration: { $sum: "$exercises.duration" }
      }
    },]).toArray()
    return workouts;
  },

  // See '../public/api.js' line 13, then
  // See './router.js' line 20
  //  Create an asynchronous update method which includes an ID and the new exercise info
  async update(id, newExercise) {
    // Find the desired workout by finding through the ID
    const workoutById = await workoutController.findOne({_id:ObjectId(id)});
    //
    const updatedWorkout = workoutModel.createExercise(workoutById,newExercise);

    return workoutController.replaceOne({_id:ObjectId(id)},updatedWorkout);
  },

  // See '../public/api.js' line 26, then
  // See './router.js' line 31
  create() {
    const date = new Date();
    return workoutController.insertOne(
      {day:date, exercises:[]}
    )
  },

  // See '../public/api.js' line 38, then
  // See '../public/stats.js' line 5 and 19, then
  // See './router.js' line 40
  show(){
    const workouts = workoutController
    .aggregate([
      // Order the elements from most recent IDs to oldest IDs
      {$sort:{_id:-1}},
      // Limit the output to the top 7 most recent entries
      {$limit:7},
      {
        $addFields: {
          totalDuration: { $sum: "$exercises.duration" },
          totalWeight: { $sum: "$exercises.weight" }
        }
      },
      // Sort the most recent IDs from oldest to newest
      {$sort:{_id:1}},
    ]).toArray();
    return workouts;

  }
};