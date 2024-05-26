# COMP 2110 Web Group Report

&nbsp;


## Deployment

Our group has designed a simple task manager with three additional widgets: a task summary widget, a weekly summary widget, and a timer widget. We used Cloudflare Pages to deploy our task manager application because it efficiently and reliably hosts static HTML websites, offering sufficient resources for our project in its free tier. Our deployment process involved several key steps as follows:

Firstly, we started by creating a free Cloudflare account, which is essential for using Cloudflare Pages.
Secondly, we installed Wrangler, a command-line tool provided by Cloudflare, in our project directory using the following command:

	npm install wrangler

Next, we authenticated our devices with the Cloudflare account, which is required only once per device. This step is accomplished with the following command:

	npx wrangler login

We then created the pages for the project with a unique name “comp2110-group92”, which will be part of the URL for the deployed site. We used the following command:

	npx wrangler pages project create <project-name>

Thus, our task manager website URL is https://828dfc9b.comp2110-group92.pages.dev/.

Finally, we published our application with the following command:

	npx wrangler pages publish .


## Updating the Website

Firstly, the necessary files, such as HTML, CSS, JavaScript, or any other assets, are edited in the project directory on our local machine. Before deploying the changes, the website is tested locally to ensure everything works as expected, either by using a local live server or by simply opening the HTML files in our browser to verify the changes. Next, the changes are committed using Git, a version control system that helps track changes and facilitates collaboration with team members. Once the changes are committed, the updated site is deployed using the following command line to publish the updates to Cloudflare Pages.


	npx wrangler pages publish .

&nbsp;

# What was achieved 

## Extending The Task Card

Although the original task cards had basic functionality for our task manager, we have now implemented additional features and enhanced the website's look and feel with CSS. We adopted a consistent theme throughout the website, using shades of blue and complementary colours to make it more visually appealing.

We added the title “My Tasks” for the task board, rounded the edges of the task cards, centred the fonts, and modified the task priority indicator to be encased in a rounded circle container with a shadow effect, enhancing the task manager's appearance. To address readability issues, we added a "Show more" button for tasks with long descriptions. When clicked, a container with the full task description pops up on the screen. Additionally, we changed the style of the "Edit" button and the dialog box that appears when the button is clicked to blue, matching the overall look of the website.

Task deletion and creation are the most important features to have in a task manager. A delete button is added to each task card in the task manager, allowing the users to remove tasks from the task board using the DELETE method in the HTTP request. For task creation, a "Create New Task" button is placed above the task board next to the title "My Tasks." Users can click this button and fill out a dialog box to create a new task in any category. Although it might be more logical to restrict new tasks to the ToDo category, we wanted to give users the freedom to choose any category. This way, they don't have to create a task in ToDo first and then move it to Doing or Done by editing it, avoiding extra steps. Similar to task deletion, the POST method in the HTTP request is used to add new tasks to the database.

All these enhancements significantly improve the usability and aesthetics of our task manager application.


## Widgets
The widgets are additional features used to enhance the usability of the website. To keep the designs consistent, we made a file called shareStyle.js that holds some css code that is shared among the widgets. Some widgets still had additional css that was not shared and is located in the widget file that is using it.

### Task Summary

Task summary widget displays the count of tasks in each category, the number of tasks with a priority greater or equal to 5, and the count of tasks due today. This was done by using a function to call the values located in the “models.js” file. Additionally, a pie chart was made using css with a method to plug in javascript variables for a visual representation of the count of tasks in each category. 

### Weekly Summary

The weekly summary widget is designed to provide an overview of tasks that are due within the current week. It displays the date range for the current week, starting from Monday, and ending on Sunday helping users keep track of the task in a week-by-week format, ensuring no deadlines are missed.

### Timer 

The task timer widget’s purpose is to help regiment the time spent on individual tasks and improve time management. It lets the user set how many minutes and seconds they would like to spend on a task. Once the time is up, the widget will have a red flashing banner and an alarm tone rings to notify the user.

&nbsp;

# Challenges

Completing the project presented several challenges, both technical and organisational. One of the main technical challenges was our unfamiliarity with Lit components and the overall structure of the code. 

Initially, navigating through the various JavaScript files to understand the webpage layout was overwhelming. We struggled to figure out how to integrate and display the widgets properly, as well as how to manage the CSS associated with them. This led to delays because we had to experiment and iterate multiple times to achieve the desired functionality and appearance.

Another significant technical challenge was ensuring the task manager's features, such as task deletion and creation, worked seamlessly with our chosen HTTP methods (DELETE and POST). Integrating these functionalities while maintaining a user-friendly interface required careful coding and extensive testing. 

Additionally, designing the website to be both functional and visually appealing was difficult. We debated colour schemes, layouts, and the overall visual theme, making numerous revisions based on feedback.
On the organisational side, communication within the group initially posed difficulties. Coordinating tasks, aligning on the project vision, and ensuring everyone was on the same page took effort and patience. Different team members had varying levels of expertise and understanding, leading to misunderstandings and inefficiencies. We had to establish clear communication channels and regular check-ins to synchronise our efforts and resolve issues promptly.

Managing version control with Git also introduced challenges. Tracking changes accurately, merging them without conflicts, and deploying updates required discipline and adherence to best practices. Collaborative coding meant frequent pull requests and code reviews, which, while beneficial, added to the workload and required careful coordination.

