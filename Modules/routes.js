import * as dao from "./dao.js";
export default function ModuleRoutes(app) {
  const createModule = async (req, res) => {
    const { cid } = req.params;
    const newModule = {...req.body, course: cid};
    const module = await dao.createModule(newModule);
    res.json(module);
  };
  const deleteModule = async (req, res) => {
    const status = await dao.deleteModule(req.params.moduleId);
    res.json(status);
  };
  const findCourseModules = async (req, res) => {
    const { cid } = req.params;
    const { name } = req.query;
    if (name) {
      const modules = await dao.findCourseModulesByPartialName(cid, name);
      res.json(modules);
      return;
    }
    const modules = await dao.findCourseModules(cid);
    res.json(modules);
    return;
  };
  const updateModule = async (req, res) => {
    const { moduleId } = req.params;
    const status = await dao.updateModule(moduleId, req.body);
    res.json(status);
  };
  app.post("/api/courses/:cid/modules", createModule);
  app.get("/api/courses/:cid/modules", findCourseModules);
  app.put("/api/modules/:moduleId", updateModule);
  app.delete("/api/modules/:moduleId", deleteModule);
}