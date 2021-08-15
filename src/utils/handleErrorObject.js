export const handleErrorObject = (errorMsg = "") => {
  if (errorMsg.includes("E11000")) {
    return {
      type: "email",
      message: "This user exist. Choose another email!",
    };
  }
  const errorType = errorMsg.slice(
    errorMsg.indexOf('"'),
    errorMsg.lastIndexOf('"')
  );
  return {
    type: errorType.replace('"', "").replace("\\", ""),
    message: errorMsg,
  };
};  
