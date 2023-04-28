// production 은 heroku 환경 , development은 로컬 환경
const isHeroku = process.env.NODE_ENV === "production"

export default isHeroku;