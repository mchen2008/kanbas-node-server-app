import db from "../Database/index.js";
export default function AssignmentsRoutes(app) {
  
  //create a new Assignment
  app.post("/api/courses/:cid/Assignments", (req, res) => {
    const { cid } = req.params;
    const newAssignment = {
      ...req.body,
      course: cid,
      _id: new Date().getTime().toString(),
    };
    db.assignments.push(newAssignment);
    res.send(newAssignment);
  });

  //SELECT  ASSIGMENTs
  app.get("/api/courses/:cid/Assignments", (req, res) => {
    const { cid } = req.params;
    const Assignment = db.assignments.filter((m) => m.course === cid);
    res.json(Assignment);
  });

    //SELECT a ASSIGMENT
    app.get("/api/Assignments/:aid", (req, res) => {
        const { aid} = req.params;
      
        const Assignment = db.assignments.filter((m) => m._id === aid);
        res.json(Assignment);
      });


  app.delete("/api/Assignments/:mid", (req, res) => {
    const { mid } = req.params;
    db.assignments = db.assignments.filter((m) => m._id !== mid);
    res.sendStatus(200);
  });

//update
  app.put("/api/Assignments/:mid", (req, res) => {
    const { mid } = req.params;
    const AssignmentIndex = db.assignments.findIndex(
      (m) => m._id === mid);
    db.assignments[AssignmentIndex] = {
      ...db.assignments[AssignmentIndex],
      ...req.body
    };
    res.sendStatus(204);
  });

}
