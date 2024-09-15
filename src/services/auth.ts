"use server";
import { cookies } from "next/headers";
export async function setToken (token: string) {
  if (token === "") return;
  try {
    cookies().set( {
      name: "jwt-user",
      value: token,
      httpOnly: true,
      secure: true,
      path: "/",
      maxAge: 60 * 60 * 24 , // 1 days
    });
  } catch (error) {
    console.error('Error setting token:', error);
  }
};

export async function getToken () {
  try {
    return cookies().get("jwt-user")?.value;
  } catch (error) {
    console.error('Error getting token:', error);
  }
};

export async function removeToken() {
  try {
    cookies().delete("jwt-user");
  } catch (error) {
    console.error('Error removing token:', error);
  }
};
