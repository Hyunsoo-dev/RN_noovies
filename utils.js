export const makeImgUrl = (file_path, size = "w500") => {
  return `http://image.tmdb.org/t/p/${size}${file_path}`;
};
