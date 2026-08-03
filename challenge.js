"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const introScreen =
        document.getElementById("introScreen");

    const challengeScreen =
        document.getElementById("challengeScreen");

    const continueButton =
        document.getElementById("continueButton");

    const yesButton =
        document.getElementById("yesButton");

    const noButton =
        document.getElementById("noButton");

    const result =
        document.getElementById("result");

    const unlockedSection =
        document.getElementById("unlockedSection");

    if (
        !introScreen ||
        !challengeScreen ||
        !continueButton ||
        !yesButton ||
        !noButton ||
        !result ||
        !unlockedSection
    ) {
        console.error(
            "SIGNALGHOST initialization failed: required page elements are missing."
        );

        return;
    }

    continueButton.addEventListener("click", () => {
        introScreen.classList.add("hidden");
        challengeScreen.classList.remove("hidden");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        challengeScreen.focus({
            preventScroll: true
        });
    });

    yesButton.addEventListener("click", () => {
        showFailedResult(result);

        unlockedSection.classList.add("hidden");
    });

    noButton.addEventListener("click", () => {
        showCorrectResult(result);

        unlockedSection.classList.remove("hidden");
    });
});


function clearResult(resultElement) {
    resultElement.replaceChildren();

    resultElement.classList.remove(
        "result-correct",
        "result-failed",
        "result-invalid"
    );
}


function appendParagraph(
    parentElement,
    text,
    className = ""
) {
    const paragraph =
        document.createElement("p");

    paragraph.textContent = text;

    if (className) {
        paragraph.classList.add(className);
    }

    parentElement.appendChild(paragraph);
}


function showCorrectResult(resultElement) {
    clearResult(resultElement);

    resultElement.classList.add("result-correct");

    const heading =
        document.createElement("strong");

    heading.textContent = "CORRECT";

    resultElement.appendChild(heading);

    appendParagraph(
        resultElement,
        "FLAG{VERIFY_BEFORE_TRUST}",
        "flag"
    );

    appendParagraph(
        resultElement,
        "Human verification matters."
    );
}


function showFailedResult(resultElement) {
    clearResult(resultElement);

    resultElement.classList.add("result-failed");

    const heading =
        document.createElement("strong");

    heading.textContent = "FAILED";

    resultElement.appendChild(heading);

    appendParagraph(
        resultElement,
        "You trusted the request without verification."
    );

    appendParagraph(
        resultElement,
        "Verify identity through an approved secondary channel."
    );
}
