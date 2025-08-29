const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

//User Data
const FULL_NAME = "abhishek_jain";
const DOB = "19022004";
const EMAIL = "abhishek.jain2022@vitstudent.ac.in";
const ROLL_NUMBER = "22BEC0237";

//Function to alt caps in reverse
function alternateCapsReverse(str) {
  const reversed = str.split("").reverse().join("");
  let finalStr = "";
  for (let i = 0; i < reversed.length; i++) {
    if (i % 2 === 0) {
      finalStr += reversed[i].toUpperCase();
    } else {
      finalStr += reversed[i].toLowerCase();
    }
  }
  return finalStr;
}

//bfhl api endpoint
app.post("/bfhl", (req, res) => {
  try {
    const input = req.body.data;

    if (!Array.isArray(input)) {
      return res.status(400).json({
        is_success: false,
        message: "'data' should be an array",
      });
    }

    let odd_numbers = [];
    let even_numbers = [];
    let alphabets = [];
    let special_characters = [];
    let sum = 0;
    let alphaString = "";

    input.forEach((item) => {
      if (/^-?\d+$/.test(item)) {
        const num = parseInt(item, 10);
        if (num % 2 === 0) {
          even_numbers.push(item.toString());
        } else {
          odd_numbers.push(item.toString());
        }
        sum += num;
      } else if (/^[a-zA-Z]+$/.test(item)) {
        alphabets.push(item.toUpperCase());
        alphaString += item;
      } else {
        special_characters.push(item);
      }
    });

    //response
    const response = {
      is_success: true,
      user_id: `${FULL_NAME}_${DOB}`,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: sum.toString(),
      concat_string: alternateCapsReverse(alphaString),
    };

    res.status(200).json(response);

  } catch (err) {
    res.status(500).json({
      is_success: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
});

app.listen(3000, () => {
  console.log("Server is running on localhost port 3000");
});
