document
  .getElementById("translationForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    const sourceText = document.getElementById("sourceText").value;
    const targetLanguage = document.getElementById("targetLanguage").value;
    const resultDiv = document.getElementById("translationResults");

    const url =
      "https://google-translate113.p.rapidapi.com/api/v1/translator/text";
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": "3034114b0emsh88857f69e53005bp11521ajsn524bdaf18a6b",
        "X-RapidAPI-Host": "google-translate113.p.rapidapi.com",
      },
      body: new URLSearchParams({
        from: "auto", // 'auto' means 'detect the language automatically
        to: [targetLanguage],
        text: [sourceText],
      }),
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
        resultDiv.innerHTML = result.trans;
        console.log(result);
    } catch (error) {
        console.error("Translation error:", error);
        resultDiv.textContent = "Failed to translate.";
    }
  });
