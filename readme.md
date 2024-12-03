<!-- we dont how many mock test  there might be many mock test anf also there mighi in each mock create,update,delete,findmany,findUniqe,.... -->

like 
vi.mock("../db",()=>({//..db means from there we importing the prismaClient import here
  prismaClient:{sum:{create:vi.fn()},//sum= this table name
  user:{//you can use multiple table here like user table and also multiple method also can test
    create:vi.fn(),
    update:vi.fn(),
    findMany:vi.fn()
  }
}

}))

<!-- it will be bettor if we will do some how only one line we will write and every thing handle by deepmocking(mock the whole thing deeply. mockout everything) -->


<!-- deep mocking -->
Another way to mock variables is to let vitest figure out the types and mock out all the attributes of the object being mocked.


For example, the prismaClient object has a lot of functions - 

console.log(Object.keys(prismaClient))   ==>you will see request object the that will take it
console.log(Object.keys(prismaClient.request))  ===> you will see  findUnque,create,update,delete,.......many more

What if we could mock out all these keys in a single function call?
Deep mocking


whatever we did  npm install+ this given below

<!-- Install vitest-mock-extended --> for deep mocking

===>npm i -D vitest-mock-extended 


__mock__ create in same directory as sibling from which you file you want to mockout


here db.ts we want to mock out which is in src folder then __mock__ also create in src folder and inside the __mock__ we will create another db.ts bcz we wanted mock out db.ts(original) that is why we write the db.ts inside of the __mock__


//__mock__/db.ts inside  whatever we will logic that will mockout from the original db.ts


//__mock__/db.ts inside this we write this code
==>
import { PrismaClient } from '@prisma/client'
import { beforeEach } from 'vitest'
import { mockDeep, mockReset } from 'vitest-mock-extended'

export const prismaClient = mockDeep<PrismaClient>()


then==>
Remove the mock we added in index.test.ts , 
// vi.mock('../db', () => ({
//   prismaClient: { sum: { create: vi.fn() }}
// }));


simply add a vi.mock("../db")  ==> in test when mock use it will understand that it come __mock__/db.ts

vi.mock('../db');






<!-- mocking return value which is got from const response=await prisma.client  which is actually from getting the db-->
<!-- Mocking return values -->
You can mock the values returned from a mock by using mockResolvedValue 
 
Update index.test.ts

import { prismaClient } from '../__mocks__/db'

prismaClient.sum.create.mockResolvedValue({
  id: 1,
  a: 1,
  b: 1,
  result: 3
});













-----------------------------
which file you want to mock out just craete the shibling from that file __mock__/thatfilename   inside the file name whatever you want to write logic either you deep mock or do your own logic

// that mock file write in test which you want you want


-------------------------------------------------
Spys vs Mocks
While mocks let you mock the functionality of a function call, spies let you spy on function calls.
Right now, we’ve mocked out the database call. Which means even if I pass in wrong inputs to the prismaClient.user.create function, tests would still pass
<!-- even though what are the data inside the prismacreate then also spying the data it will going to correct way
 -->
    const response = await prismaClient.sum.create({    //this will mock out by the __mock__ but 
        data: {
            a: parsedResponse.data.a,
            b: parsedResponse.data.b,
            /*
              a: parsedResponse.data.b,
            b: parsedResponse.data.a,   then also it will pass the test deep mocking//we are never testing here input is going to correct way to db 
           
           solution==>spying test
            */
            result: answer
        }

      

-----------------
Spys vs Mocks
While mocks let you mock the functionality of a function call, spies let you spy on function calls.
Right now, we’ve mocked out the database call. Which means even if I pass in wrong inputs to the prismaClient.user.create function, tests would still pass
 
Problem
Try flipping the a and b inputs

const response = await prismaClient.sum.create({
    data: {
        a: parsedResponse.data.b,
        b: parsedResponse.data.a,
        result: answer
    }
})
Try running the tests, they would still work

npm run test

---------------
This means our tests are flaky. They succeed even when the code is incorrect.
 
Solution
Let’s put a spy on the prismaClient.sum.create function which ensures that the db call inputs are correct
Change the first test to be