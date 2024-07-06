import Questions from "../models/questionSchema.js";
import Results from "../models/resultSchema.js";
import questions, { answers } from '../database/data.js'

/** get all questions */
export async function getQuestions(req, res) {
    try {
        const q = await Questions.find();
        res.status(200).json(q);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

/** insert all questions */
export async function insertQuestions(req, res) {
    try {
        await Questions.insertMany({ questions, answers });
        res.status(201).json({ msg: "Data Saved Successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

/** Delete all Questions */
export async function dropQuestions(req, res) {
    try {
        await Questions.deleteMany();
        res.status(200).json({ msg: "Questions Deleted Successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

/** get all results */
export async function getResult(req, res) {
    try {
        const r = await Results.find();
        res.status(200).json(r);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

/** post all results */
export async function storeResult(req, res) {
    try {
        const { username, result, attempts, points, achieved } = req.body;
        if (!username || !result) {
            return res.status(400).json({ error: 'Data Not Provided!' });
        }

        const newResult = new Results({ username, result, attempts, points, achieved });
        await newResult.save();
        res.status(201).json({ msg: "Result Saved Successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

/** delete all results */
export async function dropResult(req, res) {
    try {
        await Results.deleteMany();
        res.status(200).json({ msg: "Results Deleted Successfully!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
