const express = require("express");
const addrs = require("email-addresses");
const domains = require("./domains");
const app = express();

app.listen(3000, () => {
  console.log("Сервер запущен на порте 3000");
});

app.get("/", (req, res) => {
  const { email } = req.query;
  if (!email) {
    res.json({ ok: false, error: "Отсутствует GET-параметр email" });
    return;
  }

  const parsedAddress = addrs.parseOneAddress(email);
  if (!parsedAddress || !parsedAddress.domain) {
    res.json({ ok: false, error: "Не удалось распознать email" });
    return;
  }

  const disposable = domains.includes(parsedAddress.domain.toLowerCase());
  res.json({
    ok: true,
    result: disposable,
    message: disposable ? "Временный" : "Не временный",
  });
});
