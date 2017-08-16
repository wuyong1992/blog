// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  //user
  userRegisterURL: "http://localhost:8080/user/register",
  userLoginURL: "http://localhost:8080/user/login",
  userIsLoginURL: "http://localhost:8080/user/rest/isLogin",
  userLogoutURL: "http://localhost:8080/user/logout",
  getCurrentUserWithTokenUrl: "http://localhost:8080/user/rest/getCurrentUser",
  //blog
  getAllBlogsUrl: "http://localhost:8080/blog/getAllBlogs",
  blogSaveURL: "http://localhost:8080/blog/rest/blogSave",
  blogUpdateURL: "http://localhost:8080/blog/rest/blogUpdate",
  getBlogByIdUrl: "http://localhost:8080/blog/getBlogById",
  blogImgUploadUrl:"http://localhost:8080/blog/rest/imgUpload",
  //category
  getCategorysUrl:"http://localhost:8080/category/getCategorys"
};
