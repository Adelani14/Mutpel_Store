import naijaState from "naija-state-local-government";

export const getStates = (req, res) => {
    res.status(200).json({
        success: true,
        states: naijaState.states()
    });
};

export const getLGAs = (req, res) => {
    const { state } = req.params;

    res.status(200).json({
        success: true,
        lgas: naijaState.lgas(state)
    });
};