const validate = (state)=>{
  const ret = [];
// TODO:
  if(!state.value1){
    ret.push("Value1 is required");
  }
// TODO:
  if (!state.value2){
    ret.push("Value2 is required")
  }
  return ret;
};
const withFullName = (state) =>({
  ...state,
  fullName: `${state.firstName} ${state.LastName}`
});

// TODO:
export default {
  createUser(newUser){
    const errors = validate(newWorkout);
    if (errors.length){
      throw new Error(`User error: ${errors.join(", ")}`);
    }
    return {newWorkout, ...withFullName(newWorkout)};
  }
}