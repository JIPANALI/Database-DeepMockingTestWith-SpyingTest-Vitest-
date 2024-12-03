import express from "express";
import { z } from "zod";
import { prismaClient } from "./db";

export const app = express();
app.use(express.json());

const sumInput = z.object({
    a: z.number(),
    b: z.number()
})

app.post("/sum", async (req, res) => {
    const parsedResponse = sumInput.safeParse(req.body)
    
    if (!parsedResponse.success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const answer = parsedResponse.data.a + parsedResponse.data.b;

    const response = await prismaClient.sum.create({    //this will mock out by the __mock__ but 
        data: {
            a: parsedResponse.data.a,
            b: parsedResponse.data.b,
            /*
              a: parsedResponse.data.b,
            b: parsedResponse.data.a,   then also it will pass the test deep mocking//we are never testing here input is going to correct way to db 
           
           solution==>spying test
           now if you check with this then this test will failed
            */
            result: answer
        }
    })

    res.json({
        answer,
        id1: response.id,  //as well mockout the return value which is got from here   const response = await prismaClient.sum.create({   //that is  response.id 
        
    })

});

app.get("/sum", (req, res) => {
    const parsedResponse = sumInput.safeParse({
        a: Number(req.headers["a"]),
        b: Number(req.headers["b"])
    })
    
    if (!parsedResponse.success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const answer = parsedResponse.data.a + parsedResponse.data.b;

    res.json({
        answer
    })
});