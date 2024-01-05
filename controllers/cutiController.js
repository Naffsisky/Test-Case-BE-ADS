const { Employee } = require("../models");
const { Leave } = require("../models");
const moment = require("moment");

const createCuti = async (req, res) => {
  try {
    console.info(req.method, req.url);

    // Mendapatkan data dari body request
    const { tanggalCuti, lamaCuti, keterangan } = req.body;

    const { nomorInduk } = req.params;

    // Mengecek apakah karyawan ada atau tidak
    const existingEmployee = await Employee.findOne({
      where: {
        nomorInduk: nomorInduk,
      },
    })

    if (!existingEmployee) {
      return res.status(400).json({
        status: 404,
        message: "Employee not found",
      });
    }

    // Validasi input
    if (!tanggalCuti || !lamaCuti || !keterangan) {
      return res.status(400).json({
        status: 400,
        message: "Incomplete input data",
      });
    }

    // Merubah format tanggal
    const convertedTanggalCuti = moment(tanggalCuti, "DD-MM-YYYY");

    if (!convertedTanggalCuti.isValid()) {
      return res.status(400).json({
        status: 400,
        message: "Invalid date format for tanggalCuti",
      });
    }

    const formattedTanggalCuti = convertedTanggalCuti.format("YYYY-MM-DD");

    // Membuat entri baru dalam tabel Cuti
    const newCuti = await Leave.create({
      nomorInduk,
      tanggalCuti: formattedTanggalCuti,
      lamaCuti,
      keterangan,
    });

    // Mengirimkan respons JSON dengan data Cuti yang baru dibuat
    res.status(201).json({
      status: 201,
      message: "Cuti created successfully",
      data: newCuti,
    });
  } catch (error) {
    console.error("Error creating cuti", error);
    res.status(501).json({
      status: 501,
      message: "Internal Server Error",
    });
  }
};

const updateCuti = async (req, res) => {
  try {
    console.info(req.method, req.url);

    const { id } = req.params;

    const existingCuti = await Leave.findOne({
      where: {
        id: id,
      },
    });

    if (!existingCuti) {
      return res.status(404).json({
        status: 404,
        message: "Cuti not found",
      });
    }

    const { tanggalCuti, lamaCuti, keterangan } = req.body;

    if (!tanggalCuti || !lamaCuti || !keterangan) {
      return res.status(400).json({
        status: 400,
        message: "Incomplete input data",
      });
    }

    if (req.body.nomorInduk && req.body.nomorInduk !== existingCuti.nomorInduk) {
      return res.status(400).json({
        status: 400,
        message: "nomorInduk cannot be updated",
      });
    }

    if (req.body.id && req.body.id !== existingCuti.id) {
      return res.status(400).json({
        status: 400,
        message: "id cannot be updated",
      });
    }

    // Merubah format tanggal
    const convertedTanggalCuti = moment(tanggalCuti, "DD-MM-YYYY");

    const updatedCuti = await existingCuti.update({
      tanggalCuti: convertedTanggalCuti,
      lamaCuti,
      keterangan,
    });

    res.send({
      status: 200,
      message: "Cuti updated successfully",
      data: updatedCuti,
    })

  } catch (error) {
    console.error("Error updating cuti", error);
    res.send({
      status: 501,
      message: "Internal Server Error",
    });

  }
};

const deleteCuti = async (req, res) => {
  try {
    console.info(req.method, req.url);

    const { id } = req.params;

    const existingCuti = await Leave.findOne({
      where: {
        id: id,
      },
    });

    if (!existingCuti) {
      return res.status(404).json({
        status: 404,
        message: "Cuti not found",
      });
    }

    await existingCuti.destroy();

    res.send({
      status: 200,
      message: "Cuti deleted successfully",
    });

  } catch (error) {
    console.error("Error deleting cuti", error);
    res.send({
      status: 501,
      message: "Internal Server Error",
    });
  }
};

const getAllCutis = async (req, res) => {
  try {
    console.info(req.method, req.url);

    let cutis = await Leave.findAll();

    const { sortBy } = req.query;

    if (sortBy) {
      if (sortBy === "tanggalCuti") {
        cutis = cutis.sort((a, b) => new Date(a.tanggalCuti) - new Date(b.tanggalCuti));
      }
    }

    res.send({
      status: 200,
      message: "Get cutis success",
      data: cutis,
    });
  } catch (error) {
    console.error("Error retrieving cuti data:", error);
    res.send({
      status: 501,
      message: "Internal Server Error",
    });
  }
};

const getCutiById = async (req, res) => {
  try {
    console.info(req.method, req.url);

    const { id } = req.params;

    const existingCuti = await Leave.findOne({
      where: {
        id: id,
      },
    });

    if (!existingCuti) {
      return res.status(404).json({
        status: 404,
        message: "Cuti not found",
      });
    }

    res.send({
      status: 200,
      message: "Get cuti success",
      data: existingCuti,
    });

  } catch (error) {
    console.error("Error retrieving cuti data:", error);
    res.send({
      status: 501,
      message: "Internal Server Error",
    })
  }
};

module.exports = {
  createCuti,
  updateCuti,
  deleteCuti,
  getAllCutis,
  getCutiById,
};
