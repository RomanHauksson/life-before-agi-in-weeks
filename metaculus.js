async function fetchMetaculusData() {
  const response = await fetch("https://www.metaculus.com/api/posts/5121/", {
    headers: {
      Authorization: "Token 6334d92755b26675440ec8fef16f5355920f01de",
    },
  });

  return response.json();
}

fetchMetaculusData().then((data) => {
  console.log(data);
});
