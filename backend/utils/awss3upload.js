const cloudinary = require('cloudinary');
const fs = require("fs")

const { S3Client, PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3")
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner")

const accessKey = process.env.AWS_ACCESS_KEY
const secretKey = process.env.AWS_SECRET_KEY
const bucketName = process.env.AWS_BUCKET_NAME
const location = process.env.AWS_LOCATION

const s3 = new S3Client({
    credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretKey
    },
    region: location
})

const uploadOnAWS = async (file, filename) => {
    const extension = file.originalname.split(".").pop();
    try {
        const command = new PutObjectCommand({
            Bucket: bucketName,
            Key: filename + "." + extension,
            Body: file.buffer,
            ContentType: file.mimetype
        })
        await s3.send(command)
        const imageUrl = await getSignedUrl(
            s3,
            new GetObjectCommand({
                Bucket: bucketName,
                Key: filename + "." + extension
            }),
        )
        return imageUrl;
    } catch (error) {
        return null;
    }
}

module.exports = uploadOnAWS