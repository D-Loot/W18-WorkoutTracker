import { ObjectId } from "mongodb";
import client from "./loader.js";
import workoutModel from "./model.js"

const workoutController = client.db("workout_db").collection("workouts");

export default {

    // See '../public/stats.js' line 4 and 19, then
    // See '../public/api.js' line 2, then
    // See './router.js' line....

  index() {
    const workouts = workoutController.aggregate([
    {
      $addFields: {
        totalDuration: { $sum: "$exercises.duration" }
    }
    },]).toArray()
    return workouts;
  },


  //  Create an asynchronous update method which includes an ID and the new exercise info
  async update(id, newExercise) {
    // Find the desired workout by finding through the ID
    const workoutById = await workoutController.findOne({_id:ObjectId(id)});
    //
    const updatedWorkout = workoutModel.createExercise(workoutById,newExercise);

    return workoutController.replaceOne({_id:ObjectId(id)},updatedWorkout);
  },

// const notesCollection = client.db("noteTaker").collection("notes");

// export default {
//   index() {
//     return notesCollection.find({}).toArray();
//   },
//   create(newNote) {
//     return notesCollection.insertOne(newNote);
//   },
//   show(id) {
//     return notesCollection.findOne(ObjectId(id));
//   },
//   delete(id) {
//     return notesCollection.deleteOne({ _id: ObjectId(id) });
//   },
//   deleteAll() {
//     return notesCollection.deleteMany({});
//   },

//   update(id, updatedNote) {
//     return notesCollection.updateOne(
//       { _id: ObjectId(id) },
//       { $set: updatedNote }
//     );
//   },
// };