import Tire from "../model/tire.model.js"

export const getTire = async (req, res) => {
    try {
        const tire = await Tire.find();
        res.status(200).json(tire);
    }
    catch (error) {
        console.log("error : ", error);
        res.status(500).json(error);
    }
}