# CA Service Desk Tool

While working as a Service Desk Engineer for one of Stefanini's clients, among other things, I had the responsibility of monitoring a ticket queue in the ITSM tool called CA Service Desk.
Even though it's a great tool, that comes with handy features like keyboard shortcuts for most actions, I found it lacking in some areas - so I decided to enhance my day-to-day work with this app by creating a Chrome/Edge extension for it.
<br />
<br />
## v 1.0 - Unassigned Tickets Monitor
![image](https://github.com/paperpiedpiper/CA_Tool/assets/105975348/37f8fe67-8d98-42ea-91b3-3c693d788e22) 

Just as the name of v1.0 suggests, the main feature which I needed to create for myself was an alert that would notify me when the Unassigned Tickets queue for my team was no longer empty.

![image](https://github.com/paperpiedpiper/CA_Tool/assets/105975348/89df19d3-5488-46aa-8a99-20cc6f23fa0e)

And with the help of [Chrome Developers - Extensions](https://developer.chrome.com/docs/extensions/) documentation, I was able to create it.

![image](https://github.com/paperpiedpiper/CA_Tool/assets/105975348/f4414048-5fc8-4a8b-bad8-a6dbf4b52a28)
<br />

This version would only have the content script monitor the web page of the ITSM tool at a certain setInterval(). When the +innerHTML of the &lt;span> that displayed the number of tickets would no longer be 0, the function from within the setInterval would send a message to the service-worker script which would, in turn, use the chrome.notifications API to send a Windows notification. This would be of great help on certain shifts, when I would be the only person available and it helped us not breach our SLA.

![image](https://github.com/paperpiedpiper/CA_Tool/assets/105975348/813aa8dd-434a-4470-ad5d-3598b32477aa)

The popup window for the extension was rudimentary, only serving as the pair to the snooze buttons usable on the notification.
