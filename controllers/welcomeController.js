exports.welcome = (req, res) => {

    res.send({
        status: 200,
        message: "Welcome to Backend API",
        employee: {
            "Get All Employee": "/api/employees",
            "Get Employee By ID": "/api/employee/:nomorInduk",
            "Get Employee Sort By Tanggal Lahir": "/api/employees?sortBy=tanggalLahir",
            "Create Employee": "/api/employee",
            "Update Employee": "/api/employee/:nomorInduk",
            "Delete Employee": "/api/employee/:id",
        },
        cuti: {
            "Get All Cuti": "/api/cutis",
            "Get Cuti By ID": "/api/cuti/:nomorInduk",
            "Get Cuti Sort By Tanggal Cuti": "/api/cutis?sortBy=tanggalCuti",
            "Create Cuti": "/api/cuti",
            "Update Cuti": "/api/cuti/:nomorInduk",
            "Delete Cuti": "/api/cuti/:id",
        }
    });
}