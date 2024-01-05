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
    router.delete("/employee/:nomorInduk", employeeController.deleteEmployee);

    // Cuti Controller
    router.get("/cutis", cutiController.getAllCutis);
    router.get("/cuti/:id", cutiController.getCutiById);
    router.post("/cuti/:nomorInduk", cutiController.createCuti);
    router.put("/cuti/:id", cutiController.updateCuti);
    router.delete("/cuti/:id", cutiController.deleteCuti);

    app.use("/api/", router);
}