# To-Do List Manager Project:

This project is a command-line to-do list manager application built with Node.js and JavaScript. The application provides a set of features to help users organize their tasks efficiently.

## Key Features:

- Adding New Tasks: Users can add new tasks to the to-do list. Each task includes a description, due date, and priority level. A Task object prototype is used to represent these properties.

- Marking Tasks as Completed: Users can mark tasks as completed. The application uses the filter() method to find the task in the array and update its status.

- Deleting Tasks: Users can delete tasks from the to-do list. The splice() method is used to remove tasks from the array.

- Filtering Tasks: Users can filter the list to view either completed or incomplete tasks, making it easier to focus on specific tasks.

- Sorting Tasks: Tasks can be sorted based on due date or priority, allowing users to organize their to-do list in a way that suits their needs.

- User Interaction: The application uses stdin to read input from the user. Users are presented with a list of actions they can perform, such as adding tasks, marking them as completed, deleting tasks, and more.

The project leverages JavaScript's array methods like push(), filter(), and sort() 
to manage the list of tasks efficiently. When a user adds a new task, a new Task object is 
created and added to the array. The application provides a user-friendly interface through the 
command line, making it easy for users to interact with their to-do list.

Overall, this project helps users stay organized by providing a flexible and feature-rich to-do list management tool.
