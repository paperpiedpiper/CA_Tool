let kbDivContainer,
    warningElementContainer;
let summaryFieldElement,
    descriptionFieldElement,
    kbWarningElement = null;
let globalEdit;

document.querySelector('[name="cai_main"]').addEventListener('load', function() {
    setTimeout(checkKB, 1500);
    setTimeout(stageTransitionToEdit, 1500);
    let targetArea = document.querySelector('[name="cai_main"]');
    if(targetArea) {
        targetArea.contentWindow?.document.addEventListener("keydown", function(event) {
            if (event.ctrlKey && event.key === "g") {
                event.preventDefault();
                globalEdit();
            }
        });
        targetArea.contentWindow?.document.addEventListener("keydown", function(event) {
            if (event.ctrlKey && event.key === "q") {
                event.preventDefault();
                const allDropdowns = document.querySelector('[name="cai_main"]').contentWindow.document.querySelectorAll("span#hotspot") || document.querySelectorAll("span#hotspot");
                allDropdowns.forEach(e=>e.click());
            }
        });
    };
});

function checkKB() {
    if (kbWarningElement) kbWarningElement.remove();
    kbDivContainer = document.querySelector('[name="cai_main"]')?.contentWindow?.document.querySelector("div#nbtab_3_2")
     || document.querySelector("div#nbtab_3_2");
    kbDivContainer?.childNodes?.forEach(e => {
        if (e.innerHTML?.includes("No Solutions Attached")) {
            warningElementContainer = document.querySelector('[name="cai_main"]')?.contentWindow?.document.querySelector("table#dtltbl1.detailro")
             || document.querySelector("table#dtltbl1.detailro");
            warningElementContainer.style.position = "relative";

            kbWarningElement = document.createElement("div");
            kbWarningElement.style.position = "absolute";
            kbWarningElement.style.top = "19px";
            kbWarningElement.style.right = "0";
            kbWarningElement.style.border = "3px solid #FF934F";
            kbWarningElement.style.display = "flex";
            kbWarningElement.style.flexDirection = "column";
            kbWarningElement.style.alignItems = "center";
            kbWarningElement.style.justifyContent = "center";
            kbWarningElement.style.fontWeight = "900";
            kbWarningElement.style.padding = "5px 10px";
            kbWarningElement.style.boxShadow = "rgba(0, 0, 0, 0.35) 0px 5px 15px";
            kbWarningElement.style.backgroundColor = "white";
            warningElementContainer.appendChild(kbWarningElement);

            let childTextElement = document.createElement("span");
            childTextElement.textContent = "╔═ NO KB attached ═╗";
            kbWarningElement.appendChild(childTextElement);
            childTextElement = document.createElement("span");
            childTextElement.textContent = "╚═══ (◕ᴥ◕ʋ)═══╝";
            kbWarningElement.appendChild(childTextElement);
            setTimeout(checkKB, 1500);
        }
    });
};

function stageTransitionToEdit() {
    const editButton = document.querySelector('[name="cai_main"]')?.contentWindow?.document.querySelector("a#imgBtn0.button.enabledattr.buttonEnabled")
     || document.querySelector("a#imgBtn0.button.enabledattr.buttonEnabled");

    function makeEditPageChanges() {
        summaryFieldElement = document.querySelector('[name="cai_main"]')?.contentWindow?.document.querySelector("input#df_7_0")
         || document.querySelector("input#df_7_0");
        descriptionFieldElement = document.querySelector('[name="cai_main"]')?.contentWindow?.document.querySelector("textarea#df_8_0")
         || document.querySelector("textarea#df_8_0");
        const regex = /-\[\[.*?\]\]-/;
        const regexHalf = /-\[/g;
       
        // Filter out new ticket's email subject
        if (summaryFieldElement) {
            let sFieldValue = summaryFieldElement.value;
            if (regex.test(sFieldValue)) {
                summaryFieldElement.value = sFieldValue.split('-[[')[1].split(']]-')[0];
            }
            else if (regexHalf.test(sFieldValue)) {
                summaryFieldElement.value = sFieldValue.split('-[[')[1].split(' ...')[0];
            };
        };
            
        // Delete new ticket's first line of summary (& increase description size)
        if (descriptionFieldElement) {
            descriptionFieldElement.rows = 15;
            descriptionFieldElement.cols = 134;
            let dFieldInnerHtml = descriptionFieldElement.innerHTML;
            if (regex.test(dFieldInnerHtml)) {
                let index = dFieldInnerHtml.indexOf('\n');
                descriptionFieldElement.innerHTML = dFieldInnerHtml.substring(index + 1);
            };
        };

        const cancelButton = document.querySelector('[name="cai_main"]')?.contentWindow?.document.querySelector("a#imgBtn2.button.enabledattr.buttonEnabled")
         || document.querySelector("a#imgBtn2.button.enabledattr.buttonEnabled");

        cancelButton?.addEventListener("click", () => {
        setTimeout(checkKB, 1500);
        setTimeout(stageTransitionToEdit, 1500);
        });
        if (descriptionFieldElement && descriptionFieldElement.cols == 134) {
            return;
        } else {
            // Use a Promise to wait for the changes before continuing
            return new Promise((resolve) => {
                cancelButton?.addEventListener("click", () => {
                    // Wait for 2 seconds before checking KB and transitioning again
                    setTimeout(() => {
                        makeEditPageChanges();
                        resolve();
                    }, 200);
                });
            });
        };
    };
    globalEdit = makeEditPageChanges;

    editButton?.addEventListener("click", () => {
        setTimeout(() => {
            makeEditPageChanges();
        }, 3000);
    });
};