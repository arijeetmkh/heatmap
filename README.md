heatmap
=======

Heatmap and click tracking demonstration


Assumption(s) Made:
1) Client has Jquery script loaded


async_code.js
=============

Working:

The async_code.js file contains the asynchronous code which captures click and positional metrics and sends requests to the server to store them. It does so in the following way:

1. Attach an on click event to the body of the document.
2. Capture any click event
3. Using the event object passed, get the target container clicked, and find it XPath
4. Also, find offset positions x,y within the parent element
5. Find the width of the parent element which is clicked
6. Calculate the ratio width : x_offset
7. Calculate the ratio height : y_offset
8. Dynamically send a request to load an image with GET parameters containing the Xpath, and the x and y ratios

Reasoning:

As far as recording the container which was clicked, generating an XPath can give us a reliable method about the identity of the element. For recording the position, I have used the offset coordinates inside the parent element, and used it to calculate a ratio between the width of the container and the offset. This ratio should be enough information to render heatmaps at the exact location.

Sending AJAX requests created a problem due to cross domain restrictions. So, the best way to corcumvent this issue was to request an image with get parameters.

heatmap_render.js
=================

Working:

The heatmap_render.js file contains the javscript code which is used in the visualizing page in order to dynamically fetch metrics and plot them on a canvas with the client web page rendered in the background

1. Display the client page as an iframe through means of a proxy
2. Fetch the click and position data from the database through AJAX
3. Use the XPath to find the element inside the iframe and display the number of clicks by dynamically changing the css of the element using javascript
4. Also, note the width of the element
5. Populate an array, to be used by heatmap.js (open source library), which will contain the calculated offset position using the ratio returned from the server and the width noted above.
6. Initialise heatmap.js with its config, coordinates

Reasoning:

Because of cross domain restrictions, the page rendered in the iframe had to be done through a proxy. After rendering it, the ratios saved were made use of to find the exact position relative to the element in question. Since we also know what the positional values of the element are relative to the entire document, we can calculate the exact coordinate where the click took place. These pieces of information were passed on to heatmap.js which plotted heatmaps on a canvas.

Examples Directory
==================

As far as the server is concerned, the database used was mongodb. I set up a django app which would receive click metrics and store them to the database. Another endpoint is responsible for fetching the data and ensuring it is serialized is JSON and returned to the client. The server doesn't have too many roles, although it can (See 'Areas of Improvement').

Limitations
===========

1. A minor CSS issue which I couldn't figure out myself. While rendering the iframe, the final 3-5% of the iframe is stretched, and not visible.
2. Since, the iframe content is being served through a proxy, any images or URLs with relative resource locators will not display properly (or at all).
3. Cross Browser Compatibility Issue: Extracting elements from within an iframe which isnt the 'property' of the original document, is not allowed on Mozilla Firefox as per a very recent security change. Although the documentation/specifications say this rule is not enforced, the latest version of firefox that I am using enforces the rule as far as I can see. (Here is the change recommendation that went through Bugzilla - https://bugzilla.mozilla.org/show_bug.cgi?id=47903). The alternatives to this include document.importNode() or document.adoptNode() which are methods which allow the original document to adopt elements from a document from another resource. (Specified here - https://developer.mozilla.org/en-US/Firefox/Releases/3/Site_compatibility#WRONG_DOCUMENT_ERR). Unfortunately, this method fails as well, as Firefox complains I am not the 'owner' of the content inside the iframe (even though it is on the same domain). More on owner issues here - http://www.w3.org/DOM/faq.html#ownerdoc


Areas of Improvement / Potential Breakpoints
============================================

1. High number of clicks on the client can lead to an excessive number of requests being sent to the server. To solve this issue, a data structure can be used to aggregate data in some form, and send requests after a certain cooling period.
2. High number of requests on the server: Since we cannot specify an upper bound on the number of users a client (who has installed our click tracking code) has, the server may have to deal with a large number of requests. To solve this, instead of performing DB write operations synchronously, we can use an asynchronous task scheduler to receive a task and record it in a queue. This queue can later be smartly accessed through means of concurrent workers and tasks executed.
3. Iframe to Iframe communication: Since rendering content through a proxy introduces complexities, using a normal iframe without a proxy, but through a means which could allow us to communicate to the iframe's contents would be helpful. According to the Wingify engineering blog, the open source please.js, built around the push message API can be used.
4. Cross browser compatibility issues which were introduced here in this demonstration could potentially be solved if the previous point is implemented.