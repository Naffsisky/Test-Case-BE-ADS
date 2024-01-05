module.exports = (app) => {
    const welcomeController = require("../controllers/welcomeController.js");
    const employeeController = require("../controllers/employeeController.js");
    const cutiController = require("../controllers/cutiController.js");

    const router = require("express").Router();

    // Welcome Controller
    router.get("/", welcomeController.welcome);

    // Employee Controller
    router.get("/employees", employeeController.getAllEmployees);
    router.get("/employee/:nomorInduk", employeeController.getEmployeeById);
    router.post("/employee", employeeController.createEmployee);
    router.put("/employee/:nomorInduk", employeeController.updateEmployee);
    router.delete("/employee/:id", employeeController.deleteEmployee);

    // Cuti Controller
    router.get("/cutis", cutiController.getAllCutis);
    router.post("/cuti", cutiController.createCuti);

    app.use("/api/", router);
}