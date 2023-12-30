const studentDetails = require("../../models/Students/details.model.js")
const uploadOnAWS = require("../../utils/awss3upload.js")

const getDetails = async (req, res) => {
    try {
        let user = await studentDetails.find(req.body);
        if (!user) {
            return res
                .status(400)
                .json({ success: false, message: "No Student Found" });
        }
        const data = {
            success: true,
            message: "Student Details Found!",
            user,
        };
        res.json(data);
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const addDetails = async (req, res) => {
    try {
        let user = await studentDetails.findOne({
            enrollmentNo: req.body.enrollmentNo,
        });
        if (user) {
            return res.status(400).json({
                success: false,
                message: "Student With This Enrollment Already Exists",
            });
        }
        const uploadedProfile = await uploadOnAWS(req.file, `Student/${req.body.branch}/${req.body.enrollmentNo}`)
        user = await studentDetails.create({ ...req.body, profile: uploadedProfile });
        const data = {
            success: true,
            message: "Student Details Added!",
            user,
        };
        res.json(data);
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}


const updateDetails = async (req, res) => {
    try {
        let user;
        if (req.file) {
            const uploadedProfile = await uploadOnAWS(req.file, `Student/${req.body.branch}/`)
            user = await studentDetails.findByIdAndUpdate(req.params.id, { ...req.body, profile: uploadedProfile });
        } else {
            user = await studentDetails.findByIdAndUpdate(req.params.id, req.body);
        }
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "No Student Found",
            });
        }
        const data = {
            success: true,
            message: "Updated Successfull!",
        };
        res.json(data);
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const deleteDetails = async (req, res) => {
    let { id } = req.body;
    try {
        let user = await studentDetails.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "No Student Found",
            });
        }
        const data = {
            success: true,
            message: "Deleted Successfull!",
        };
        res.json(data);
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const getCount = async (req, res) => {
    try {
        let user = await studentDetails.count(req.body);
        const data = {
            success: true,
            message: "Count Successfull!",
            user,
        };
        res.json(data);
    } catch (error) {
        res
            .status(500)
            .json({ success: false, message: "Internal Server Error", error });
    }
}

module.exports = { getDetails, addDetails, updateDetails, deleteDetails, getCount }