import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, CheckCircle2, Circle, Filter } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { toast } from './ui/use-toast';

const TodoMaker = ({ userData }) => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const storedTodos = localStorage.getItem(`todos_${userData.id}`);
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, [userData.id]);
        
  useEffect(() => {
    localStorage.setItem(`todos_${userData.id}`, JSON.stringify(todos));
  }, [todos, userData.id]);

  // Replace Helmet: set title and meta description
  useEffect(() => {
    document.title = 'Todo List - FocusFy';
    const metaName = 'description';
    let meta = document.querySelector(`meta[name="${metaName}"]`);
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = metaName;
      document.head.appendChild(meta);
    }
    meta.content = "Manage your tasks and stay organized with FocusFy's todo list.";
  }, []);

  const addTodo = () => {
    if (!newTodo.trim()) {
      toast({
        title: "Empty Task",
        description: "Please enter a task description",
        variant: "destructive"
      });
      return;
    }

    const todo = {
      id: Date.now(),
      text: newTodo,
      completed: false,
      createdAt: new Date().toISOString()
    };

    setTodos([todo, ...todos]);
    setNewTodo('');
    toast({
      title: "Task Added! ✅",
      description: "Keep up the great work!"
    });
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
    toast({
      title: "Task Removed",
      description: "Task has been deleted"
    });
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const stats = {
    total: todos.length,
    completed: todos.filter(t => t.completed).length,
    active: todos.filter(t => !t.completed).length
  };

  return (
    <>
      {/* Title/meta handled via useEffect */}

      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950 p-4 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold text-white mb-2">Todo List</h1>
            <p className="text-purple-300">Organize your tasks and boost productivity</p>
          </motion.div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-slate-900/50 backdrop-blur-xl border border-purple-500/20 rounded-xl p-4"
            >
              <p className="text-slate-400 text-sm mb-1">Total Tasks</p>
              <p className="text-3xl font-bold text-white">{stats.total}</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-slate-900/50 backdrop-blur-xl border border-green-500/20 rounded-xl p-4"
            >
              <p className="text-slate-400 text-sm mb-1">Completed</p>
              <p className="text-3xl font-bold text-green-400">{stats.completed}</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-slate-900/50 backdrop-blur-xl border border-orange-500/20 rounded-xl p-4"
            >
              <p className="text-slate-400 text-sm mb-1">Active</p>
              <p className="text-3xl font-bold text-orange-400">{stats.active}</p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-900/50 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6 mb-6"
          >
            <div className="flex gap-3">
              <Input
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                placeholder="What needs to be done?"
                className="flex-1 bg-slate-800/50 border-purple-500/30 focus:border-purple-500 text-white placeholder:text-slate-500"
              />
              <Button
                onClick={addTodo}
                className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600"
              >
                <Plus className="w-5 h-5" />
              </Button>
            </div>

            <div className="flex gap-2 mt-4">
              {['all', 'active', 'completed'].map((f) => (
                <Button
                  key={f}
                  onClick={() => setFilter(f)}
                  variant={filter === f ? 'default' : 'outline'}
                  size="sm"
                  className={filter === f ? 'bg-purple-600' : 'border-purple-500/30'}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </Button>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-3"
          >
            <AnimatePresence>
              {filteredTodos.map((todo) => (
                <motion.div
                  key={todo.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-slate-900/50 backdrop-blur-xl border border-purple-500/20 rounded-xl p-4 hover:border-purple-500/40 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleTodo(todo.id)}
                      className="flex-shrink-0 transition-transform hover:scale-110"
                    >
                      {todo.completed ? (
                        <CheckCircle2 className="w-6 h-6 text-green-400" />
                      ) : (
                        <Circle className="w-6 h-6 text-slate-500" />
                      )}
                    </button>
                    <p className={`flex-1 ${
                      todo.completed
                        ? 'text-slate-500 line-through'
                        : 'text-white'
                    }`}>
                      {todo.text}
                    </p>
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {filteredTodos.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <p className="text-slate-500 text-lg">No tasks found</p>
                <p className="text-slate-600 text-sm mt-2">
                  {filter === 'completed'
                    ? 'Complete some tasks to see them here'
                    : 'Add a new task to get started'}
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default TodoMaker;