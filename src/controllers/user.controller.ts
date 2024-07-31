import { Request, Response } from "express";
import { User } from "../models/user.models";
import { validateExcel } from "../utils/validateExcel";
import multer from "multer";
import xlsx from "xlsx";
import { UserData } from "../models/userFile.models";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single("file");

export const createUser = async (req: Request, res: Response) => {
  try {
    const data = req.body;

    const newUser = await User.create(data);

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const uploadExcel = async (req: Request, res: Response) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const workbook = xlsx.read(file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet, { header: 1 });

    const { validRows, invalidRows } = validateExcel(data);
    console.log("validRows, invalidRows ===========>", validRows, invalidRows);

    if (invalidRows.length > 0) {
      return res.status(400).json({ error: "Validation failed", invalidRows });
    }

    try {
      await UserData.insertMany(validRows);
      res.status(200).json({ message: "Data uploaded successfully" });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });
};
