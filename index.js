const express = require('express');
const { mean, median, mode } = require('./helpers');
const ExpressError = require('./expressError');
const fs = require('fs');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/mean', (req, res, next) => {
  try {
    const arr = req.query.nums.split(',');
    for (let num of arr) {
      if (!parseInt(num)) {
        throw new ExpressError(`${num} is not a valid number`, 400);
      }
    }
    const nums = arr.map((num) => parseInt(num));
    const response = {
      response: { operation: 'mean', value: mean(nums) },
    };
    if (req.query.save === 'true') {
      console.log('Hi!');
      fs.writeFile('results.json', response, 'utf8', (err) => {
        if (err) {
          throw new ExpressError(err, 400);
        }
        return res.status(200).json(response);
      });
    }
  } catch (e) {
    next(e);
  }
});
app.get('/median', (req, res, next) => {
  try {
    const arr = req.query.nums.split(',');
    for (let num of arr) {
      if (!parseInt(num)) {
        throw new ExpressError(`${num} is not a valid number`, 400);
      }
    }
    const nums = arr.map((num) => parseInt(num));
    const response = {
      response: { operation: 'median', value: median(nums) },
    };
    return res.status(200).json(response);
  } catch (e) {
    next(e);
  }
});
app.get('/mode', (req, res, next) => {
  try {
    const arr = req.query.nums.split(',');
    for (let num of arr) {
      if (!parseInt(num)) {
        throw new ExpressError(`${num} is not a valid number`, 400);
      }
    }
    const nums = arr.map((num) => parseInt(num));
    const response = {
      response: { operation: 'mode', value: mode(nums) },
    };
    return res.json(response);
  } catch (e) {
    next(e);
  }
});

app.get('/all', (req, res, next) => {
  try {
    const arr = req.query.nums.split(',');
    for (let num of arr) {
      if (!parseInt(num)) {
        throw new ExpressError(`${num} is not a valid number`, 400);
      }
    }
    const nums = arr.map((num) => parseInt(num));
    const response = {
      response: {
        operation: 'all',
        mean: mean(nums),
        median: median(nums),
        mode: mode(nums),
      },
    };
    return res.json(response);
  } catch (e) {
    next(e);
  }
});

app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message || 'Something Went Wrong';
  return res.status(error.status).json({
    error: { message, status },
  });
});
app.listen(3000, (req, res) => {
  console.log(`Listening on 3000`);
});
