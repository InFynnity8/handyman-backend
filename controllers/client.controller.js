import Client from "../models/client.model.js";

const registerClient = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        if (!email || !password) {
            return res.status(400).json({ message: 'Enter details' });
        }

        const client = await Client.create({
            username,
            password,
            email
        });

        res.status(200).json({
            success: true,
            message: 'Account created!',
            clientUsername: username,
        });
    } catch (error) {
        console.error(`Error:\n${error}`);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

const getClients = async (req, res) => {
    try {
        const clients = await Client.find();
        return res.status(200).json({ clients });
    } catch (error) {
        console.error(`Error:\n${error}`);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

const getClientProfile = async (req, res) => {
    try {
        const { clientId } = req.params;
        const clientProfile = await Client.findById(clientId);

        if (!clientProfile) {
            return res.status(404).json({ message: 'Client not found' });
        }

        return res.status(200).json({ clientProfile });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

const editProfile = async (req, res) => {
    try {
        const { clientId } = req.params;
        const updateData = req.body;

        const client = await Client.findByIdAndUpdate(clientId, updateData, { new: true });

        if (!client) {
            return res.status(404).json({ message: 'Account not found' });
        }

        return res.status(200).json({ message: 'Updated', client });
    } catch (error) {
        console.error(`Error: ${error}`);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteClient = async (req, res) => {
    try {
        const { clientId } = req.params;
        const client = await Client.findByIdAndDelete(clientId);

        if (!client) {
            return res.status(404).json({ message: 'Client does not exist' });
        }

        return res.status(200).json({ message: 'Client deleted' });
    } catch (error) {
        console.error(`Error:\n${error}`);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// const deleteAllClients = async (req, res) => {
//     try {
//         const clients = await Client.find();

//         if (clients.length === 0) {
//             return res.status(404).json({ message: 'No clients exist' });
//         }

//         await Client.deleteMany();

//         return res.status(200).json({ message: 'All clients deleted' });
//     } catch (error) {
//         console.error(`Error:\n${error}`);
//         return res.status(500).json({ success: false, message: 'Internal server error' });
//     }
// };
 
export default {
    registerClient,
    getClients,
    getClientProfile,
    editProfile,
    deleteClient,
};
