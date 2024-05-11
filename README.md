# COMP2110 Task Manager 2024

As part of your assignment submission, write notes about your implementation
in this file.

Group 92
Members:
* Danica Ching - Task Summary Widget
* Htet Yamin Ei - Extending Task Card
* Lawrence Nelson - Task Timer Widget
* Wai Lin Oo - Weekly Summary Widget


# Extending Task Card
---
* improved the layout and display of the task card
    - use main.js, task-board.js, task-card.js to edit the css style
* implement a pop-up task detail view that shows the full task detail (e.g. if the task has a very long description)
    - use task-card.js for design edit
* improved the task edit form dialog (<edit-task>) layout
    - use edit-task.js for future edits
* Implement task deletion
* Implement a <create-task> component (based on <edit-task>)

## Widget Descriptions 
----

##  Task Summary Widget : 
shows statistics from the currently displayed tasks, how many  tasks in each category, how many high priority tasks, how many due today.  Updates when tasks are added, removed or changed.

##  Task Timer Widget : 
implements a count down timer that you can set to a given time, e.g. 15 minutes, counts down and sounds an alarm/flashes the screen when the time  is up.

## Weekly Summary Widget :
 shows a list of the tasks that are due this week that aren't on the Done board in order of due date.

 
