const applicationMiddleware2 = (req, res, next) => {

    const date = new Date();
    const exactTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    console.log(`Hello Aurélien, il est : ${exactTime}`);
    next();
};

module.exports = applicationMiddleware2;
