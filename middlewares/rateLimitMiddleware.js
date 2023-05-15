
const requestCounts = new Map();


const rateLimitMiddleware = (req, res, next) => {
  const ip = req.ip;
// console.log(requestCounts)
  if (requestCounts.has(ip) && requestCounts.get(ip).blockedUntil > Date.now()) {
    return res.status(429).json({ error: 'Too many requests try after sometimes' });
  }else{

  }

  if (requestCounts.has(ip) && requestCounts.get(ip).count >= 10) {
    requestCounts.set(ip, { count: 10, blockedUntil: Date.now() + 60000 });
    return res.status(429).json({ error: 'Too many requests try after sometimes' });
  }

  if (requestCounts.has(ip)) {
    const count = requestCounts.get(ip).count;
    requestCounts.set(ip, { count: count + 1, blockedUntil: null });
  } else {
    requestCounts.set(ip, { count: 1, blockedUntil: null });
  }

  setTimeout(() => {
    requestCounts.delete(ip);
  }, 60000);

  next();
};

module.exports={rateLimitMiddleware}