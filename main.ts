#! /usr/bin/env node
import inquirer from "inquirer";

const randomNumber: number = Math.floor (10000 + Math.random() * 9000)

let myBalance: number = 0

let ancwer = await inquirer.prompt(
    [
        {
            name: "students",
            type: "input",
            message: "Enter student name:",
            validate: function (val) {
                if(val.trim() !== ""){
                    return true;
                }
                return "Please enter a non-empty value.";
            },
        },
        {
            name: "courses",
            type: "list",
            message: "Select the course to enrolled",
            choices: ["MS.Office","HTML","Javascript","Typescript","Python"]
        }
    ]
);

const tutionFee: {[key: string]: number} = {
    "MS.Office": 2000,
    "HTML": 2500,
    "Javascript": 5000,
    "Typescript": 6000,
    "Python": 10000
};

console.log(`\nTution Fees: ${tutionFee[ancwer.courses]}/-\n`);
console.log(`Balance: ${myBalance}\n`);

let paymentType = await inquirer.prompt([
    {
        name: "payment",
        type: "list",
        message: "Select payment method",
        choices: ["Bank Transfer","Easypaisa","Jazzcash"]
    },
    {
        name:"amount",
        type:"input",
        message:"Transfer Money:",
        validate: function (value) {
            if(value.trim() !== ""){
                return true;
            }
            return "Please enter a non-empty value.";
        },
    }
]);

console.log(`\nYou select payment method ${paymentType.payment}\n`);

const tutionFees = tutionFee[ancwer.courses];
const paymentAmount = parseFloat(paymentType.amount)

if(tutionFees === paymentAmount) {
    console.log(`Congratulations, you have successfully enrolled in ${ancwer.courses}.\n`);

    let ans = await inquirer.prompt([
        {
            name: "select",
            type: "list",
            message: "What would you like to do next?",
            choices: ["View Status","Exit"]
        }
    ])
    if(ans.select === "View Status"){
        console.log("\n*********Status*********\n");
        console.log(`Student Name: ${ancwer.students}`);
        console.log(`Student ID: ${randomNumber}`);
        console.log(`Course: ${ancwer.courses}`);
        console.log(`Tution Fees Paid: ${paymentAmount}`);
        console.log(`Balance: ${myBalance += paymentAmount}`);
    } else{
        console.log("\nExiting Student Management System");
    }

}else{
    console.log("Invalid amount due to course\n");
}