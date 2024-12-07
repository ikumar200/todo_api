const express=require("express");
const authRoute=require("./routes/authRoute");
const todoRoute=require("./routes/todoRoute");
const app=express();
 app.use(express.json());

app.use("/auth",authRoute);
app.use("/todo",todoRoute);

app.listen(5000,()=>{
    console.log("listening on port:")
});