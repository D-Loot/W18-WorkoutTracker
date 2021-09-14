const validate = (state)=>{
  const ret = [];
  if(state.type==="cardio"){
    if(!state.distance){
      ret.push("Exercise distance is required");
    }
  } else if(state.type==="resistance") {
    if(!state.sets){
      ret.push("Exercise sets are required");
    }
    if(!state.reps){
      ret.push("Exercise reps is required");
    }
    if(!state.weight){
      ret.push("Exercise weight is required");
    }
  } else {
    if (!state.type){
      ret.push("Exercise type is required");
    }
  }

  if (!state.name){
    ret.push("Exercise name is required")
  }
  if (!state.duration){
    ret.push("Exercise duration is required")
  }
  return ret;
};

const validateNum = (state)=>({
  ...state,
  distance: Number(state.distance),
  sets: Number(state.sets),
  reps: Number(state.reps),
  weight: Number(state.weight),
});

export default {
  createExercise(workout, newExercise){
    const errors = validate(newExercise);
    if (errors.length){
      throw new Error(`User error: ${errors.join(", ")}`);
    }
    return {
      ...workout,
      exercises:[
        ...workout.exercises,
        {...newExercise, ...validateNum(newExercise)},
      ],
    }
  }
};