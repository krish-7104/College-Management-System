const adminDetails = require("../../models/Admin/details.model.js")
const uploadOnCloudinary = require("../../utils/cloudinary.js")

const getDetails = async (req, res) => {
    try {
        let user = await adminDetails.find(req.body);
        if (!user) {
            return res
                .status(400)
                .json({ success: false, message: "No Admin Found" });
        }
        const data = {
            success: true,
            message: "Admin Details Found!",
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
        let user = await adminDetails.findOne(req.body);
        if (user) {
            fs.unlinkSync(req.file.path)
            return res.status(400).json({
                success: false,
                message: "Admin With This EmployeeId Already Exists",
            });
        }
        const uploadedProfile = await uploadOnCloudinary(req.file.path, `Admin/`)
        user = await adminDetails.create({ ...req.body, profile: uploadedProfile.url });
        const data = {
            success: true,
            message: "Admin Details Added!",
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
            const uploadedProfile = await uploadOnCloudinary(req.file.path, `Admin/`)
            user = await adminDetails.findByIdAndUpdate(req.params.id, { ...req.body, profile: uploadedProfile.url });
        } else {
            user = await adminDetails.findByIdAndUpdate(req.params.id, req.body);
        }
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "No Admin Found",
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
    try {
        let user = await adminDetails.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "No Admin Found",
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