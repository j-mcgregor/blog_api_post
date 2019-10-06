import express from "express";
import { ApolloServer } from "apollo-server-express";
import mongoose from "mongoose";
import logger from "morgan";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import session from "express-session";
import config from "./config";
import schema from "./src/schema";
import authMiddleware from "./src/lib/authMiddleware";

const { port, db, sessionSecret } = config;
const { typeDefs, resolvers } = schema;

const app = express();
app.use(logger("dev"));

const mdb = async () => {
  try {
    await mongoose.connect(db, { useNewUrlParser: true });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB error: ", error);
  }
};

mdb();

app.use(helmet());
console.log("Middleware added: helmet");
app.use(cookieParser());
console.log("Middleware added: cookie-parser");

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  methods: "GET,PUT,POST,DELETE,OPTIONS",
  headers: "Origin,X-Requested-With,Content-Type,Accept,application/json"
};

app.use(cors(corsOptions));
console.log("Middleware added: cookie");

app.use(
  session({
    secret: sessionSecret,
    cookie: {
      secure: true,
      httpOnly: true
    },
    saveUninitialized: false,
    resave: false
  })
);
console.log("Middleware added: express-session");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
console.log("Middleware added: body-parser");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req, res }) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    const { data, success } = await authMiddleware(req);
    if (success) {
      return { user: data };
    } else {
      throw new Error(data);
    }
  }
});

server.applyMiddleware({ app });

app.listen({ port }, () =>
  console.log("🚀 Server ready at", `http://localhost:${port}/graphql`)
);
