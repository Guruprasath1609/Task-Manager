const express=require('express')
const cors=require('cors')
const dotenv=require('dotenv')
const connectDB=require('./config/db')
const taskRoutes=require('../backend/routes/taskRoutes')



const app=express()
dotenv.config()
app.use(express.json())
app.use(cors())


const PORT=process.env.PORT
connectDB()

app.get('/',(req,res)=>{
    res.send("Welcome to the Project!")
})

// API Routes
app.use('/api/tasks',taskRoutes)


app.listen(PORT,()=>{
    console.log(`Server is running at http://localhost:${PORT}`);
    
})