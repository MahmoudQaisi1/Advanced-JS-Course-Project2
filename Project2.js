const { resolve } = require("path");

class Task{

    #isDone = false;
    #task;
    #dueDate;
    #priority;
    #isLate = false;
    #options = { //for date formatting.
        timeZone: 'UTC',
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }


    static #tasks = [];

    constructor(task,dueDate,priority = 0){
        this.task = task;
        this.dueDate = dueDate;
        this.priority = priority;
        Task.#addNewTask(this);
    }

    set task(task){
        if(typeof task === "string")
            this.#task = task
        else
            console.log("Task must be a string\n");
    }
    
    get task(){
        return this.#task;
    }

    set dueDate(dueDate){
        if (dueDate instanceof Date) {
            this.#dueDate = dueDate;
        }else{
            console.log("Due Date must be a date object\n");
        }
    }

    get dueDateS(){
        return this.#dueDate.toLocaleDateString('en-US', this.#options)
    }

    get dueDate(){
        return this.#dueDate
    }

    done(){
        this.isLate();
        this.#isDone = true;
    }
    
    get isDone(){
        return (this.#isDone) ? true: false;
    }

    set priority(priority){
        if(typeof priority === "number" && priority >= 0)
        this.#priority = priority;
        else
        console.log("priority must be a positive number\n");
    }

    get priorityString(){
        let ps = ""
        if(this.#priority === 0){
            return "Normal"
        }else{
            ps = "Important";
            for(let i = this.#priority; i > 1; i--){
                ps = "Very " + ps;
            }
            return ps;
        }
    }

    get priorityValue(){
        return this.#priority;
    }

    isLate(){
        if(Date.now() > this.#dueDate && !this.#isDone){
            this.#isLate = true;
        }
        return (this.#isLate) ? "Late" : "Not Late"; 
    }

    print(i = ""){
        console.log(`Task #${i}: (${(this.isDone) ? "Finished" : "Not finished"} ${this.isLate()}) ${this.task}, Due Date: ${this.dueDateS} Priority: ${this.priorityString}\n`);
    }

    static #addNewTask(task){
        Task.#tasks.push(task);
    }

    static listAllTasks(){
        if(Task.#tasks.length > 0)
            Task.#tasks.forEach((task,i) =>{
            task.print(i+1);
            })
        else{
            console.log("Empty To Do List");
        }
    }

    static listCompletedTasks(){
        let comp = 0;
        Task.#tasks.forEach((task,i) =>{
            if(task.isDone){
                task.print(i+1);
                comp++;
            }
        })

        if(comp === 0){
            console.log("No completed Tasks");
        }
    }

    static markATaskAsDone(i){
        if (this.#tasks.length >= i) {
            this.#tasks[i-1].done();
        }
        this.#tasks[i-1].print(i);
    }

    static deleteATask(i){
        if (this.#tasks.length >= i) {
            console.log("deleting..");
            this.#tasks[i-1].print(i);
            this.#tasks.splice(i-1,1);
        }
    }

    static sortByDueDate(){
        this.#tasks.sort((a,b)=>{
            if(a.dueDate > b.dueDate){
                return 1;
            }else if(a.dueDate < b.dueDate){
                return -1;
            }else{
                return 0;
            }
        });
        Task.listAllTasks();
    }

    static sortByPriority(){
        this.#tasks.sort((a,b)=>{
            if(a.priorityValue > b.priorityValue ){
                return -1;
            }else if(a.priorityValue  < b.priorityValue ){
                return 1;
            }else{
                return 0;
            }
        });
        Task.listAllTasks();
    }

    static clearAllTasks(){
        this.#tasks = [];
    }
}



const main = ()=>{

    const message = `
***************************
Welcome to JS TODO-APP
***************************
Select an action:
1) Add a new task
2) List all tasks
3) List completed tasks
4) Mark the task as done
5) Delete a task
6) Sort tasks by the due date
7) Sort tasks by priority
8) Clear all tasks
***************************
What's your choice? (Enter 'exit' to exit)\n`
    const readline = require("readline")

    const rl = readline.createInterface({
        input: process.stdin, 
        output: process.stdout,
    })

    function ask(question) {
        rl.question(question, async (answer) => {
            if (answer === 'exit') {
                process.exit(1)
              }
            if(typeof (answer = parseInt(answer)) === 'number'){
                switch (answer) {
                    case 1:
                        let task = await new Promise((resolve) => {
                            rl.question("Enter The Task:\n", (answer) => {
                              resolve(answer);
                            });
                          });
                
                        let date = await new Promise((resolve) => {
                            rl.question("Enter The Due Date:(Please Use the Format 'YYYY-MM-DD')\n", (answer) => {
                              resolve(new Date(answer));
                            });
                          });
                
                        let priority = await new Promise((resolve) => {
                            rl.question("Define the priority:(0:normal,1:important...)\n", (answer) => {
                              resolve(parseInt(answer));
                            });
                          });
                
                        new Task(task, date, priority);
                        Task.listAllTasks();
                        break;
                    case 2:
                        Task.listAllTasks();
                        break;
                    case 3:
                        Task.listCompletedTasks();
                        break;
                    case 4:
                        let done = await new Promise((resolve)=>{
                            Task.listAllTasks();
                            rl.question("What Task do ypu wish to declare done?\n", (answer) => {
                                resolve(parseInt(answer));
                              });
                        });
                        Task.markATaskAsDone(done);
                        break;
                    case 5:
                        let del = await new Promise((resolve)=>{
                            Task.listAllTasks();
                            rl.question("What Task do you wish to delete?\n", (answer) => {
                                resolve(parseInt(answer));
                              });
                        });
                        Task.deleteATask()
                        break;
                    case 6:
                        Task.sortByDueDate();
                        break;
                    case 7:
                        Task.sortByPriority();
                        break;
                    case 8:
                        Task.clearAllTasks();
                        break;
                    default:
                        console.log("Unrecognized Input");
                        break;
                }
            }else{
                console.log("Unrecognized Input");
            }
            ask(question)
        })
    }

    ask(message)
}

main();