const credentailData = {
  google:
    "708253070470-m0i1d4r1rm5kn3e90pgib1ie8j8sde62.apps.googleusercontent.com"
};

/**
 * get credential data
 * @param {key} string
 */
export const credential = key => {
  return credentailData[key];
};
