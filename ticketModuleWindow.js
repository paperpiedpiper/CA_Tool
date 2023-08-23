document.querySelector('[name="cai_main"]').addEventListener('load', function() {
    setTimeout(() => {
        const elementDf3 = document.querySelector('[name="cai_main"]')?.contentWindow?.document.querySelector("#df_3_0") || document.querySelector("#df_3_0");
        if (elementDf3) {
        elementDf3.rows = 14;
        elementDf3.cols = 113;
        }
    }, 3000);
    let targetArea = document.querySelector('[name="cai_main"]');
    if(targetArea) {
        targetArea.contentWindow?.document.addEventListener("keydown", function(event) {
            if (event.ctrlKey && event.key === "q") {
                event.preventDefault();
                console.log("ctrl-q pressed");
                const textarea = document.activeElement?.contentWindow?.document.activeElement || document.activeElement;
                const newText = textarea.value.replace(/^\s*[\r\n]/gm, "");
                textarea.value = newText;
            }
        });
    }
});