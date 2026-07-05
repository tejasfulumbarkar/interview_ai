const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')
const cors = require('cors')
const authRouter = require('./routes/auth.routes')
const interviewRouter = require('./routes/interview.routes')

const allowedOrigins = [
	/^http:\/\/localhost:\d+$/,
	/^http:\/\/127\.0\.0\.1:\d+$/
]


const corsOptions = {
	origin: (origin, callback) => {
		if (!origin) {
			return callback(null, true)
		}

		if (allowedOrigins.some((pattern) => pattern.test(origin))) {
			return callback(null, true)
		}

		return callback(new Error('Not allowed by CORS'))
	},
	credentials: true
}


app.use(express.json());
app.use(cookieParser())
app.use(cors(corsOptions))
app.use("/api/auth",authRouter)
app.use("/api/interview",interviewRouter)


module.exports=app;