function SendResults(results, mode, error, res, encrypt, amount) {
  // encrypt data
  var CryptoJS = require("crypto-js");

  var encryptResults = CryptoJS.AES.encrypt(
    JSON.stringify(results),
    process.env.NEXT_PUBLIC_QURAN_KEY,
  ).toString();

  // result json
  if (results.length == 0) {
    console.log(error);
    res.json({ status: "error" });
  } else {
    if (encrypt == "true") {
      res.json({
        status: "success",
        amount,
        mode,
        encrypt,
        results: encryptResults,
      });
    } else {
      res.json({
        status: "success",
        amount,
        mode,
        encrypt: "false",
        results,
      });
    }
  }
}

export default SendResults;
