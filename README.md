# CA Service Desk Tool

While working as a Service Desk Engineer for one of Stefanini's clients, among other things, I had the responsibility of monitoring a ticket queue in the ITSM tool called CA Service Desk.
Even though it's a great tool, that comes with handy features like keyboard shortcuts for most actions, I found it lacking in some areas - so I decided to enhance my day-to-day work with this app by creating a Chrome/Edge extension for it.
<br />
<br />
## v 1.0 - Unassigned Tickets Monitor
![image](https://github.com/paperpiedpiper/CA_Tool/assets/105975348/72099e87-156e-40a2-90e3-1e8814061b9c)

Just as the name of v1.0 suggests, the main feature which I needed to create for myself was an alert that would notify me when the Unassigned Tickets queue for my team was no longer empty.

![image](https://github.com/paperpiedpiper/CA_Tool/assets/105975348/a20c0868-1a27-43ff-b9c8-7a8e4e062cb5)

And with the help of [Chrome Developers - Extensions](https://developer.chrome.com/docs/extensions/) documentation, I was able to create it.

![image](https://github.com/paperpiedpiper/CA_Tool/assets/105975348/c8e225be-33bb-4b58-b3c8-4c6426f132a9)
<br />

This version would only have the content script monitor the web page of the ITSM tool at a certain setInterval(). When the +innerHTML of the &lt;span> that displayed the number of tickets would no longer be 0, the function from within the setInterval would send a message to the service-worker script which would, in turn, use the chrome.notifications API to send a Windows notification. This would be of great help on certain shifts, when I would be the only person available and it helped us not breach our SLA.

![image](https://github.com/paperpiedpiper/CA_Tool/assets/105975348/a9c75024-90b5-494f-bf14-043aae68cf98)

The popup window for the extension was rudimentary, only serving as the pair to the snooze buttons usable on the notification.
