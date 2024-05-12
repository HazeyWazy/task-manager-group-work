# COMP2110 Task Manager 2024

As part of your assignment submission, write notes about your implementation
in this file.

Group 92
Members:
* Htet Yamin Ei - Extending Task Card
* Danica Ching - Task Summary Widget
* Lawrence Nelson - Task Timer Widget
* Wai Lin Oo - Weekly Summary Widget


# Extending Task Card
---
* Improved the layout and display of the task card
    - use main.js, task-board.js, task-card.js to edit the css style
* Implemented a pop-up task detail view that shows the full task detail (e.g. if the task has a very long description)
    - use task-card.js for design edit
* Improved the task edit form dialog (<edit-task>) layout
    - use edit-task.js for future edits
* Implemented task deletion
    - delete-task.js
    - models.js (added deleteTask method)
    - may need manual refresh to see complete deletion as it sometimes shows loading...
* Implement a <create-task> component (based on <edit-task>)
    - create-task.js
    - models.js (added createTask method & edited loadData)
    - Still require manual refresh to see newly made task cards

## Widget Descriptions 
----

##  Task Summary Widget : 
The task summary widget shows the count of items displayed on the task boards. There is a count for the total amount of tasks, the tasks in each category, the tasks with priority greater or equal to 5, and the amount of tasks due today. 

Added a pie chart using css for a visual representation the tasks. Each task board on the pie chart is represented by the colour indicated by the circle on the left of the count.

This widget updates automatically when the tasks are added, removed, or changed. 

##  Task Timer Widget : 
implements a count down timer that you can set to a given time, e.g. 15 minutes, counts down and sounds an alarm/flashes the screen when the time  is up.

## Weekly Summary Widget :
 shows a list of the tasks that are due this week that aren't on the Done board in order of due date.

 