Despite these challenges, our team adapted and found ways to overcome the obstacles. We dedicated time to learning and familiarising ourselves with Lit components and the project structure, which gradually improved our efficiency. Establishing a consistent and clear communication routine helped reduce misunderstandings and streamline our collaborative efforts. By the end of the project, we developed a more cohesive workflow, better communication, and a stronger understanding of the technologies we were using.

&nbsp;

# Rewards

While we faced many challenges along the way, we knew that overcoming them would be worth it, and that is the rewarding feeling we get. Two of the most rewarding aspects we experienced while collaborating on this task manager project were implementing task creation and deletion, and integrating LitElement into our project to create meaningful and fun widgets.

Our project, being a task manager, emphasised how tasks should be managed, including the actions to create and delete them. However, this was easier said than done. The biggest hurdle in implementing this functionality was understanding the web server we were provided. With little to no experience in JavaScript and a lack of practical knowledge in HTTP requests, the implementation of task creation and deletion was initially put on hold. However, after searching the internet and working together, we were able to use and modify the existing task update (edit-task) to work for both creation and deletion. This gave us the affirmation that we have the skill to take on the challenges we were given and made the implementation itself a truly rewarding experience.

Not far behind in giving us that rewarding feeling was figuring out how to use LitElement. Widgets were another theme in the assignment, and three of our group members were assigned individual tasks to create their own unique widgets. Most of us were confused and, like lost children in search of their mother, or in this case, the course material. After a big session of reviewing and learning about LitElement, we were ready. Not long after, we finished implementing each widget that was assigned to us. The immense rewarding feeling we got after completing the widgets gave us confidence and the thirst to take on more web development projects in the future.

&nbsp;

# Individual Reflection


## Htet
Choice: Extending Task Card

I initially planned to work on the calendar widget alongside extending the task card with Danica. However, I decided to focus solely on the task card due to its critical role in our task management project, as the added features make the task manager more practical, user-friendly, and visually appealing. The most challenging part of extending the task cards was the implementation of task deletion and creation since it involved understanding HTTP requests and their interaction with the back-end server. Additionally, JavaScript is a relatively new language to me, which added to the difficulty. Nevertheless, after painstaking research and trial and error, I successfully implemented task creation and deletion. Despite this success, the functionality is not working as I intended. Users need to refresh the website to see changes such as editing, deleting, and creating tasks. My goal was to have these updates occur in real-time without needing a page refresh. Although it didn't turn out exactly as planned, the achievement of implementing task deletion and creation was incredibly rewarding. This experience significantly improved my coding skills and brought me great satisfaction.

## Danica
Widget Choice: Task Summary

I chose to do the task summary widget because at the start of the task delegation, we planned to split the work of the task manager and I wanted to choose a widget that was ranked as easy so I had more time to contribute for the task manager card extension. Later on, someone else stepped up to do the task manager so I focused my attention entirely on the widget. I had some trouble understanding the requirements of the widget as the description was a little vague. I didn’t know what “high priority” was and wrote some unnecessary code. The widget ended up being quite simple so I challenged myself to make a functioning pie chart as an additional feature to the widget. This was my first time working with shadow doms and I struggled with figuring out how to get the css variables to work. Eventually I was able to figure out a way to get the pie chart to update dynamically. This experience has improved my ability to read someone else’s code and gain a better understanding of shadow doms.

## Wai Lin

Widget Choice: Weekly Summary

I opted for the Weekly Summary widget because other team members had already selected the 1-star widgets, leaving only the mood widget and this one available. When unsure what to pick, my team member assigned me to the Weekly Summary Widget. As I delved into the project, I realised its significance. I like the idea of organising the tasks week by week, giving a clear overview of what one needs to accomplish. It helps them manage their time effectively. The most challenging part for me during this project was accurately calculating the week range of the current week.JavaScript’s getDay() and getDate() return numerical values where 0 represents Sunday, which initially confused me in calculating the dates. I had to fix some errors to ensure that the week consistently starts on Mondays and ends on Sundays. Moreover, I also had to consider if the whole week falls into the same month or not so that it displays as “(DD - DD) MM” or “(DD/MM - DD/MM)” for the current week range. Despite this confusion, overcoming these challenges helped improve my problem-solving and data manipulation in JavaScript.

## Lawrence

Widget Choice: Timer

My part of the assignment was the task timer widget. I chose this widget because I felt I had a good idea of how to create the different components described. However I came across a couple of issues that had me stumped for a while. I had initially designed my widget so that the input and countdown were in seconds. I ran into my first problem when I tried to display minutes as well as seconds. The solution turned out to be the count divided by 60 would give me the remaining minutes, and modulo 60 of the count would give me the seconds. At this point my team members provided me with some feedback and said that I should have the input in minutes and seconds. This task was a bit of a challenge for me because implementing these changes broke my timer to where it would only count down one second and freeze. The issue had been caused by placing the process of exchanging minutes and seconds into a larger count in only seconds inside the wrong loop. This caused the if statement to only trigger once and then end the countdown. Overall this assignment was very rewarding as it was my first time using java script. It also helped further my understanding of mathematics in the scope of programming.
