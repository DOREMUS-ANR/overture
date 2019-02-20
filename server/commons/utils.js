export default function sendStandardError(res, err) {
  const m = (err && err.message) || err;

  console.error('error ', err.message);
  res.status(500).send({
    code: 500,
    message: m,
  });
}
