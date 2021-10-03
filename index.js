const express = require('express');
const { mean, median, mode } = require('./helpers');
const ExpressError = require('./expressError');
const fs = require('fs');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/mean', (req, res, next) => {
  const contentType = req.headers['content-type'];
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
      response.response.timestamp = Date();
      fs.writeFile(
        'results.json',
        JSON.stringify(response) + '\n',
        { encoding: 'utf8', flag: 'a' },
        (err) => {
          if (err) {
            throw new ExpressError(err, 400);
          }
        }
      );
    }
    if (contentType === 'text/html') {
      return res.send(
        `<h1>Mean of [${req.query.nums}]</h1><h2>${response.response.value}</h2>`
      );
    }
    return res.status(200).json(response);
  } catch (e) {
    next(e);
  }
});
app.get('/median', (req, res, next) => {
  const contentType = req.headers['content-type'];
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
    if (req.query.save === 'true') {
      response.response.timestamp = Date();
      fs.writeFile(
        'results.json',
        JSON.stringify(response) + '\n',
        { encoding: 'utf8', flag: 'a' },
        (err) => {
          if (err) {
            throw new ExpressError(err, 400);
          }
        }
      );
    }
    if (contentType === 'text/html') {
      return res.send(
        `<h1>Median of [${req.query.nums}]</h1><h2>${response.response.value}</h2>`
      );
    }
    if (contentType === 'application/json') {
      return res.status(200).json(response);
    }
  } catch (e) {
    next(e);
  }
});
app.get('/mode', (req, res, next) => {
  const contentType = req.headers['content-type'];
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
    if (req.query.save === 'true') {
      response.response.timestamp = Date();
      fs.writeFile(
        'results.json',
        JSON.stringify(response) + '\n',
        { encoding: 'utf8', flag: 'a' },
        (err) => {
          if (err) {
            throw new ExpressError(err, 400);
          }
        }
      );
    }
    if (contentType === 'text/html') {
      return res.send(
        `<h1>Mode of [${req.query.nums}]</h1><h2>${response.response.value}</h2>`
      );
    }
    if (contentType === 'application/json') {
      return res.status(200).json(response);
    }
  } catch (e) {
    next(e);
  }
});

app.get('/all', (req, res, next) => {
  const contentType = req.headers['content-type'];
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
    if (req.query.save === 'true') {
      response.response.timestamp = Date();
      fs.writeFile(
        'results.json',
        JSON.stringify(response) + '\n',
        { encoding: 'utf8', flag: 'a' },
        (err) => {
          if (err) {
            throw new ExpressError(err, 400);
          }
        }
      );
    }
    if (contentType === 'text/html') {
      return res.send(
        `<h1>Mean, Median, and Mode for [${req.query.nums}]</h1><h2>Mean: ${response.response.mean}</h2><h2>Median: ${response.response.median}</h2><h2>Mode: ${response.response.mode}</h2>`
      );
    }
    if (contentType === 'application/json') {
      return res.status(200).json(response);
    }
  } catch (e) {
    next(e);
  }
});

app.use((req, res) => {
  return new ExpressError('Not Found', 404);
});

app.use((error, req, res, next) => {
  let status = error.status || 500;
  let message = error.message || 'Something Went Wrong';
  return res.status(status).json({
    error: { message, status },
  });
});

app.listen(3005, () => {
  console.log('Server Running On Port 3005');
});
