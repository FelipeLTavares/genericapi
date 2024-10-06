class ImageDto {
    id;
    url;
    public_id;

    constructor(image) {
        this.id = image.id;
        this.url = image.url;
        this.public_id = image.public_id;
    }
}

module.exports = ImageDto;