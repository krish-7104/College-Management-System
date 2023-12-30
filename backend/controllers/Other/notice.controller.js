const Notice = require("../../models/Other/notice.model");

const getNotice = async (req, res) => {
    try {
        let notice = await Notice.find(req.body);
        if (notice) {
            res.json({ success: true, message: "Notice Get Successfully", notice });
        } else {
            res.status(404).json({ success: false, message: "No Notice Available!" });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const addNotice = async (req, res) => {
    let { link, description, title, type } = req.body;
    try {
        let notice = await Notice.findOne({ link, description, title, type });
        if (notice) {
            return res
                .status(400)
                .json({ success: false, message: "Notice Already Exists!" });
        }
        await Notice.create({
            link,
            description,
            title,
            type,
        });
        const data = {
            success: true,
            message: "Notice Added Successfully",
        };
        res.json(data);
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const updateNotice = async (req, res) => {
    let { link, description, title, type } = req.body;
    try {
        let notice = await Notice.findByIdAndUpdate(req.params.id, {
            link,
            description,
            title,
            type,
        });
        if (!notice) {
            return res
                .status(400)
                .json({ success: false, message: "No Notice Available!" });
        }
        res.json({
            success: true,
            message: "Notice Updated Successfully",
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const deleteNotice = async (req, res) => {
    try {
        let notice = await Notice.findByIdAndDelete(req.params.id);
        if (!notice) {
            return res
                .status(400)
                .json({ success: false, message: "No Notice Available!" });
        }
        res.json({
            success: true,
            message: "Notice Deleted Successfully",
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

module.exports = { getNotice, addNotice, updateNotice, deleteNotice }