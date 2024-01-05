const { Leave } = require("../models");
const moment = require("moment");

const createCuti = async (req, res) => {
  try {
    console.info(req.method, req.url);

    // Mendapatkan data dari body request
    const { nomorInduk, tanggalCuti, lamaCuti, keterangan } = req.body;

    // Validasi input
    if (!nomorInduk || !tanggalCuti || !lamaCuti || !keterangan) {
      return res.status(400).json({
        status: 400,
        message: "Incomplete input data",
      });
    }

    const expectedFormat = ["nomorInduk", "tanggalCuti", "lamaCuti", "keterangan"];
    const inputFormat = Object.keys(req.body);

    if (!inputFormat.every((key) => expectedFormat.includes(key))) {
      return res.status(400).json({
        status: 400,
        message: "Invalid input format",
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
      message: "Leave entry created successfully",
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
  // Implement update logic
};

const deleteCuti = async (req, res) => {
  // Implement delete logic
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
  // Implement get by ID logic
};

module.exports = {
  createCuti,
  updateCuti,
  deleteCuti,
  getAllCutis,
  getCutiById,
};
