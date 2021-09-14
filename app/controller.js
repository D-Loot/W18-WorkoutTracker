import { ObjectId } from "mongodb";
import client from "./loader.js";
import workoutModel from "./model.js"

const workoutController = client.db("workout_db").collection("workouts");

export default {
  async add(newWorkout){
    // Find existing workout
    const existingWorkout = await workoutController.findOne({workout: newWorkout.workout});
    if (existingWorkout){
    // If it exists, return an error
      throw Error("Workout already esists");
    }
    // If it doesn't exist, create the workout
    const date = new Date();
    return workoutController.insertOne({
      ...newWorkout,
      workoutCreated: date,
      lastUpdated:date,
    }
  }
}



// Uses the db client from loader.js
// import { ObjectId } from "mongodb";
// import client from "./loader.js";

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