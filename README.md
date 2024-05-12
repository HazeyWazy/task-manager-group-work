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
shows statistics from the currently displayed tasks, how many  tasks in each category, how many high priority tasks, how many due today.  Updates when tasks are added, removed or changed.

Added a pie chart to represent the tasks. There is a button called "Refresh Chart" that must be clicked to display the correct current values of the task manager. 

Each task board on the pie chart is represented by the colour indicated by the circle on the left.

High priority count shows the values of the tasks with a priority level greater or equal to 5.

##  Task Timer Widget : 
implements a count down timer that you can set to a given time, e.g. 15 minutes, counts down and sounds an alarm/flashes the screen when the time  is up.

## Weekly Summary Widget :
 shows a list of the tasks that are due this week that aren't on the Done board in order of due date.

 
