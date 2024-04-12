# COMP2110 Task Manager 2024

As part of your assignment submission, write notes about your implementation
in this file.

Group 92
Members:
Danica Ching,
Htet Yamin Ei,
Lawrence Nelson,
Wai Lin Oo


# Extending task card
---
improve the layout and display of the task card
implement a pop-up task detail view that shows the full task detail (e.g. if the task has a very long description)
improve the task edit form dialog (<edit-task>) layout
Implement task deletion
Implement a <create-task> component (based on <edit-task>)



# Widget Delegation 
------
(just remove unchosen)
Task Summary Widget -
Calendar Widget -
Task Timer Widget -
Weekly Summary Widget -  
Memory Game Widget -
Mood Widget -
Game Widget - 
Exploding Task Widget -


# Widget Descriptions 
----

# Task Summary Widget : 
shows statistics from the currently displayed tasks, how many  tasks in each category, how many high priority tasks, how many due today.  Updates when tasks are added, removed or changed.

# Calendar Widget :
 shows the calendar for the current month and highlights the   current day and days where tasks are due.  Optionally, allows display of other months via interactive controls.

# Task Timer Widget : 
implements a count down timer that you can set to a given time, e.g. 15 minutes, counts down and sounds an alarm/flashes the screen when the time  is up.

# Weekly Summary Widget :
 shows a list of the tasks that are due this week that aren't on the Done board in order of due date.
Memory Game Widget **: Implements a memory game based on the task list. When activated, blanks out the page and asks a question like 'what is the priority of the top task on Todo?'.
 
# Mood Widget : 
 shows different colours and patterns, is affected in some way by the time of day, day of week and the number of tasks in one or more of the categories  (e.g. bright sparkles on friday when there are no more Todo tasks).

# Game Widget :
 within reason, adapt a game implementation (eg. tic-tac-toe, not Doom) as a web component widget.  Game code can be from a third party (with acknowledgement) but you must port it to this framework and make it work with the rest of the app.

# Exploding Task Widget :
 shows a red button that when pressed, causes all tasks to explode in a dramatic graphical manner. When the dust settles, all of the tasks have been moved  to the Done board.