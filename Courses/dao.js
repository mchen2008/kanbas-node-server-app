import model from "./model.js";
export const createCourse = (course) => {
  return model.create(course);
}
export const findAllCourses = () => model.find();
export const updateCourse = (courseId, course) =>  model.updateOne({ _id: courseId }, { $set: course });
export const deleteCourse = (courseId) => model.deleteOne({ _id: courseId });
export const findCoursesByPartialName = (partialName) => {
  const regex = new RegExp(partialName, "i"); // 'i' makes it case-insensitive
  return model.find({ name: { $regex: regex } });
};

export const findCourseById = (courseID) => model.find({_id : courseID});
