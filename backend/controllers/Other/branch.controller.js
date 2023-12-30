const Branch = require("../../models/Other/branch.model");

const getBranch = async (req, res) => {
    try {
        let branches = await Branch.find();

        const data = {
            success: true,
            message: "All Branches Loaded!",
            branches,
        };
        res.json(data);
    } catch (error) {
        console.error(error.message);
        console.log(error)
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }

}

const addBranch = async (req, res) => {
    let { name } = req.body;
    try {
        let branch = await Branch.findOne({ name });
        if (branch) {
            const data = {
                success: false,
                message: "Already Exists!",
            };
            res.status(400).json(data);
        } else {
            await Branch.create(req.body);
            const data = {
                success: true,
                message: "Branch Added!",
            };
            res.json(data);
        }
    } catch (error) {
        console.error(error.message);
        console.log(error)
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const deleteBranch = async (req, res) => {
    try {
        let mark = await Branch.findByIdAndDelete(req.params.id);
        if (!mark) {
            return res
                .status(400)
                .json({ success: false, message: "No Branch Data Exists!" });
        }
        const data = {
            success: true,
            message: "Branch Deleted!",
        };
        res.json(data);
    } catch (error) {
        console.error(error.message);
        console.log(error)
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

module.exports = { getBranch, addBranch, deleteBranch }