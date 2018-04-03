export const SAVE_TENTATIVE_PICTURE = "SAVE_TENTATIVE_PICTURE";

export function saveTentativePicture(base64Picture) {
  return {
    type: SAVE_TENTATIVE_PICTURE,
    base64Picture: base64Picture
  };
}
