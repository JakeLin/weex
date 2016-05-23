const regexp = /^\/\/ *(\{[^\}]*\}) *\r?\n/

export default function check (code) {
  let info
  const result = regexp.exec(code)
  if (result) {
    try {
      info = JSON.parse(result[1])
    } catch (e) {}
  }
  return info
}
