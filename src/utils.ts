export function generate() {
  const subset = "123456789qwertyuiopasdfghjklzxcvbnm";
  const length = 5;
  var id = "";
  for (let i = 0; i < length; i++) {
    id += subset[Math.floor(Math.random() * subset.length)];
  }
  return id;
}
