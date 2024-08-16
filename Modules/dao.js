import model from "./model.js";
export const createModule = (module) => {
  delete module._id
  return model.create(module);
}
export const findCourseModules = (cid) => model.find({course: cid});
export const updateModule = (moduleId, module) =>  model.updateOne({ _id: moduleId }, { $set: module });
export const deleteModule = (moduleId) => model.deleteOne({ _id: moduleId });
export const findCourseModulesByPartialName = (cid, partialName) => {
  const regex = new RegExp(partialName, "i"); // 'i' makes it case-insensitive
  return model.find({ name: { $regex: regex }, course: cid});
};