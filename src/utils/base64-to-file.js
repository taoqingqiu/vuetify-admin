export const base64ToFile = (base64Str, filename) => {
  return base64Str.split(",").reduce(
    (pre, curr, idx) =>
      idx === 0
        ? curr.match(/:(.*?);/)[1]
        : new File(
            [
              ((val) => {
                let u8arr = new Uint8Array(val.length);
                u8arr = u8arr.map((_, idx) => val.charCodeAt(idx));
                return u8arr;
              })(window.atob(curr))
            ],
            filename,
            { type: pre }
          ),
    ""
  );
};
