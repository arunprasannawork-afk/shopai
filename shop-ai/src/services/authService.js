import supabase from "./supabase";

export const signUp =
async (
 email,
 password
) => {

 const { data, error } =
 await supabase.auth.signUp({
   email,
   password
 });

 return {
  data,
  error
 };
};

export const signIn =
async (
 email,
 password
) => {

 const { data, error } =
 await supabase.auth.signInWithPassword({
   email,
   password
 });

 return {
  data,
  error
 };
};

export const logout =
 async () => {

  await supabase.auth.signOut();

 };

export const signOut =
async () => {

 await supabase.auth.signOut();
};