# CA Service Desk Tool

While working as a Service Desk Engineer for one of Stefanini's clients, among other things, I had the responsibility of monitoring a ticket queue in the ITSM tool called CA Service Desk. <br /> <br />
Even though it's a great tool, that comes with handy features like keyboard shortcuts for most actions, I found it lacking in some areas - so I decided to simplify and automate my daily work by creating a Chrome/Edge extension for it.
<br />
<br />
## v 1.0 - Unassigned Tickets Monitor
![image](https://github.com/paperpiedpiper/CA_Tool/assets/105975348/72099e87-156e-40a2-90e3-1e8814061b9c)

Just as the name of v1.0 suggests, the main feature which I needed to create for myself was an alert that would notify me when the Unassigned Tickets queue for my team was no longer empty.

![image](https://github.com/paperpiedpiper/CA_Tool/assets/105975348/a20c0868-1a27-43ff-b9c8-7a8e4e062cb5)

And with the help of [Chrome Developers - Extensions documentation](https://developer.chrome.com/docs/extensions/), I was able to create it.

![image](https://github.com/paperpiedpiper/CA_Tool/assets/105975348/c8e225be-33bb-4b58-b3c8-4c6426f132a9)
<br />

This version would only have the content script monitor the web page of the ITSM tool at a certain setInterval(). When the +innerHTML of the &lt;span> that displayed the number of tickets would no longer be 0, the function from within the setInterval would send a message to the service-worker script which would, in turn, use the chrome.notifications API to send a Windows notification. This would be of great help on certain shifts, when I would be the only person available and it helped us not breach our SLA.

![image](https://github.com/paperpiedpiper/CA_Tool/assets/105975348/a9c75024-90b5-494f-bf14-043aae68cf98)

The popup window for the extension was rudimentary, only serving as the pair to the snooze buttons usable on the notification.
## v2 - extra features
My first intention was to only make the feature in v1. But, with my newfound knowledge I wanted to create some aditional UI customizations that I would've liked to have.
### On-load click() on dropdown menus
&emsp;Some sub-queues that were monitored were not being shown by default on page load.

![screen-recording](https://github.com/paperpiedpiper/CA_Tool/assets/105975348/d1d82464-cb22-4434-91f4-df4ca8067634)

### Auto-edit new tickets summary & content
###### &emsp;*no example due to NDA*<br />
&emsp;New tickets were auto-generated from emails sent to our team's inbox, and were always parsed into the new ticket's summary and content input text fields as such:<br />
<code>-[[email's subject field]]-</code><br />
<code>-[[email's subject field]]- email's body content</code>

Using regex, upon clicking the Edit button on the ticket, the unnecessary characters are removed automatically *(which previously was done manually by the agents for each ticket)*.

### Prevent laptop's screen going to sleep
&emsp;For long shifts with a quiet queue. Embeds an async function that continuously monitors the visibility of the tab. Using the wakeLock API it keeps the system from going to sleep, as long as the targeted tab is focused.<br />
<hr>
<code>navigator.wakeLock.request('screen')
  .then((wakeLock) => {
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState == 'visible') {
        navigator.wakeLock.request('screen')
      } else {
        wakeLock.release();
      }
    });
  })</code>
<hr>

## v3 - refactoring and extra features

### Multiple ticket opener
&emsp;Each day we'd get a list of tickets from the backlog to check up on. It became tedious to copy-paste ~15 tickets individually each day, so I re-designed the extension's popup a and added a new functionality: <br />

![image](https://github.com/paperpiedpiper/CA_Tool/assets/105975348/8c39aa2d-f041-492d-850c-553682ec1169)

When copying over the list of tickets into the input field, all the tickets in the list would be sent to the main window content script to be opened at a 100ms interval, each.

### Teams chat transcript prettify
&emsp;We contacted our users via Teams. And that meant that sometimes we'd need to copy over the transcript into the tickets' logs for future reference of our actions. <br />
Unfortunately, Teams has a weird issue where it adds extra newlines when copying from a chat, which made our log history appear cluttered. <br />
So, I added an option to use regex to cut out the extra newline characters on keydown event.

![98bab88a-ec8b-4192-8ab7-0ca53452caec](https://github.com/paperpiedpiper/CA_Tool/assets/105975348/5896bc6c-20b7-4a27-be3d-c7d0a3fb1e60)

### Knowledge article linking tracker
&emsp;One of our SLAs was about making sure each ticket had a KB article linked to it, so that the procedure is described for everyone who was to view the ticket further down the line. Due to the nature of where it was positioned, it was cumbersome to reach in an efficient manner. So, another tracker was created to peek at the DOM contents and see if the following message was present:

![image](https://github.com/paperpiedpiper/CA_Tool/assets/105975348/8ed34d53-2eaf-4634-bf53-4b5039128609)

If it was, the content script would append a child to the DOM so that the following warning was automatically displayed on the ticket's webpage:

![image](https://github.com/paperpiedpiper/CA_Tool/assets/105975348/b81abb87-06e9-417d-afd6-e4d715328411)


### Final refactoring

Multiple elements were refactored, but the most important part was applying my newfound understanding of how to work with nested frames.

![image](https://github.com/paperpiedpiper/CA_Tool/assets/105975348/60f8aaca-6b09-4178-ba01-567799acf177)

Initially, I was accessing the DOM elements I needed via a very hacky chain of childNodes[i] selectors. Over the weeks I worked on this project, I understood better and better the functionality of nested frames and the HTML documents within each of them.
