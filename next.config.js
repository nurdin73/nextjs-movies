// next.config.js
module.exports = {
    images: {
        domains: ['image.tmdb.org', "thumbs.dreamstime.com", "img.youtube.com"],
    },
    env: {
        APP_NAME: 'LUX',
        API_KEY: "f52aa1a7c260685a467d566a4b94825f",
        REDIRECT_TO: "http://localhost:3000/session/create"
    }
}