document.querySelector('[name="cai_main"]').addEventListener('load', () => {
    setTimeout(tickInternalCheckBox, 1000);
    setTimeout(() => {
        const elementDf3 = document.querySelector('[name="cai_main"]')?.contentWindow?.document.querySelector("#df_3_0") || document.querySelector("#df_3_0");
        if (elementDf3) {
        elementDf3.rows = 14;
        elementDf3.cols = 113;
        };
    }, 3000);
    let targetArea = document.querySelector('[name="cai_main"]');
    if(targetArea) {
        targetArea.contentWindow?.document.addEventListener("keydown", function(event) {
            if (event.ctrlKey && event.key === "q") {
                event.preventDefault();
                const textarea = document.activeElement?.contentWindow?.document.activeElement || document.activeElement;
                const newText = textarea.value.replace(/^\s*[\r\n]/gm, "");
                textarea.value = newText;
            }
        });
    };
});

function tickInternalCheckBox() {
    const checkBox = document.querySelector('[name="cai_main"]')?.contentWindow?.document.querySelector("input#df_1_2")
     || document.querySelector("input#df_1_2")
     || document.querySelector('[name="cai_main"]')?.contentWindow?.document.querySelector("input#df_3_2")
     || document.querySelector("input#df_3_2")
     || document.querySelector('[name="cai_main"]')?.contentWindow?.document.querySelector("input#df_2_2")
     || document.querySelector("input#df_2_2");
    if(checkBox?.previousElementSibling['value'] == '0')
        checkBox?.click();
};