/* eslint-disable no-prototype-builtins */
import passport from "passport";
import jwt from "jsonwebtoken";
import assembleToken from "./assembleToken";
import config from "../../config";

export default async (req) => {
  const { cookies = {} } = req;

  if (!cookies.COOKIE_1 || !cookies.COOKIE_2) {
    const errorsArray = [];
    if (!cookies.COOKIE_1) errorsArray.push("COOKIE 1 missing");
    if (!cookies.COOKIE_2) errorsArray.push("COOKIE 2 missing");
    return { data: errorsArray, success: false };
  }

  const token = assembleToken(cookies);

  try {
    const decodedUser = jwt.verify(token, config.secret);
    return { data: decodedUser, success: true };
  } catch (err) {
    return { data: err, success: false };
  }
};
