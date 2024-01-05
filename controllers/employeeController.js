const { Employee } = require("../models");
const { Leave } = require("../models");
const moment = require("moment");

const createEmployee = async (req, res) => {
  try {
    console.info(req.method, req.url);

    // Mendapatkan data dari body request
    const { nomorInduk, nama, alamat, tanggalLahir, tanggalBergabung } = req.body;

    // Validasi input
    if (!nomorInduk || !nama || !alamat || !tanggalLahir || !tanggalBergabung) {
      return res.status(400).json({
        status: 400,
        message: "Incomplete input data",
      });
    }

    const existingEmployee = await Employee.findOne({
      where: {
        nomorInduk,
      },
    });

    if (existingEmployee) {
      return res.send({
        status: 400,
        message: "Employee already exists",
      });
    }

    // Merubah format tanggal
    const convertedTanggalLahir = moment(tanggalLahir, "DD-MM-YYYY").format("YYYY-MM-DD");
    const convertedTanggalBergabung = moment(tanggalBergabung, "DD-MM-YYYY").format("YYYY-MM-DD");

    // Membuat entri baru dalam tabel Karyawan
    const newEmployee = await Employee.create({
      nomorInduk,
      nama,
      alamat,
      tanggalLahir: convertedTanggalLahir,
      tanggalBergabung: convertedTanggalBergabung,
    });

    // Mengirimkan respons JSON dengan data Karyawan yang baru dibuat
    res.send({
      status: 201,
      message: "Employee created successfully",
      data: newEmployee,
    });
  } catch (error) {
    console.error("Error creating employee", error);
    res.send({
      status: 501,
      message: "Internal Server Error",
    });
  }
};

const updateEmployee = async (req, res) => {
  try {
    console.info(req.method, req.url);

    const { nomorInduk } = req.params;

    // Mengecek apakah karyawan dengan nomorInduk tersebut ada
    const existingEmployee = await Employee.findOne({
      where: {
        nomorInduk: nomorInduk,
      },
    });

    if (!existingEmployee) {
      return res.status(404).json({
        status: 404,
        message: "Employee not found",
      });
    }

    // Mendapatkan data yang akan diupdate dari body request
    const { nama, alamat, tanggalLahir, tanggalBergabung } = req.body;

    // Validasi input
    if (!nama || !alamat || !tanggalLahir || !tanggalBergabung) {
      return res.status(400).json({
        status: 400,
        message: "Incomplete input data",
      });
    }

    // Nomor induk tidak bisa diubah
    if (req.body.nomorInduk && req.body.nomorInduk !== nomorInduk) {
      return res.status(400).json({
        status: 400,
        message: "nomorInduk cannot be updated",
      });
    }

    // Mengonversi format tanggal jika diperlukan
    const convertedTanggalLahir = moment(tanggalLahir, "DD-MM-YYYY").format("YYYY-MM-DD");
    const convertedTanggalBergabung = moment(tanggalBergabung, "DD-MM-YYYY").format("YYYY-MM-DD");

    // Melakukan pembaruan data karyawan
    const updatedEmployee = await existingEmployee.update({
      nama,
      alamat,
      tanggalLahir: convertedTanggalLahir,
      tanggalBergabung: convertedTanggalBergabung,
    });

    // Mengirimkan respons JSON dengan data karyawan yang telah diupdate
    res.status(200).json({
      status: 200,
      message: "Employee updated successfully",
      data: updatedEmployee,
    });
  } catch (error) {
    console.error("Error updating employee", error);
    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    console.info(req.method, req.url);

    const { nomorInduk } = req.params;

    // Mengecek apakah karyawan dengan nomor induk tersebut ada
    const existingEmployee = await Employee.findOne({
      where: {
        nomorInduk: nomorInduk,
      },
    });

    if (!existingEmployee) {
      return res.status(404).json({
        status: 404,
        message: "Employee not found",
      });
    }

    // Menghapus data cuti berdasarkan nomor induk karyawan
    await Leave.destroy({
      where: {
        nomorInduk: nomorInduk,
      },
    });

    // Melakukan penghapusan data karyawan
    await existingEmployee.destroy();

    // Mengirimkan respons JSON dengan pesan sukses
    res.status(200).json({
      status: 200,
      message: "Employee deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting employee", error);
    res.status(500).json({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

const getAllEmployees = async (req, res) => {
  try {
    console.info(req.method, req.url);

    // Sequelize untuk mengambil semua data karyawan
    let employees = await Employee.findAll();

    // Sorting berdasarkan tanggal lahir atau nama karyawan
    const { sortBy } = req.query;
    if (sortBy) {
      if (sortBy === "tanggalLahir") {
        employees = employees.sort((a, b) => new Date(a.tanggalLahir) - new Date(b.tanggalLahir));
      } else if (sortBy === "nama") {
        employees = employees.sort((a, b) => a.nama.localeCompare(b.nama));
      }
    }

    res.send({
      status: 200,
      message: "Get employees success",
      data: employees,
    });
  } catch (error) {
    console.error("Error retrieving employee data:", error);
    res.send({
      status: 501,
      message: "Internal Server Error",
    });
  }
};

const getEmployeeById = async (req, res) => {
  try {
    console.info(req.method, req.url);
    const { nomorInduk } = req.params;

    // Mengambil data karyawan berdasarkan nomor induk
    const employee = await Employee.findOne({
      where: {
        nomorInduk: nomorInduk,
      },
      include: {
        model: Leave,
        as: "leaves",
      },
    });

    if (!employee) {
      res.send({
        status: 404,
        message: "Employee not found",
      });
    } else {
      // Mengambil data cuti karyawan
      const leavesData = employee.leaves.map((leave) => ({
        id: leave.id,
        tanggalCuti: leave.tanggalCuti,
        lamaCuti: leave.lamaCuti,
        keterangan: leave.keterangan,
      }));
      res.send({
        status: 200,
        message: "Get employee success",
        data: {
          id: employee.id,
          nomorInduk: employee.nomorInduk,
          nama: employee.nama,
          alamat: employee.alamat,
          tanggalLahir: employee.tanggalLahir,
          tanggalBergabung: employee.tanggalBergabung,
          createdAt: employee.createdAt,
          updatedAt: employee.updatedAt,
          cutis: leavesData,
        },
      });
    }
  } catch (error) {
    console.error("Error retrieving employee data:", error);
    res.send({
      status: 501,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getAllEmployees,
  getEmployeeById,
};
