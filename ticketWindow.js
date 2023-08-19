setTimeout(() => {
    editButton = document.querySelector('[name="cai_main"]')?.contentWindow?.document.querySelector("a#imgBtn0.button.enabledattr.buttonEnabled")
     || document.documentElement.childNodes[2]?.childNodes[7]?.contentWindow?.document.documentElement.childNodes[2]?.childNodes[71]?.childNodes[7]?.childNodes[4]?.childNodes[1]?.childNodes[1]?.childNodes[0]?.childNodes[3]?.childNodes[1]?.childNodes[0]?.childNodes[0]?.childNodes[1]?.childNodes[1]
      || document.documentElement.childNodes[2]?.childNodes[71]?.childNodes[7]?.childNodes[4]?.childNodes[1]?.childNodes[1]?.childNodes[0]?.childNodes[3]?.childNodes[1]?.childNodes[0]?.childNodes[0]?.childNodes[1]?.childNodes[1];
    editButton.addEventListener("click", () => {
        console.log("Clicked message before inner setTimeout");
        setTimeout(() => {
            console.log("Clicked message after inner setTimeout");
            //  SUMMARY input field
            const elementDf7 = (document.querySelector('[name="cai_main"]')?.contentWindow?.document.querySelector("input#df_7_0"))
            || document.documentElement.childNodes[2]?.childNodes[71]?.childNodes[7]?.childNodes[8]?.childNodes[1]?.childNodes[26]?.childNodes[1]?.childNodes[3]?.childNodes[1]?.childNodes[1];
            // DESCRIPTION textarea field
            const elementDf8 = (document.querySelector('[name="cai_main"]')?.contentWindow?.document.querySelector("textarea#df_8_0"))
            || document.documentElement.childNodes[2]?.childNodes[71]?.childNodes[7]?.childNodes[8]?.childNodes[1]?.childNodes[26]?.childNodes[1]?.childNodes[7]?.childNodes[1]?.childNodes[1];
            
            // Increase ticket description size
            elementDf8.rows = 15;
            elementDf8.cols = 134;

            // Filter out new ticket's email subject
            let value = elementDf7.value;
            const regex = /-\[\[.*?\]\]-/;
            const regexHalf = /-\[/g;
            if (regex.test(value)) {
                elementDf7.value = value.split('-[[')[1].split(']]-')[0];
            }
            else if (regexHalf.test(value)) {
                elementDf7.value = value.split('-[[')[1].split(' ...')[0];
            }
            
            // Delete first line of new ticket's summary
            let innerHTML = elementDf8.innerHTML;
            if (regex.test(innerHTML)) {
                let index = innerHTML.indexOf('\n');
                elementDf8.innerHTML = innerHTML.substring(index + 1);
            }
        }, 3000);
    });
}, 2000);