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