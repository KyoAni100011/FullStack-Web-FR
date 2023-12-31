export default function setCookie(name, value, daysToLive) {
  // Encode value in order to escape semicolons, commas, and whitespace
  var cookie = name + "=" + JSON.stringify(value);

  if (typeof daysToLive === "number") {
    /* Sets the max-age attribute so that the cookie expires
        after the specified number of days */
    cookie += "; max-age=" + daysToLive;

    document.cookie = cookie;
  }
}
