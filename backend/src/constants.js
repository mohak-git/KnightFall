export const AVATAR_TEMP_PATH = "./public/temp";
export const BCRYPT_SALT_ROUNDS = 10;
export const DEFAULT_USER_AVATAR_FILE_PATH = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/v1743310701/defaultUserAvatar.jpg`;
export const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: true,
    sameSite: "None",
};
