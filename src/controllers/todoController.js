const prisma=require("../models/prismaModel");

const getTodos=async (req,res)=>{
    const userId=req.user.userId;
    
    try{
        const todos=await prisma.todo.findMany();
        res.status(200).json({
            data:todos
        })
    }catch(err){
        res.status(500).json({msg:"something went wrong"});
    }
}

const createTodo=async (req,res)=>{
    const userId=req.user.userId;
    const {title,description}=req.body;

    try{
        const newTodo=await prisma.todo.create({
            data:{
                title,
                description,
                userId
            }
        });
        res.status(201).json({ data: newTodo });
    }catch (err){
        res.status(500).json({
            msg:"something went wrong"
        });
    }
};

const updateTodo = async (req, res) => {
    const userId = req.user.userId; // Extract userId from token
    const { id } = req.params; // Extract todo ID from URL
    const { title, description } = req.body;

    try {
        const todo = await prisma.todo.findUnique({ where: { id: parseInt(id) } });

        // Check if the todo belongs to the user
        if (!todo || todo.userId !== userId) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        // Update the todo
        const updatedTodo = await prisma.todo.update({
            where: { id: parseInt(id) },
            data: { title, description }
        });

        res.status(200).json(updatedTodo);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};

// Delete a todo
const deleteTodo = async (req, res) => {
    const userId = req.user.userId; // Extract userId from token
    const { id } = req.params;

    try {
        const todo = await prisma.todo.findUnique({ where: { id: parseInt(id) } });

        // Check if the todo belongs to the user
        if (!todo || todo.userId !== userId) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        // Delete the todo
        await prisma.todo.delete({ where: { id: parseInt(id) } });

        res.status(204).send(); // No content response
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};

module.exports = {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo
};