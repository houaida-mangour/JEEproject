import React from "react";


class AddTasks extends React.Component{
    state = {
        taskName: "",
        description: "",
        priority: "",
        status: ""
    };
    add = (e) => {
        e.preventDefault();
        if(this.state.taskName === "" || this.state.description === "" || this.state.priority === "" || this.state.status === ""){
            alert("ALl the fields are mandatory!");
            return;
        }
        this.props.addTasksHandler(this.state);
        this.setState({taskName: "", description: "", priority: "", status: ""});
        //this.props.history.push("/");
    }

    render(){
        return (
            <div className="ui main">
                <h2>Add Task</h2>
                <form className="ui form" onSubmit={this.add}>
                    <div className="field">
                        <label>Task</label>
                        <input type="text"
                         name="taskName"
                         placeholder="TaskName"
                         value={this.state.taskName} 
                         onChange={(e)=>this.setState({taskName:e.target.value})} />
                    </div>
                    <div className="field">
                        <label>description</label>
                        <input type="text"
                         name="description" 
                         placeholder="Description" 
                         value={this.state.description} 
                         onChange={(e)=>this.setState({description:e.target.value})} />
                    </div>
                    <div className="field">
                        <label>Priority</label>
                        <input type="text" 
                        name="Priority"
                         placeholder="Priority" 
                         value={this.state.priority} 
                         onChange={(e)=>this.setState({priority:e.target.value})} />
                    </div>
                    <div className="field">
                        <label>Status</label>
                        <input type="text" 
                        name="Status" 
                        placeholder="Status" 
                        value={this.state.status} 
                        onChange={(e)=>this.setState({status:e.target.value})} />
                    </div>
                    <button className="ui button blue">Add</button>
                </form>
            </div> 
        )
    }
}
export	default AddTasks;