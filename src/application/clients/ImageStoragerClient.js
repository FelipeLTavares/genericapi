const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    secure: true,
});

class ImageStoragerClient {
    static async upload(file) {
        console.log('===')
        const uploadedImg = await cloudinary.uploader
            .upload(file.path, { upload_preset: process.env.UPLOAD_PRESET })
            .then((res) => ({ url: res.url, publicId: res.public_id }))
            .catch((err) => { throw new Error("Erro no upload da imagem") });

        return uploadedImg;
    }

    static async delete(fileId) {
        await cloudinary.api
            .delete_resources(fileId)
            .then((resp) => console.log(resp));
    }
}

module.exports = ImageStoragerClient;