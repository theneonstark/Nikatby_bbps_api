import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableHeader, TableRow, TableCell, TableBody } from "@/components/ui/table";

export default function Progresses() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasks, setTasks] = useState([
    { id: 1, title: "Landing Page Design", completed: false },
    { id: 2, title: "Dashboard Builder", completed: true },
    { id: 3, title: "Mobile App Design", completed: true },
    { id: 4, title: "Illustrations", completed: false },
    { id: 5, title: "Promotional LP", completed: true },
  ]);

  const [selectAll, setSelectAll] = useState(false);

  // ✅ Function to Toggle Task Completion
  const toggleTask = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // ✅ Toggle All Tasks
  const toggleAllTasks = () => {
    const newCompletedState = !selectAll;
    setSelectAll(newCompletedState);
    setTasks((prevTasks) =>
      prevTasks.map((task) => ({ ...task, completed: newCompletedState }))
    );
  };

  const projects = [
    { name: "Horizon UI PRO", status: "Approved", date: "18 Apr 2022", progress: 80 },
    { name: "Horizon UI Free", status: "Disable", date: "18 Apr 2022", progress: 40 },
    { name: "Marketplace", status: "Error", date: "20 May 2021", progress: 90 },
    { name: "Weekly Updates", status: "Approved", date: "12 Jul 2021", progress: 60 },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 mt-0 !m-0">
      {/* Complex Table */}
      <Card className="p-4 bg-blue-500 text-white shadow-lg !m-0 !p-4">
        <h2 className="text-lg font-bold mb-3">Project Progress</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Progress</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project, index) => (
              <TableRow key={index}>
                <TableCell>{project.name}</TableCell>
                <TableCell>{project.status}</TableCell>
                <TableCell>{project.date}</TableCell>
                <TableCell>
                  <Progress value={project.progress} max={100} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Task List */}
      <Card className="p-4 bg-green-500 text-white shadow-lg !m-0 !p-4">
        <h2 className="text-lg font-bold mb-3">Tasks</h2>

        {/* Select All Checkbox */}
        <div className="flex items-center gap-2 my-2">
          <Checkbox checked={selectAll} onCheckedChange={toggleAllTasks} />
          <span className="font-semibold">Select All</span>
        </div>

        {/* Task Items */}
        {tasks.map((task) => (
          <div key={task.id} className="flex items-center gap-2 my-2">
            <Checkbox checked={task.completed} onCheckedChange={() => toggleTask(task.id)} />
            <span className={`${task.completed ? "line-through" : ""}`}>{task.title}</span>
          </div>
        ))}
      </Card>

      {/* Calendar */}
      <Card className="p-4 bg-purple-500 text-white shadow-lg !m-0 !p-4 flex flex-col items-center justify-center">
        <h2 className="text-lg font-bold text-center mb-3">March 2025</h2>
        <div className="flex justify-center">
          <Calendar selected={selectedDate} onChange={setSelectedDate} />
        </div>
      </Card>
    </div>
  );
}
