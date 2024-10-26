import axios from 'axios';

const PINATA_API_KEY = 'e12305e6fdf073e0d832';
const PINATA_SECRET_API_KEY = 'd596aa1ec9c472eb28aedcdef3d4e7d5736e5716925a8857564ec7b777720121';

export const pinFileToIPFS = async (file) => {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

    let data = new FormData();
    data.append('file', file);

    const headers = {
        'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
        pinata_api_key: PINATA_API_KEY,
        pinata_secret_api_key: PINATA_SECRET_API_KEY
    };

    return axios
        .post(url, data, { headers: headers })
        .then(function (response) {
            console.log("File pinned successfully:", response.data);
            return response.data;
        })
        .catch(function (error) {
            console.error("Error pinning file:", error);
            throw error;
        });
};
