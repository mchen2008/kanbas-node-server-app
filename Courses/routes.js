import * as dao from "./dao.js";

export default function CourseRoutes(app) {
  
  const createCourse = async (req, res) => {
    const course = await dao.createCourse(req.body);
    res.json(course);
  };
  const deleteCourse = async (req, res) => {
    const status = await dao.deleteCourse(req.params.courseId);
    res.json(status);
  };
  const findAllCourses = async (req, res) => {
    const { name } = req.query;
    if (name) {
      const courses = await dao.findCoursesByPartialName(name);
      res.json(courses);
      return;
    }
    const courses = await dao.findAllCourses();
    res.json(courses);
    return;
  };
  const updateCourse = async (req, res) => {
    const { courseId } = req.params;
    const status = await dao.updateCourse(courseId, req.body);
    res.json(status);
  };


  const findCourseById = async(req, res) => {
    const { courseId } = req.params;
    const course = await dao.findCourseById(courseId)
    res.json(course)
  }


  app.post("/api/courses", createCourse);
  app.get("/api/courses", findAllCourses);
  app.get("/api/courses/:courseId", findCourseById);
  app.put("/api/courses/:courseId", updateCourse);
  app.delete("/api/courses/:courseId", deleteCourse);
}