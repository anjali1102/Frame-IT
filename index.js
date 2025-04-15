const quoteButton = document.querySelector(".quote-btn");
const quoteDisplay = document.querySelector(".quote-display");
const quoteAuthor = document.querySelector(".quote-author");
const twitterShareBtn = document.querySelector(".twitter-share-button");
const copyClipboardBtn = document.querySelector(".copy-share-button");
const copyIcon = copyClipboardBtn.querySelector("i");

async function getQuoteData() {
  try {
    const quoteResponse = await fetch(
      `https://api.freeapi.app/api/v1/public/quotes/quote/random`
    );
    const response = await quoteResponse.json();

    return response?.data;
  } catch (error) {
    return "TRY AGAIN !";
  }
}

quoteButton.addEventListener("click", async () => {
  const quote = await getQuoteData();
  if (quote) {
    quoteDisplay.textContent = quote.content;
    quoteAuthor.textContent = quote.author;
    twitterShareBtn.style.display = "inline-block";
    copyClipboardBtn.style.display = "inline-block";

    const tweetContent = encodeURIComponent(
      `"${quote.content}" ~${quote.author}`
    );
    const tweetUrl = `https://x.com/intent/tweet?text=${tweetContent}`;
    copyClipboardBtn.onclick = navigator.clipboard.writeText(tweetContent);
    twitterShareBtn.href = tweetUrl;
  } else {
    quoteDisplay.textContent = "TRY AGAIN !!";
  }
});

document.addEventListener("DOMContentLoaded", () => {
  twitterShareBtn.style.display = "none";
  copyClipboardBtn.style.display = "none";
});

copyClipboardBtn.addEventListener("click", () => {
  copyIcon.classList.add("copy-clicked");
  alert("Copied");
  setTimeout(() => {
    copyIcon.classList.remove("copy-clicked");
  }, 200);
});
